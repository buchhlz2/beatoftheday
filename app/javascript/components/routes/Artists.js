import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';
import artistUrl from '../util/artistUrl';

const InnerHeader = styled.div`
	width: 100%;
	margin-top: 30px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	color: #61646d;
`;

const Wrapper = styled.div`
	margin-top: 20px;
	padding: 0;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	width: 100%;
	margin-bottom: 200px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	overflow: hidden;

	@media all and (max-width: ${window.B_R_E_A_K_P_O_I_N_T}px) {
		max-width: 90%;
	}
`;

const ArtistBox = styled.div`
	border-radius: 3px;
	display: flex;
	padding: 20px;
	margin: 50px;
	background: #b1f0ff;
	font-size: 20px;
	box-shadow: 0px 13px 13px -8px #dadada;
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
				<InnerHeader>🧞 Artists</InnerHeader>
				{this.state.artists.map((artist) => {
					return (
						<ArtistBox key={artist.id}>
							<ArtistName to={artistUrl(artist.artist_name)}>{artist.artist_name}</ArtistName>
						</ArtistBox>
					);
				})}
			</Wrapper>
		);
	}
}

export default Artists;
