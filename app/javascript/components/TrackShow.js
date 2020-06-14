import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

const Wrapper = styled.div`
	margin-top: 100px;
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 1080px;
`;

var track = {};

class TrackShow extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		$.get(`/tracks/show_track/${this.props.match.params.id}`).done((res) => {
			if (masterAudioTag.paused) window.masterShowTrack(res);
			track = res;
			this.forceUpdate();
		});
	}

	render() {
		return track.name ? <Wrapper>{track.name}</Wrapper> : <div />;
	}
}

export default TrackShow;
