import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import SongBox from './shared/SongBox';
import CommentBox from './shared/CommentBox';
import moment from 'moment';
import AddATrack from './shared/AddATrack';

var track = {};

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

const ReboundsBox = styled.div`
	width: 100%;
	// background: blue;
	border-radius: 3px;
	display: flex;
`;

const ReboundHeader = styled.h3``;

const CreateARebound = styled.div`
	background: pink;
	width: 100%;
	margin-top: 20px;
	margin-bottom: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	border-radius: 3px;
`;

const AddATrackBox = styled.div`width: 66%;`;

const InfoBox = styled.div`
	margin-top: 30px;
	margin-bottom: 30px;
	position: relative;
	flex-grow: 1;
`;

const H2 = styled(Link)`
  margin-top: 0px;
  font-size: 24px;
  text-decoration: none !important;
  color: #5e6469 !important;
  display: block;

  &:visited {
    color: #5e6469 !important;
  }
`;

const ArtistName = styled(Link)`
  margin-top: 20px;
  text-decoration: none !important;
  color: #5e6469 !important;
  display: block;

  &:visited {
    color: #5e6469 !important;
  }
`;

const CreatedAt = styled.p`
	position: absolute;
	bottom: 0;
	margin-bottom: 0;
`;

const SongBoxWrapper = styled.div`
	width: 66.666%;
	margin-left: -30px;
	margin-right: 20px;
`;

const CommentBoxWrapper = styled.div`
	width: calc(33.333% + 10px);
	margin-top: 30px;
`;

class TrackShow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imgHeight: 0,
			params_id: this.props.match.params.id
		};
	}

	componentDidMount() {
		this._ismounted = true;
		this.loadData();
	}

	componentDidUpdate() {
		if (this.state.params_id != this.props.match.params.id) {
			this.loadData();
		}
	}

	componentWillUnmount() {
		this._ismounted = false;
	}

	loadData = () => {
		if (this._ismounted) {
			$.get(`/tracks/show_track/${this.props.match.params.id}`).done((res) => {
				if (masterAudioTag.paused) window.masterShowTrack(res);
				track = res;
				this.forceUpdate();
			});
		}
	};

	render() {
		return track.name ? (
			<Wrapper>
				<SongBoxWrapper>
					<SongBox
						fontSize={40}
						width={'100%'}
						height={'100%'}
						trackInfo={track}
						enableTrack={() => {
							window.masterShowTrack(track, true);
						}}
						onLoadImage={(e) => {
							this.setState({ imgHeight: e.target.height });
						}}
					/>
				</SongBoxWrapper>
				<CommentBoxWrapper style={{ height: this.state.imgHeight }}>
					<CommentBox trackId={track.id} />
				</CommentBoxWrapper>
				<ReboundHeader>Rebounds:</ReboundHeader>
				<ReboundsBox>
					{track.rebounds.map((rebound) => {
						return (
							<React.Fragment key={rebound.id}>
								<SongBoxWrapper>
									<SongBox
										fontSize={40}
										width={'100%'}
										height={'100%'}
										trackInfo={rebound}
										enableTrack={() => {
											window.masterShowTrack(rebound, true);
										}}
										onLoadImage={(e) => {
											let newState = {};
											newState[`imgHeight-${rebound.id}`] = e.target.height;
											this.setState(newState);
										}}
									/>
								</SongBoxWrapper>

								<CommentBoxWrapper style={{ height: this.state[`imgHeight-${rebound.id}`] }}>
									<CommentBox trackId={rebound.id} />
								</CommentBoxWrapper>
							</React.Fragment>
						);
					})}
				</ReboundsBox>

				<CreateARebound>
					<ReboundHeader>Create a rebound:</ReboundHeader>
					<AddATrackBox>
						<AddATrack reboundTrackId={track.id} />
					</AddATrackBox>
				</CreateARebound>
			</Wrapper>
		) : (
			<div />
		);
	}
}

export default TrackShow;
