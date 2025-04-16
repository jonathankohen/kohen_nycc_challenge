from rest_framework import viewsets
from .models import UserProfile, Complaint
from .serializers import UserSerializer, UserProfileSerializer, ComplaintSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import Group, User
from django.db.models import Count
import pprint

# Create your views here.

# Reminder: "...account refers to the district in which the complaint is being made, and council_dist refers to the district in which the person who is making the complaint lives." (https://github.com/NewYorkCityCouncil/fullstack-coding-challenge) - JK, 2025-04-13


def get_complaint_district(username) -> str:
    """
    Utility function that uses a given username to convert the format of that user's complaint district from an integer (UserProfile.district, ex: "9") to a string (Complaint.account, ex: "NYCC01"). This accounts for the "NYCC" prefix and the leading zero for districts less than 10. - JK, 2025-04-13
    """
    user = User.objects.get(username=username)
    user_profile = UserProfile.objects.get(user=user)
    user_district = user_profile.district

    if user_district and int(user_district) < 10:
        user_district = "0" + user_district

    complaint_district = "NYCC" + user_district
    return complaint_district


class ComplaintViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request):
        # Get all complaints from the user's district
        try:
            username = request.user
            complaint_district = get_complaint_district(username)
            complaints = Complaint.objects.filter(account=complaint_district)
            serializer = self.get_serializer(complaints, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND
            )


class OpenCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request):
        # Get only the open complaints from the user's district
        try:
            username = request.user
            complaint_district = get_complaint_district(username)
            complaints = Complaint.objects.filter(
                account=complaint_district,
                opendate__isnull=False,
                closedate__isnull=True,
            )
            serializer = self.get_serializer(complaints, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND
            )


class ClosedCasesViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request):
        # Get only complaints that are close from the user's district
        try:
            username = request.user
            complaint_district = get_complaint_district(username)
            complaints = Complaint.objects.filter(
                account=complaint_district, closedate__isnull=False
            )
            serializer = self.get_serializer(complaints, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND
            )


class TopComplaintTypeViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request):
        # Get the top 3 complaint types from the user's district
        try:
            username = request.user
            complaint_district = get_complaint_district(username)
            top_complaints = (
                Complaint.objects.filter(account=complaint_district)
                .values("complaint_type")
                .annotate(total=Count("complaint_type"))
                .order_by("-total")[:3]
            )
            return Response(top_complaints)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND
            )


class FromDistrictResidentsViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def list(self, request):
        try:
            # Gets all of the complaints that were made by constituents that live in the logged in user's district. - JK, 2025-04-15
            username = request.user
            complaint_district = get_complaint_district(username)
            complaints = Complaint.objects.filter(council_dist=complaint_district)
            serializer = self.get_serializer(complaints, many=True)
            return Response(serializer.data)
        except User.DoesNotExist:
            return Response(
                {"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND
            )
        except UserProfile.DoesNotExist:
            return Response(
                {"detail": "User profile not found."}, status=status.HTTP_404_NOT_FOUND
            )


class CurrentUserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            serializer = UserProfileSerializer(user_profile)
            return Response(serializer.data)
        except UserProfile.DoesNotExist:
            return Response({"detail": "User profile not found."}, status=404)
