import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';
import { Rank } from './HomePage';
import { SongBoxWrapper, CommentBoxWrapper, Wrapper } from './TrackShow';
import CommentBox from '../shared/CommentBox';

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	@media all and (max-width: 800px) {
		align-items: flex-start;
		padding-left: 5px;
	}
`;

const InnerHeader = styled.div`
	width: 100%;
	margin-top: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	color: #61646d;
`;

const TrackRow = styled.div`
	width: 100%;
	display: flex;
	margin-top: 15px;

	@media all and (max-width: 800px) {
		flex-direction: column;
`;

const SmallerHeader = styled.div`
	margin-top: 30px;
	line-height: 22px;
	font-size: 16px;
	width: ${window.__good_height__};
	max-width: 95vw;
	margin-bottom: 15px;
	@media all and (max-width: 800px) {
		width: 90%;
		padding-left: 10px;
	}
`;

const AddATrackLink = styled.a`
	cursor: pointer;
	font-size: 24px;
	padding: 5px;
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 130px;
	margin-top: -5px;
	transition: all 1s ease;
	position: relative;
	bottom: 0;
	border-radius: 3px;

	&:hover {
		box-shadow: 0 0px 15px 6px #aa32a1;
		bottom: 5px;
		background: #aa32a1;
	}
`;

class Baked extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tracks: []
		};
	}

	componentDidMount() {
		this.getTracks();
	}

	getTracks = () => {
		$.get('/baked_tracks').done((res) => {
			this.setState(
				{
					tracks: res.baked_tracks
				},
				() => {
					window.clearQueue();
					window.addTracksToQueue(res.baked_tracks);
					if (window.masterAudioTag.paused) this.enableTrack(0, false);
				}
			);
		});
	};

	enableTrack = (i, play = true) => {
		const newTrack = this.state.tracks[i];
		window.masterShowTrack(newTrack, play);
	};

	render() {
		return (
			<FlexContainer>
				<InnerHeader>🧁 Top tracks:</InnerHeader>
				<Wrapper>
					{this.state.tracks.map((obj, i) => {
						return (
							<TrackRow key={obj.id}>
								<SongBoxWrapper>
									<Rank>{i + 1}</Rank>
									<SongBox
										width={'100%'}
										fontSize={40}
										height={window.__good_height__}
										trackInfo={obj}
										showRank={true}
										enableTrack={() => {
											this.enableTrack(i);
										}}
									/>
								</SongBoxWrapper>
								<CommentBoxWrapper style={{ height: window.__good_height__ }}>
									<CommentBox trackId={obj.id} trackInfo={obj} />
								</CommentBoxWrapper>
							</TrackRow>
						);
					})}
				</Wrapper>
				<AddATrackLink href="/add-a-track">Add a track!</AddATrackLink>
			</FlexContainer>
		);
	}
}

export default Baked;
