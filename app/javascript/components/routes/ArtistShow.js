import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import SongBox from '../shared/SongBox';

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	margin-bottom: 200px;
`;

const SongBoxWrapper = styled.div`
	height: 200px;
	margin-bottom: 50px;
	margin-right: 20px;
`;

const InnerHeader = styled.p`
	width: 100%;
	margin-top: 60px;
	margin-bottom: 20px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26px;
	text-decoration: none !important;
	color: #5e6469 !important;
`;

class ArtistShow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			artist: {},
			tracks: []
		};
	}

	componentDidMount() {
		$.get(`/show_artist/${this.props.match.params.id}`).done((res) => {
			this.setState(
				{
					artist: res.artist,
					tracks: res.tracks
				},
				() => {
					if (masterAudioTag.paused && this.state.tracks[0]) window.masterShowTrack(this.state.tracks[0]);
				}
			);
		});
	}

	render() {
		return (
			<div>
				<InnerHeader>{this.state.artist.artist_name}</InnerHeader>
				<Wrapper>
					{this.state.tracks.map((obj, i) => {
						return (
							<SongBoxWrapper key={obj.id}>
								<SongBox
									width={'auto'}
									height={'200px'}
									trackInfo={obj}
									enableTrack={() => {
										window.masterShowTrack(this.state.tracks[i], true);
									}}
								/>
							</SongBoxWrapper>
						);
					})}
				</Wrapper>
			</div>
		);
	}
}

export default ArtistShow;
