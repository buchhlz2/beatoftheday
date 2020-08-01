import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';
import { Loader } from '../shared/AttachmentBox';

var tracks = [];
var page = 1;
var tracksLength = 0;

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

const LoaderWrapper = styled.div`position: relative;`;

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

export const AddATrackLink = styled.a`
	cursor: pointer;
	width: 100%;
	margin-top: 100px;
	margin-bottom: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	border-radius: 3px;
	box-shadow: 0px 13px 13px -8px #dadada;
	border: 1px solid #cccccc;
	color: #666 !important;
	text-decoration: none !important;
	font-size: 16px;

	&:hover {
		background: #f3f2f2;
		color: #666 !important;
	}
`;

const ShowMoreButton = styled.div`
	margin: -60px 0 0px 0;
	align-self: center;
	cursor: pointer;
	color: #666;
	font-size: 16px;
`;

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true
		};
	}

	componentDidMount() {
		this.getTracks();
	}

	getTracks = () => {
		if (tracks.length > 0) return this.setState({ loading: false });

		$.get('/tracks').done((res) => {
			tracks = res.tracks;
			tracksLength = res.length;
			window.clearQueue();
			window.addTracksToQueue(res.tracks);
			if (window.masterAudioTag.paused) this.enableTrack(0, false);
			this.setState({ loading: false });
			this.forceUpdate();
		});
	};

	enableTrack = (i, play = true) => {
		const newTrack = tracks[i];
		window.masterShowTrack(newTrack, play);
	};

	showMoreTracks = () => {
		this.setState({ loading: true });
		page = page + 1;
		$.get(`/tracks?page=${page}`).done((res) => {
			tracks = tracks.concat(res.tracks);
			this.setState({ loading: false });
			this.forceUpdate();
		});
	};

	render() {
		return (
			<FlexContainer>
				<InnerHeader>🎵 New tracks:</InnerHeader>

				<Wrapper>
					{tracks.map((obj, i) => {
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
				{this.state.loading ? (
					<LoaderWrapper>
						<Loader src="/assets/loader.gif" />
					</LoaderWrapper>
				) : (
					page * window.__page_unit__ < tracksLength && (
						<ShowMoreButton onClick={this.showMoreTracks}>Show more ↓</ShowMoreButton>
					)
				)}
				<AddATrackLink href="/add-a-track">Add a new track!</AddATrackLink>
			</FlexContainer>
		);
	}
}

export default HomePage;
