import React from 'react';

// Styling
import { TableCell } from '@mui/material';

const ComplaintTableCell = ({ value, bold = false }) => {
	return (
		<>
			<TableCell
				sx={{ fontWeight: bold ? 'bold' : '', whiteSpace: 'nowrap' }}
				align="left"
			>
				{value}
			</TableCell>
		</>
	);
};

export default ComplaintTableCell;
