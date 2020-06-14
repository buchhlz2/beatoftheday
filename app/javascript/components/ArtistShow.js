import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';
import SongBox from './shared/SongBox';

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 1080px;
	background: #f7f7f7;
	margin-bottom: 200px;
`;

const InnerHeader = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
`;

class ArtistShow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			artist: {},
			tracks: []
		};
	}

	componentDidMount() {
		$.get(`/show_artist/${this.props.match.params.id}`).done((res) => {
			this.setState(
				{
					artist: res.artist,
					tracks: res.tracks
				},
				() => {
					if (masterAudioTag.paused) window.masterShowTrack(this.state.tracks[0]);
				}
			);
		});
	}

	render() {
		return (
			<div>
				<InnerHeader>💐 {this.state.artist.artist_name}</InnerHeader>
				<Wrapper>
					{this.state.tracks.map((obj, i) => {
						return (
							<SongBox
								key={obj.link}
								trackInfo={obj}
								enableTrack={() => {
									window.masterShowTrack(this.state.tracks[i], true);
								}}
							/>
						);
					})}
				</Wrapper>
			</div>
		);
	}
}

export default ArtistShow;
