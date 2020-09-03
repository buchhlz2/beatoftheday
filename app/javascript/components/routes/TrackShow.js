import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import SongBox from '../shared/SongBox';
import CommentBox from '../shared/CommentBox';
import moment from 'moment';
import AddATrack from '../shared/AddATrack';

var track = {};

const Wrapper = styled.div`
	margin-top: 20px;
	padding: 0;
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	width: 95%;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	margin-bottom: 200px;
	position: relative;
`;

const LoggedOutMessage = styled.span``;

const DeleteBox = styled.div`
	display: flex;
	background: #e44545;
	font-size: 14px;
	border-radius: 3px;
	height: 37px;
	justify-content: center;
	align-items: center;
	color: white;
	width: 100%;
	margin-top: 50px;
	cursor: pointer;
`;

const SmallerHeader = styled.div`
	margin-top: 30px;
	line-height: 22px;
	font-size: 14px;
	width: 100%;
	display: flex;
	color: #5e6469 !important;
	justify-content: flex-start;
	margin-bottom: 30px;
	margin-left: 10px;
`;

const ReboundsBox = styled.div`
	width: 100%;
	border-radius: 3px;
	display: flex;
	flex-direction: column;
`;

const ReboundRow = styled.div`
	width: 100%;
	display: flex;
	margin-top: 15px;
`;

export const ReboundHeader = styled.h3`
	margin-top: 30px;
	margin-left: 10px;
	font-size: 24px;
	margin-bottom: 0;
	color: #5e6469;
`;

const CreateARebound = styled.div`
	width: 100%;
	margin-top: 50px;
	margin-bottom: 150px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 20px;
	border-radius: 3px;
	box-shadow: 0px 13px 13px -8px #dadada;
	border: 1px solid #cccccc;

	&:hover {
	}
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
	margin-top: 30px;

	@media all and (max-width: 800px) {
		width: 100%;
	}
`;

const CommentBoxWrapper = styled.div`
	width: calc(33.333%);
	margin-top: 30px;

	@media all and (max-width: 800px) {
		width: 100%;
	}
`;

const ReboundInfo = styled(Link)`
	position: absolute; 
	top: -2px;
`;

const OGInfo = styled(Link)`
	position: absolute;     
	right: 0;
	top: -2px;
`;

class TrackShow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			imgHeight: 0,
			paramsId: this.props.match.params.id
		};
	}

	componentDidMount() {
		this._ismounted = true;
		this.loadData();
	}

	componentDidUpdate() {
		if (this.state.paramsId != this.props.match.params.id) {
			this.setState({ paramsId: this.props.match.params.id });
			this.loadData();
		}
	}

	componentWillUnmount() {
		this._ismounted = false;
	}

	loadData = () => {
		if (this._ismounted) {
			$.get(`/tracks/show_track/${this.props.match.params.id}`).done((res) => {
				track = res.shift();
				if (masterAudioTag.paused) window.masterShowTrack(track);
				track.rebounds = res;
				this.forceUpdate();
			});
		}
	};

	deleteTrack = () => {
		$.ajax({
			url: `/tracks/${track.id}`,
			type: 'DELETE',
			success: function (result) {
				window.location = "/";
			}
		});
	}

	render() {
		return track.name ? (
			<Wrapper>
				{!!track.rebound_from &&
					(track.rebound_from.id !== track.og_track.id ? (
						<React.Fragment>
							<ReboundInfo to={`/tracks/${track.rebound_from.id}`}>
								Remixed from: {track.rebound_from.name}
							</ReboundInfo>
							<OGInfo to={`/tracks/${track.og_track.id}`}>Original track: {track.og_track.name}</OGInfo>
						</React.Fragment>
					) : (
						<ReboundInfo to={`/tracks/${track.og_track.id}`}>
							Remixed from original track: {track.og_track.name}
						</ReboundInfo>
					))}
				<SongBoxWrapper>
					<SongBox
						fontSize={40}
						width={'100%'}
						height={window.__good_height__}
						trackInfo={track}
						enableTrack={() => {
							window.masterShowTrack(track, true);
						}}
						showRank={false}
						onLoadImage={(e) => {
							// this.setState({ imgHeight: e.target.height });
						}}
					/>
				</SongBoxWrapper>
				<CommentBoxWrapper style={{ height: window.__good_height__ }}>
					<CommentBox trackId={track.id} trackInfo={track} />
				</CommentBoxWrapper>

				{
					window.OPTIONS.current_user && window.OPTIONS.current_user.id == track.user_id && track.rebounds.length == 0 &&
					<DeleteBox onClick={this.deleteTrack}>
						Delete this track
					</DeleteBox>
				}
				
			{ track.rebounds.length > 0 && <React.Fragment>
				<ReboundHeader>Remixes:</ReboundHeader> 
				<ReboundsBox>
					{track.rebounds.map((rebound) => {
						return (
							<ReboundRow key={rebound.id}>
								<SongBoxWrapper>
									<SongBox
										fontSize={40}
										width={'100%'}
										height={window.__good_height__}
										trackInfo={rebound}
										enableTrack={() => {
											window.masterShowTrack(rebound, true);
										}}
										showRank={false}
										onLoadImage={(e) => {
											// let newState = {};
											// newState[`imgHeight-${rebound.id}`] = e.target.height;
											// this.setState(newState);
										}}
									/>
								</SongBoxWrapper>

								<CommentBoxWrapper style={{ height: window.__good_height__ }}>
									<CommentBox trackId={rebound.id} trackInfo={rebound} />
								</CommentBoxWrapper>
							</ReboundRow>
						);
					})}
				</ReboundsBox>
			</React.Fragment>
			}
				

				{!!window.OPTIONS.current_user ? (
					<CreateARebound>
						<AddATrackBox>
							<ReboundHeader>Create a remix of {track.name}:</ReboundHeader>
							<SmallerHeader>
								Import the track into your favorite music app, mess around with it, and then upload your
								remix.
							</SmallerHeader>
							<AddATrack reboundTrack={track} />
						</AddATrackBox>
					</CreateARebound>
				) : (
					<CreateARebound>
						<LoggedOutMessage>
							<a href="/users/sign_in">Login</a> or <a href="/users/sign_up">sign up</a> to create a
							rebound.
						</LoggedOutMessage>
					</CreateARebound>
				)}
			</Wrapper>
		) : (
			<div />
		);
	}
}

export default TrackShow;
