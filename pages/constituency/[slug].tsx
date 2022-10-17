/** @format */

import { GetStaticPaths, GetStaticProps } from 'next/types';
import TdRecordsTabs from '../../UI-Components/Member/TdRecordsTabs';
import dateFormatter from '../../Fetcher/dates2string';
import format from 'date-fns/format';
import Head from 'next/head';
import {
	Box,
	Container,
	createTheme,
	CssBaseline,
	Grid,
	Paper,
	ThemeProvider,
	Typography,
} from '@mui/material';
import Header from '../../UI-Components/Header';
import AttendanceTable from '../../UI-Components/ParticipationTable';
import formattedMember, {
	memberFormatter,
} from '../../Fetcher/OireachtasAPI/Formatter/member';
import fetchMember from '../../Fetcher/OireachtasAPI/member';
import fetcher from '../../Fetcher';
import axios from 'axios';
import { Info } from '@mui/icons-material';
import { useState } from 'react';
import { member } from '../../Models/UI/member';
import getCommittees from '../../Fetcher/OireachtasAPI/committees';
import fetchConstituencies from '../../Fetcher/OireachtasAPI/constituencies';
import TDcard from '../../UI-Components/TDcard';
import ConstituencyLayout from '../../UI-Components/Constituency/ConstituencyLayout';

export default function Constituency(props: { uri: string; members: JSON[] }) {
	let members = JSON.parse(props.members);
	members = members.filter((m) => m.constituency?.uri == props.uri);
	console.log(members);
	const name = members[0].constituency.name;
	const seats = members.length;
	console.log(name, seats);
	console.log(members);
	// const members = props.members.map((m) => {
	// 	return memberFormatter(m.member);
	// });

	// const [selectedDail, setSelectedDail] = useState(() => {
	// 	return 33;
	// });

	// const parseSelectedTDs: member = members.filter((m: member) => {
	// 	return m.dails!.find((d) => d.houseNo == selectedDail);
	// });

	// const [selectedTDs, setSelectedTDs] = useState(() => {
	// 	return parseSelectedTDs;
	// });

	// const imgUrl = `https://data.oireachtas.ie/ie/oireachtas/member/id/${member.uri}/image/large`;

	return (
		<>
			<Head>
				<title>{name} </title>
				<meta
					name='description'
					content={`Informational content for ${name} constituency`}
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Header />
			<Container>
				<ConstituencyLayout name={name} members={members} />
				<footer></footer>
			</Container>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: 'blocking', //indicates the type of fallback
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const { slug } = params!;

	const members = await fetchMember({
		constId: slug,
		houseNo: 33,
		serialized: true,
	});

	return {
		props: {
			uri: slug,
			members: members,
		},
		revalidate: 43200, // 12 hours
	};
};

// Bertie-Ahern.D.1977-07-05
// 	// Stephen-Donnelly.D.2011-03-09
// 	// Ivana-Bacik.S.2007-07-23
