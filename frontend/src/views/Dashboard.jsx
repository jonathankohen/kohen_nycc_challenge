import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../utils/constants';

// Components
import CaseCard from '../components/CaseCard';
import ComplaintSection from '../components/ComplaintSection';

// Styling
import { Box, Grid, Typography } from '@mui/material';

const Dashboard = () => {
	const [profile, setProfile] = useState();
	const [openCases, setOpenCases] = useState([]);
	const [closedCases, setClosedCases] = useState([]);
	const [topComplaints, setTopComplaints] = useState([]);
	const [showResComplaints, setShowResComplaints] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			axios.defaults.headers.common['Authorization'] =
				'Token ' + localStorage.getItem('token');

			axios
				.get(`${apiURL}/profile`)
				.then((res) => {
					setProfile(res.data);
				})
				.catch((err) => console.log(err));

			axios
				.get(`${apiURL}/openCases`)
				.then((res) => {
					setOpenCases(res.data);
				})
				.catch((err) => console.log(err));

			axios
				.get(`${apiURL}/closedCases`)
				.then((res) => {
					setClosedCases(res.data);
				})
				.catch((err) => console.log(err));

			axios
				.get(`${apiURL}/topComplaints`)
				.then((res) => {
					setTopComplaints(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, []);

	const handleComplaintSwitch = () => {
		setShowResComplaints(!showResComplaints);
	};

	return (
		<>
			{/* Uses the first_name and last_name fields in the flattened User object from the UserProfileSerializer. Just wanted to show that the flattening is working! - JK, 2025-04-14 */}
			<Typography variant="h1" my={5} textAlign="center">
				Welcome
				{profile ? `, ${profile.first_name} ${profile.last_name}` : ''}
			</Typography>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid size={{ xs: 12, md: 6 }}>
						<CaseCard
							caseTitle="Open Cases"
							caseContent={openCases.length}
						/>
					</Grid>
					<Grid size={{ xs: 12, md: 6 }}>
						<CaseCard
							caseTitle="Closed Cases"
							caseContent={closedCases.length}
						/>
					</Grid>
					<Grid size={12}>
						<CaseCard
							caseTitle="Top Complaints"
							caseContent={topComplaints}
						/>
					</Grid>
				</Grid>
			</Box>

			<ComplaintSection
				showResComplaints={showResComplaints}
				handleComplaintSwitch={handleComplaintSwitch}
			/>
		</>
	);
};

export default Dashboard;
