import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

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
		transform: scale(1.05, 1.05);
	}
`;

const SongImg = styled.img`
	height: 100px;
	width: 180px;
	transition: width 1.2s ease;
`;

const NameText = styled(Link)`
  display: block;
	background: black;
	opacity: 0.5;
	color: white;
	margin-bottom: 5px;
	width: fit-content;
	text-decoration: none !important;
  
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

	&:visited {
		color: white !important;
	}
`;

const PlayButton = styled.div`
	cursor: pointer;
	font-size: 24px;
	padding: 10px;
	margin-right: 5px;
	position: absolute;
	bottom: 0;
	right: 0;
	background: black;
	opacity: 0.5;
	color: white;
	margin-bottom: 5px;
	transform: scale(1, 1);
	transition: transform 0.2s linear;
	transition: background-color 0.2s linear;
	transition: color 0.2s linear;

	&:hover {
		color: #e0e0e0;
		background: #666;
		transform: scale(1.05, 1.05);
	}

	&:active {
		color: #ffffff;
		background: ##9e9e9e;
		transform: scale(0.95, 0.95);
	}
`;

class SongBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			elName: Math.random().toString(36).substring(10)
		};
	}

	componentDidMount() {
		const nameEl = $(`#name-${this.state.elName}`);
		const elWidth = $(nameEl).width();
		const goodWidth = elWidth < 250 ? elWidth + elWidth * Math.random() : elWidth;
		const width = goodWidth < 150 ? 150 : goodWidth > 250 ? 250 : goodWidth;
		const img = $(`.name-${this.state.elName}`);
		img.width(width);
	}

	render() {
		return (
			<SongBoxWrapper>
				<SongName>
					<NameText id={`name-${this.state.elName}`} to={`/tracks/${this.props.trackInfo.id}`}>
						{this.props.trackInfo.name}
					</NameText>
					<NameText to={`/artist/${this.props.trackInfo.artist_name}`}>
						{this.props.trackInfo.artist_name}
					</NameText>
				</SongName>
				<PlayButton onClick={this.props.enableTrack}>▶</PlayButton>
				<SongImg className={`name-${this.state.elName}`} src={this.props.trackInfo.photo} />
			</SongBoxWrapper>
		);
	}
}

export default SongBox;
