import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import upload from '../util/upload';

const Upload = styled.button`
	width: 100%;
	height: 40px;
	margin-top: 20px;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
`;

const Heading = styled.h3`
	margin-bottom: 30px;
	width: 100%;
`;
const PleaseComplete = styled.p`
	font-size: 16px;
	margin-top: 20px;
`;

class AddATrack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedFile: false,
			selectedImage: false,
			doneUploading: false,
			trackName: ''
		};
	}

	componentWillUnmount() {
		this.setState({ doneUploading: false });
	}

	audioFileChangeHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	imageFileChangeHandler = (event) => {
		this.setState({
			selectedImage: event.target.files[0]
		});
	};

	nameChangeHandler = (event) => {
		this.setState({
			trackName: event.target.value
		});
	};

	onClickUpload = () => {
		upload(
			this.state.selectedFile,
			this.state.selectedImage,
			{ name: this.state.trackName, reboundTrackId: this.props.reboundTrackId },
			(res) => {
				window.location = `/tracks/${res.id}`;
			}
		);
	};

	formValidation = () => {
		return (
			(this.props.reboundTrackId ? true : this.state.trackName) &&
			this.state.selectedFile &&
			this.state.selectedImage
		);
	};

	render() {
		return (
			<React.Fragment>
				{this.props.reboundTrackId ? (
					<React.Fragment>
						<Heading>
							1. Download the track you want to rebound by clicking the three dots in the audio player at
							the bottom.
						</Heading>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Heading>1. Name your track:</Heading>
						<input id="name" type="text" onChange={this.nameChangeHandler} />
					</React.Fragment>
				)}
				<Heading>2. Choose an mp3 or m4a file to upload:</Heading>
				<input type="file" onChange={this.audioFileChangeHandler} accept="audio/*" />

				<Heading>3. Choose an image to go with your {this.props.reboundTrackId ? 'rebound' : 'track'}:</Heading>
				<input type="file" onChange={this.imageFileChangeHandler} accept="image/*" />
				{this.formValidation() ? this.state.uploading ? (
					<Upload>Uploading...</Upload>
				) : (
					<Upload onClick={this.onClickUpload}>Upload!</Upload>
				) : (
					<PleaseComplete>
						Please complete all the fields to upload your {this.props.reboundTrackId ? 'rebound' : 'track'}.
					</PleaseComplete>
				)}
			</React.Fragment>
		);
	}
}

export default AddATrack;
