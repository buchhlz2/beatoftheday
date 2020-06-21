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
`;

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin-bottom: 0px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
`;

const SongBoxWrapper = styled.div`width: 60%;`;

const Rank = styled.div`
	font-size: 16px;
	position: relative;
	top: 52px;
	right: 0px;
	width: 50px;
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

const SmallerHeader = styled.div`
	margin-top: 30px;
	line-height: 22px;
	font-size: 16px;
	width: 70%;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
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
					if (masterAudioTag.paused) this.enableTrack(0, false);
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
				<InnerHeader>🧁 Baked tracks:</InnerHeader>
				<SmallerHeader>
					Tracks are ranked based on a combination of how new they are, and how many 'bakes' they have. The
					forumla is (100 hours - how old the track is in hours) * number of bakes.
				</SmallerHeader>
				<Wrapper>
					{this.state.tracks.map((obj, i) => {
						return (
							<SongBoxWrapper key={obj.id}>
								<Rank>{i + 1}.</Rank>
								<SongBox
									width={'100%'}
									height={'auto'}
									trackInfo={obj}
									enableTrack={() => {
										this.enableTrack(i);
									}}
								/>
							</SongBoxWrapper>
						);
					})}
				</Wrapper>
				<AddATrackLink href="/add-a-track">Add a track!</AddATrackLink>
			</FlexContainer>
		);
	}
}

export default Baked;