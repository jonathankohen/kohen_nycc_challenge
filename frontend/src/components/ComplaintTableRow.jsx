import React from 'react';

// Components
import ComplaintTableCell from './ComplaintTableCell';

// Styling
import { TableRow } from '@mui/material';

const ComplaintTableRow = ({ complaint }) => {
	return (
		<TableRow>
			{Object.values(complaint).map((value, i) => (
				<ComplaintTableCell value={value} key={i} />
			))}
		</TableRow>
	);
};

export default ComplaintTableRow;
