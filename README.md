# New York City Council Full Stack Coding Challenge Submission

## Tech Stack

- **Back-end:** Django REST Framework
- **Front-end:** React + Material UI
- **Styling:** Based on [NYCC Brand Guidelines](https://newyorkcitycouncil.github.io/nycc-brand-guidelines/)

## Notes

- I used [Material UI](https://mui.com/material-ui/) for styling to save time, maintain consistency, and add some quick and easy responsiveness. The sign-in page is based on a [template](https://github.com/mui/material-ui/blob/v7.0.2/docs/data/material/getting-started/templates/sign-in/SignIn.js) from their documentation.
- I came across the [NYCC brand guidelines](https://newyorkcitycouncil.github.io/nycc-brand-guidelines/) and followed them to create a custom Material UI theme. The theme includes the colors, typography, lack of border radius, and subtle box-shadow from the guidelines, among other things.
- My secret key is hidden using `python-decouple` with a `.env` file (not included in the repo). I've included instructions below.

## Contact Information

If you have any issues or questions, please feel free to reach out to me. Thank you for your consideration, I'm looking forward to hearing back from you!

Jonathan Kohen (I usually go by Jon, but either is fine)
jonathan.a.kohen@gmail.com
(978) 457-1588

## Setup Instructions

To run the project locally, please run the following commands in your terminal.

### Clone the repository

```bash
git clone https://github.com/jonathankohen/kohen_nycc_challenge.git
```

### Back-end Setup

In the root of the project (`/kohen_nycc_challenge`), run the following commands to set up a Python environment, install all the necessary dependencies, and run the server.

#### Python Environment and Dependencies

Create a Python environment using `venv`, or your preferred virtual environment, then install the dependencies using `pip`.

Make sure that you have Python (**version 3.10.9 or greater**) and pip (**version 22.3.1 or greater**) installed. On Mac, use the `python3` and `pip3` commands instead.

- `python -m venv env`
- `source env/bin/activate`
- `pip install -r requirements.txt`

#### Secret Key

In order to run Django, you'll need your own secret key. Generate one by running the following command in your terminal:

```python
python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

Create a `.env` file in the root of the project and add your newly created secret key:

```env
SECRET_KEY={your-secret-key-here}
```

#### Database Setup and Running the Server

Now that the Python environment is set up, run the following commands to set up and populate the database, then run the server.

- `python manage.py migrate`
- `python manage.py populate_db`
- `python manage.py createsuperuser` (for access to the Django admin portal)
- `python manage.py runserver`

### Front-end Setup

Create a separate terminal instance in the root of the project. From there, run the following commands to change to the front-end directory (`/kohen_nycc_challenge/frontend`), install the necessary dependencies, and start the front end.

- Make sure you have Node (**version 14.17.1 or greater**) and npm (**version 9.6.2 or greater**) or a similar yarn version installed.

```bash
cd frontend
npm install
npm start
```

## Logging In

Now that you hopefully see the login screen, use the following format to log in as a council member:

- Username: {first_name_initial}{last_name}
- Password: {last_name}-{district_number}

## API Endpoints
`localhost:8000`

| Route                            | Method | Description                                                                                                                                                                                                                  |
| -------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/admin/`                        | GET    | Log in for superusers into the Django admin portal                                                                                                                                                                           |
| `/login/`                        | POST   | Accepts username and password and returns a **token**. Use this **token** to authorize use of other endpoints. View the [documentation](https://www.django-rest-framework.org/api-guide/authentication/#basicauthentication) |
| `/api/complaints/allComplaints`  | GET    | Returns **all complaints**                                                                                                                                                                                                   |
| `/api/complaints/openCases/`     | GET    | Returns **all open complaints**                                                                                                                                                                                              |
| `/api/complaints/closedCases/`   | GET    | Returns **all closed complaints**                                                                                                                                                                                            |
| `/api/complaints/topComplaints/` | GET    | Returns **top 3 complaint types**                                                                                                                                                                                            |

## Newly Added API Endpoints

| Route                                   | Method | Description                                                                         |
| --------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `/api/complaints/fromDistrictResidents` | GET    | Returns **complaints from constituents that live in the logged in user's district** |
| `/api/complaints/profile`               | GET    | Returns **information about the logged-in user**                                    |