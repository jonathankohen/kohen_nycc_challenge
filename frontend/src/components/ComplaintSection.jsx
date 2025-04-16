import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiURL } from '../utils/constants';

// Components
import ComplaintTable from './ComplaintTable';

// Styling
import { Button, Typography, Box } from '@mui/material';

const ComplaintSection = ({ showResComplaints, handleComplaintSwitch }) => {
	const [complaints, setComplaints] = useState([]);

	useEffect(() => {
		if (localStorage.getItem('token')) {
			axios.defaults.headers.common['Authorization'] =
				'Token ' + localStorage.getItem('token');

			const viewset = showResComplaints
				? 'fromDistrictResidents'
				: 'allComplaints';
			const complaintURL = `${apiURL}/${viewset}`;

			axios
				.get(complaintURL)
				.then((res) => {
					setComplaints(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [showResComplaints]);

	const handleChange = () => {
		handleComplaintSwitch(!showResComplaints);
	};

	return (
		<>
			<Typography variant="h2" my={5} textAlign="center">
				{showResComplaints
					? "My Constituents' Complaints"
					: 'All Complaints'}
			</Typography>

			<Box
				my={3}
				mr={2}
				sx={{
					display: 'flex',
					justifyContent: { xs: 'center', md: 'flex-end' },
				}}
			>
				<Button variant="contained" onClick={handleChange}>
					{showResComplaints
						? 'Show All Complaints'
						: 'Complaints by My Constituents'}
				</Button>
			</Box>

			{complaints.length > 0 ? (
				<ComplaintTable complaints={complaints} />
			) : (
				<Typography variant="body" my={5} textAlign="center">
					No complaints available.
				</Typography>
			)}
		</>
	);
};

export default ComplaintSection;
