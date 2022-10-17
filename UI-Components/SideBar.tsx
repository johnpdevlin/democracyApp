/** @format */

import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { membership } from '../Models/UI/member';
import { Box, Divider, Paper } from '@mui/material';

function pastOffice(office: membership) {
	return (
		<>
			<Typography component='hh6' variant='p' color='primary'>
				{office.name}
			</Typography>
			<Typography
				component='h6'
				color='text.secondary'
				variant='p'
				sx={{ flex: 1 }}>
				{new Date(office.startDate).getFullYear()}
				{' - '}
				{new Date(office.endDate).getFullYear()}
			</Typography>
		</>
	);
}

export default function SideBar(props: { offices }) {
	if (props.offices!.length > 0) {
		return (
			<>
				<Paper
					sx={{
						p: 2.5,
					}}>
					<Box sx={{ mb: 1 }}>
						<Typography
							component='header'
							variant='h4'
							mb='2'
							color='text.secondary'>
							Past Offices
						</Typography>
						<Divider />
					</Box>
					{props.offices?.map((o) => {
						return pastOffice(o);
					})}
				</Paper>
			</>
		);
	}
}
