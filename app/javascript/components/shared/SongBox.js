import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import Tippy from '@tippyjs/react';

const SongBoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px;
	position: relative;
	border-radius: 3px;
	overflow: hidden;
	box-shadow: 0 8px 6px -6px black;
	transform: scale(1, 1);
	transition: transform 0.5s ease;

	&:hover {
		transform: scale(1.03, 1.03);
	}
`;

const SongImg = styled.img`
	height: 100px;
	width: 180px;
	transition: width 1.2s ease;
`;

const BottomLeft = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	display: flex;
`;

const NumLikes = styled.p`
	margin-left: 5px;
	margin-bottom: 0;
	opacity: 0.5;
`;

const NumBakes = styled.p`
	margin-left: 5px;
	margin-bottom: 0;
	opacity: 0.5;
`;

const DankButton = styled.div`
	cursor: pointer;
	font-size: 24px;
	padding: 10px;
	color: white;
	margin-bottom: 5px;
	transform: scale(1, 1);
	transition: transform 0.2s linear;
	transition: background-color 0.2s linear;
	transition: color 0.2s linear;
	background: rgba(0, 0, 0, 0.5);
	display: flex;

	&:hover {
		color: #e0e0e0;
		background: rgba(102, 102, 102, 0.5);
		transform: scale(1.03, 1.03);
	}

	&:active {
		color: #ffffff;
		background: rgba(158, 158, 158, 0.5);
		transform: scale(0.95, 0.95);
	}
`;

const LikeButton = styled(DankButton)`
	margin-left: 5px;
`;

const BakedButton = styled(DankButton)`
	margin-left: 5px;
`;

const PlayButton = styled(DankButton)`
	margin-right: 5px;
	position: absolute;
	bottom: 0;
	right: 0;
`;

const IconContainer = styled.div`opacity: ${(props) => (props.solid ? 1 : 0.5)};`;

const NameText = styled(Link)`
  display: block;
  background: black;
  opacity: 0.5;
  color: white !important;
  margin-bottom: 5px;
  width: fit-content;
  text-decoration: none !important;
  line-height: initial;

  &:visited {
    color: white !important;
  }
`;

const SongName = styled.div`
	cursor: pointer;
	font-size: 14px;
	padding: 5px;
	margin-right: 5px;
	position: absolute;
	top: 0;
	left: 0;
	text-decoration: none !important;
	color: white !important;

	&:visited {
		color: white !important;
	}
`;

class SongBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			elName: Math.random().toString(36).substring(10),
			numLikes: props.trackInfo.num_likes,
			numBakes: props.trackInfo.num_bakes,
			liked: false,
			baked: false
		};

		this.bakeTrack = this.bakeTrack.bind(this);
	}

	componentDidMount() {
		if (!this.props.width || !this.props.height) {
			const nameEl = $(`#name-${this.state.elName}`);
			const elWidth = $(nameEl).width();
			const goodWidth = elWidth < 260 ? elWidth + elWidth * (Math.random() / 2 + 1) : elWidth;
			const width = goodWidth < 170 ? 170 : goodWidth > 260 ? 260 : goodWidth;
			const img = $(`.name-${this.state.elName}`);
			img.width(width);
		}
	}

	likeTrack = () => {
		this.setState({
			numLikes: this.state.numLikes + 1,
			liked: true
		});
		$.ajax({
			type: 'POST',
			url: '/likes',
			data: { track_id: this.props.trackInfo.id }
		});
	};

	bakeTrack = () => {
		this.setState({
			numBakes: this.state.numBakes + 1,
			baked: true
		});
		$.ajax({
			type: 'POST',
			url: '/likes',
			data: { track_id: this.props.trackInfo.id, baked: true }
		});
	};

	render() {
		return (
			<SongBoxWrapper>
				<SongName>
					<NameText
						style={{ fontSize: this.props.fontSize || 14 }}
						id={`name-${this.state.elName}`}
						to={`/tracks/${this.props.trackInfo.id}`}
					>
						{this.props.trackInfo.name}
					</NameText>
					<NameText
						style={{ fontSize: this.props.fontSize || 14 }}
						to={`/artist/${this.props.trackInfo.artist_name}`}
					>
						{this.props.trackInfo.artist_name}
					</NameText>
				</SongName>
				<BottomLeft>
					<Tippy theme="translucent" content="Like this track" placement="bottom">
						<LikeButton onClick={this.likeTrack}>
							<IconContainer solid={this.props.trackInfo.liked}>♡</IconContainer>
							<NumLikes>{this.state.numLikes}</NumLikes>
						</LikeButton>
					</Tippy>
					<Tippy theme="translucent" content="Mark this track as baked" placement="bottom">
						<BakedButton onClick={this.bakeTrack}>
							<IconContainer solid={this.props.trackInfo.baked}>🧁</IconContainer>
							<NumBakes>{this.state.numBakes}</NumBakes>
						</BakedButton>
					</Tippy>
				</BottomLeft>
				<PlayButton onClick={this.props.enableTrack}>
					<IconContainer>▶</IconContainer>
				</PlayButton>
				<SongImg
					onLoad={this.props.onLoadImage}
					className={`name-${this.state.elName} songbox`}
					src={this.props.trackInfo.photo}
					style={
						this.props.width && this.props.height ? (
							{ height: this.props.height, width: this.props.width }
						) : (
							{}
						)
					}
				/>
			</SongBoxWrapper>
		);
	}
}

export default SongBox;
