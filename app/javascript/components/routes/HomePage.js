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
	flex-wrap: wrap;
	margin-bottom: 50px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
`;

const SongBoxWrapper = styled.div`
	height: 200px;
	margin-bottom: 50px;
	margin-right: 20px;
`;

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
	margin-bottom: 180px;
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

class HomePage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tracks: []
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
						tracks: res.tracks
					},
					() => {
						if (masterAudioTag.paused) this.enableTrack(0, false);
					}
				);
			});
		}
	};

	enableTrack = (i, play = true) => {
		const newTrack = this.state.tracks[i];
		window.masterShowTrack(newTrack, play);
	};

	render() {
		return (
			<FlexContainer>
				<SmallerHeader>
					Beat of the Day is a community for musicians. Have you ever wanted to jam with people all around the
					world in different places? Simply upload any track you're working on, and anyone else on the site
					can download your track and create a 'rebound' of it: a new track based on the original with
					additional layers, say a new drum part, or singing on top. Full creative freedom is encouraged.
					Anything you upload to this site is available for others to modify. Worried about copyrights and
					ownership? So are we, <Link to="/about-us">click here</Link> to learn more.
				</SmallerHeader>
				<InnerHeader>🎵 Newest tracks:</InnerHeader>

				<Wrapper>
					{this.state.tracks.map((obj, i) => {
						return (
							<SongBoxWrapper key={obj.id}>
								<Rank>{i + 1}.</Rank>
								<SongBox
									width={'auto'}
									height={'200px'}
									key={obj.link}
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

export default HomePage;
