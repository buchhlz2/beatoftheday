import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;

	@media all and (max-width: 800px) {
		align-items: flex-start;
		padding-left: 5px;
	}
`;

const Wrapper = styled.div`
	padding: 20px 0 20px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 50px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;

	@media all and (max-width: ${window.B_R_E_A_K_P_O_I_N_T}px) {
		max-width: 90%;
	}
`;

const SongBoxWrapper = styled.div`
	height: 200px;
	margin-bottom: 50px;
	margin-right: 0px;
	margin-left: 30px;
	position: relative;

	@media all and (max-width: 800px) {
		margin: 0 0 50px 0;
	}
`;

export const Rank = styled.div`
	font-size: 16px;
	position: absolute;
	top: 0px;
	left: -33px;
	color: #bdbdbd;
	text-align: right;
	width: 20px;

	@media all and (max-width: 800px) {
		left: 5px;
	}
`;

const InnerHeader = styled.div`
	width: 100%;
	margin-top: 35px;
	margin-bottom: 15px;
	display: flex;
	align-items: start;
	justify-content: space-between;
	font-size: 23px;
	color: #8b8c90;

	@media all and (max-width: ${window.B_R_E_A_K_P_O_I_N_T}px) {
		justify-content: center;
	}
`;

const SmallerHeader = styled.div`
	margin-top: 30px;
	line-height: 22px;
	font-size: 16px;
	width: 90%;
	max-width: 95vw;
	@media all and (max-width: 800px) {
		padding-left: 10px;
	}
`;

const AddATrackLink = styled.a`
	cursor: pointer;
	font-size: 24px;
	padding: 5px;
	width: 300px;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 180px;
	margin-top: -5px;
	transition: all 1s ease;
	position: relative;
	bottom: 0;
	border-radius: 3px;
	opacity: 0.8;
	background: #aa32a1;
	align-self: center;
	color: white !important;

	&:hover {
		box-shadow: 0 0px 15px 6px #aa32a1;
		bottom: 5px;
		background-color: #aa32a1;
	}
`;

const ShowMoreButton = styled.div`
	margin: -50px 0 100px 0;
	align-self: center;
	cursor: pointer;
	text-decoration: underline;
	color: #666;
	font-size: 20px;

	&:hover {
		text-decoration: none;
	}
`;

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tracks: [],
			page: 1
		};
	}

	componentDidUpdate() {
		this.getTracks();
	}

	componentDidMount() {
		this.getTracks();
	}

	getTracks = () => {
		if (this.state.tracks.length == 0) {
			$.get('/tracks').done((res) => {
				this.setState(
					{
						tracks: res.tracks,
						tracksLength: res.length
					},
					() => {
						window.clearQueue();
						window.addTracksToQueue(res.tracks);
						if (window.masterAudioTag.paused) this.enableTrack(0, false);
					}
				);
			});
		}
	};

	enableTrack = (i, play = true) => {
		const newTrack = this.state.tracks[i];
		window.masterShowTrack(newTrack, play);
	};

	showMoreTracks = () => {
		const newPage = this.state.page + 1;
		this.setState({ page: newPage });
		$.get(`/tracks?page=${newPage}`).done((res) => {
			console.log(res);
			this.setState({
				tracks: this.state.tracks.concat(res.tracks)
			});
		});
	};

	render() {
		return (
			<FlexContainer>
				<InnerHeader>🎵 New tracks:</InnerHeader>

				<Wrapper>
					{this.state.tracks.map((obj, i) => {
						return (
							<SongBoxWrapper key={obj.id}>
								<Rank>{i + 1}</Rank>
								<SongBox
									width={'271px'}
									height={'200px'}
									key={obj.link}
									trackInfo={obj}
									enableTrack={() => {
										this.enableTrack(i);
									}}
									showRank={true}
								/>
							</SongBoxWrapper>
						);
					})}
				</Wrapper>
				{this.state.page * window.__page_unit__ < this.state.tracksLength && (
					<ShowMoreButton onClick={this.showMoreTracks}>Show more ↓</ShowMoreButton>
				)}
				<AddATrackLink href="/add-a-track">Add a new track!</AddATrackLink>
			</FlexContainer>
		);
	}
}

export default HomePage;
