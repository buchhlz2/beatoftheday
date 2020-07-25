import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import _ from 'lodash';

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
			link: false,
			queue: []
		};

		window.addTracksToQueue = this.addTracksToQueue;
		window.masterShowTrack = this.masterShowTrack;

		document.body.onkeydown = function(e) {
			if (e.keyCode == 32) {
				if (window.masterAudioTag.paused) {
					window.masterAudioTag.play();
				} else {
					window.masterAudioTag.pause();
				}
			}

			return false;
		};
	}

	addTracksToQueue = (tracksArr) => {
		this.setState({ queue: _.uniq(this.state.queue.concat(tracksArr)) });
	};

	masterShowTrack = (obj, play = false) => {
		if (!obj) return;

		console.log(this.state);

		this.setState(
			{
				id: obj.id,
				name: obj.name,
				artistName: obj.artist_name,
				link: obj.link
			},
			() => {
				// trips out if you add this to the set state above dunno why
				this.setState({
					queue: this.state.queue.filter((track) => {
						return track.id !== obj.id;
					})
				});

				this.forceUpdate();
				if (play) window.masterAudioTag.play();
			}
		);
	};

	componentDidMount() {
		window.masterAudioTag = $('#master-audio-tag').get(0);
	}

	componentDidUpdate() {
		window.masterAudioTag = $('#master-audio-tag').get(0);
	}

	playNextSongInQueue = () => {
		window.masterShowTrack(this.state.queue[0], true);
	};

	render() {
		return (
			<Wrapper>
				<Emoji>📻</Emoji>
				<ArtistWrap>
					<Name to={`/tracks/${this.state.id}`}>{this.state.name}</Name>
					<ArtistName to={`/artist/${this.state.artistName}`}>{this.state.artistName}</ArtistName>
				</ArtistWrap>
				<Audio id="master-audio-tag" controls key={this.state.link} onEnded={this.playNextSongInQueue}>
					{this.state.link && <source src={this.state.link} />}
				</Audio>
			</Wrapper>
		);
	}
}

export default Player;
