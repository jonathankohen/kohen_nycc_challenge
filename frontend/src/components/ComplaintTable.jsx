import React from 'react';

// Components
import ComplaintTableHead from './ComplaintTableHead';
import ComplaintTableRow from './ComplaintTableRow';

// Styling
import { Table, TableBody, TableContainer, Paper } from '@mui/material';

const ComplaintTable = ({ complaints }) => {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ minWidth: 650 }}
				size="small"
				aria-label="Complaint Table"
			>
				<ComplaintTableHead />
				<TableBody>
					{complaints.map((complaint) => (
						<ComplaintTableRow complaint={complaint} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ComplaintTable;
