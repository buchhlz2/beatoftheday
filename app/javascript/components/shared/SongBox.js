import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

const SongBoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin: 30px;
	position: relative;
	cursor: pointer;
`;

const SongImg = styled.img`
	height: 100px;
	width: 180px;
	transition: width 1s ease;
`;

const NameText = styled.div``;

const SongName = styled.div`
	cursor: pointer;
	font-size: 14px;
	padding: 5px;
	margin-right: 5px;
	position: absolute;
	top: 5px;
	left: 5px;
	background: black;
	opacity: 0.5;
	color: white;
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
			<SongBoxWrapper onClick={this.props.enableTrack}>
				<SongImg className={`name-${this.state.elName}`} src={this.props.photo} />
				<SongName>
					<NameText id={`name-${this.state.elName}`}>{this.props.name}</NameText>
				</SongName>
			</SongBoxWrapper>
		);
	}
}

export default SongBox;
