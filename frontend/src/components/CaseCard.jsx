import React from 'react';

// Styling
import {
	Box,
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
	Divider,
} from '@mui/material';

const CaseCard = ({ caseTitle, caseContent, center }) => {
	return (
		<Box
			sx={{
				minWidth: 275,
				textAlign: center ? 'center' : '',
			}}
		>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h3" component="div" gutterBottom>
						{caseTitle}
					</Typography>

					<Divider variant="middle" sx={{ mb: 3 }} />

					{Array.isArray(caseContent) ? (
						<List dense={true}>
							{caseContent.map((complaint, i) => (
								<ListItem key={complaint.complaint_type}>
									<ListItemText
										primary={complaint.complaint_type}
										secondary={`(${complaint.total} complaints)`}
										primaryTypographyProps={{
											fontSize: '1.25rem',
											color: i === 0 ? 'bloodOrange' : '',
										}}
									/>
								</ListItem>
							))}
						</List>
					) : (
						<Typography
							variant="h4"
							color="bloodOrange"
							component="div"
						>
							{caseContent}
						</Typography>
					)}
				</CardContent>
			</Card>
		</Box>
	);
};

export default CaseCard;
