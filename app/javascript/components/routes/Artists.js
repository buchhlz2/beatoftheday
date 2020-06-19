import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';

const Header = styled.h3`
	font-size: 40px;
	width: 100%;
`;

const Wrapper = styled.div`
	margin-top: 20px;
	padding: 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	width: 100%;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	margin-bottom: 200px;
`;

const ArtistBox = styled.div`
	border-radius: 3px;
	display: flex;
	padding: 20px;
	margin: 50px;
	background: #b1f0ff;
	font-size: 20px;
	box-shadow: 0 8px 6px -6px black;
	transform: scale(1, 1);
	transition: transform 0.5s ease;

	&:hover {
		transform: scale(1.03, 1.03);
	}
`;

const ArtistName = styled(Link)`display: flex;`;

class Artists extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			artists: []
		};
	}

	componentDidMount() {
		$.get('/users', (res) => {
			this.setState({ artists: res.artists });
		});
	}

	render() {
		return (
			<Wrapper>
				<Header>Artists:</Header>
				{this.state.artists.map((artist) => {
					return (
						<ArtistBox key={artist.id}>
							<ArtistName to={`/artist/${artist.artist_name}`}>{artist.artist_name}</ArtistName>
						</ArtistBox>
					);
				})}
			</Wrapper>
		);
	}
}

export default Artists;
