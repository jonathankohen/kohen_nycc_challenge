import React from 'react';

// Components
import ComplaintTableCell from './ComplaintTableCell';

// Styling
import { TableHead, TableRow } from '@mui/material';

const ComplaintTableHead = () => {
	const field_names = [
		'Unique Key',
		'Account',
		'Open Date',
		'Complaint Type',
		'Descriptor',
		'Zip',
		'Borough',
		'City',
		'Council District',
		'Community Board',
		'Close Date',
	];

	return (
		<TableHead sx={{ backgroundColor: 'grey.100' }}>
			<TableRow>
				{field_names.map((field_name) => (
					<ComplaintTableCell value={field_name} bold={true} />
				))}
			</TableRow>
		</TableHead>
	);
};

export default ComplaintTableHead;
