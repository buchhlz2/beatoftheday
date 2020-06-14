import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
	background: #7d7d7d;
	padding: 0 25px;
`;

const Emoji = styled.div`
	font-size: 34px;
	margin-right: 20px;
`;

const ArtistWrap = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	margin-right: 10px;
`;

const SharedName = styled(Link)`
  color: white !important;
  background: none !important;
  text-decoration: none !important;
  &:hover {
		text-decoration: underline !important;
	}
`;

const Name = styled(SharedName)`
	font-size: 16px;
`;

const ArtistName = styled(SharedName)`
	color: gainsboro !important;
	font-size: 12px;
`;

const Audio = styled.audio`
	flex-grow: 3;
	outline: none;
`;

class Player extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			artistName: '',
			link: false
		};

		window.masterShowTrack = (obj, play = false) => {
			this.setState(
				{
					id: obj.id,
					name: obj.name,
					artistName: obj.artist_name,
					link: obj.link
				},
				() => {
					this.forceUpdate();
					if (play) window.masterAudioTag.play();
				}
			);
		};
	}

	componentDidMount() {
		window.masterAudioTag = $('#master-audio-tag').get(0);
	}

	componentDidUpdate() {
		window.masterAudioTag = $('#master-audio-tag').get(0);
	}

	render() {
		return (
			<Wrapper>
				<Emoji>📻</Emoji>
				<ArtistWrap>
					<Name to={`/tracks/${this.state.id}`}>{this.state.name}</Name>
					<ArtistName to={`/artist/${this.state.artistName}`}>{this.state.artistName}</ArtistName>
				</ArtistWrap>
				<Audio id="master-audio-tag" controls key={this.state.link}>
					{this.state.link && <source src={this.state.link} />}
				</Audio>
			</Wrapper>
		);
	}
}

export default Player;
