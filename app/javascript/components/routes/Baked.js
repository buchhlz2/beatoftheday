import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';
import { Rank } from './HomePage';
import { Loader } from '../shared/AttachmentBox';
import { AddATrackLink } from './HomePage';

var tracks = [];

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
	flex-direction: column;
	margin-bottom: 0px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;

	@media all and (max-width: 800px) {
		max-width: 90%;
		align-items: flex-start;
	}
`;

const SongBoxWrapper = styled.div`
	position: relative;
	margin-bottom: 30px;
	margin-top: 20px;
	@media all and (max-width: 800px) {
		width: 100%;
	}
`;

export const LoaderWrapper = styled.div`
	position: relative;
	margin-top: 30px;
	margin-bottom: 30px;
	width: 100%;
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
	width: ${window.__good_height__};
	max-width: 95vw;
	margin-bottom: 15px;
	@media all and (max-width: 800px) {
		width: 90%;
		padding-left: 10px;
	}
`;

class Baked extends React.Component {
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

		$.get('/baked_tracks').done((res) => {
			tracks = res.baked_tracks;
			this.setState({ loading: false });
			this.forceUpdate();
			window.clearQueue();
			window.addTracksToQueue(res.baked_tracks);
			if (window.masterAudioTag.paused) this.enableTrack(0, false);
		});
	};

	enableTrack = (i, play = true) => {
		const newTrack = tracks[i];
		window.masterShowTrack(newTrack, play);
	};

	render() {
		return (
			<FlexContainer>
				<InnerHeader>🧁 Top tracks</InnerHeader>
				<Wrapper>
					{tracks.map((obj, i) => {
						return (
							<SongBoxWrapper key={obj.id}>
								<Rank>{i + 1}</Rank>
								<SongBox
									width={window.__good_height__}
									height={window.__good_height__}
									trackInfo={obj}
									showRank={true}
									enableTrack={() => {
										this.enableTrack(i);
									}}
								/>
							</SongBoxWrapper>
						);
					})}
				</Wrapper>
				{this.state.loading ? (
					<LoaderWrapper>
						<Loader src="https://beatoftheday.s3.us-west-1.amazonaws.com/audio%2F7a17a42d-5cc8-4f96-bc7f-d7de1d8ac79a%2Floader.gif" />
					</LoaderWrapper>
				) : (
					<AddATrackLink href="/add-a-track">Add a track</AddATrackLink>
				)}
			</FlexContainer>
		);
	}
}

export default Baked;
