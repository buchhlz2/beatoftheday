import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import upload from '../util/upload';

const DownloadButton = styled.a`
	height: 40px;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
	margin: 10px;
	margin-bottom: 20px;
	border-radius: 999px;
	background: #666;
	color: white !important;
	transform: scale(1, 1);
	transition: transform 0.5s ease;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px;

	&:hover {
		transform: scale(1.03, 1.03);
	}

	&:active {
		transform: scale(0.99, 0.99);
		background: #666 !important;
	}
`;

const Upload = styled.button`
	width: 100%;
	height: 40px;
	margin-top: 20px;
	font-size: 16px;
	font-weight: 700;
	cursor: pointer;
`;

const Heading = styled.h3`
	margin-bottom: 20px;
	width: 100%;
	line-height: 27px;
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
			{
				name: this.state.trackName,
				newTrackName: this.state.selectedFile.name,
				reboundTrackId: this.props.reboundTrack ? this.props.reboundTrack.id : undefined
			},
			(res) => {
				window.location = `/tracks/${res.id}`;
			}
		);
	};

	formValidation = () => {
		return (
			(!!this.props.reboundTrack ? true : this.state.trackName) &&
			this.state.selectedFile &&
			this.state.selectedImage
		);
	};

	// dowloadAuidio = () => {};

	render() {
		return (
			<React.Fragment>
				{!!this.props.reboundTrack ? (
					<React.Fragment>
						<Heading>
							1.
							<DownloadButton
								href={this.props.reboundTrack.link}
								download={`${this.props.reboundTrack.name}.${this.props.reboundTrack.audio_type}`}
							>
								Download this track
							</DownloadButton>
							(you can click into any of the previous rebounds if you want to rebound off any of those).
						</Heading>
						<Heading>
							2. Import the track into your favorite music app and add a new layer to the track.
						</Heading>
						<Heading>3. Choose your new mp3 or m4a file to upload:</Heading>
						<input type="file" onChange={this.audioFileChangeHandler} accept="audio/*" />
						<Heading>
							4. Choose an image to go with your {!!this.props.reboundTrack ? 'rebound' : 'track'}:
						</Heading>
						<input type="file" onChange={this.imageFileChangeHandler} accept="image/*" />
					</React.Fragment>
				) : (
					<React.Fragment>
						<Heading>1. Name your track:</Heading>
						<input id="name" type="text" onChange={this.nameChangeHandler} />
						<Heading>2. Choose an mp3 or m4a file to upload:</Heading>
						<input type="file" onChange={this.audioFileChangeHandler} accept="audio/*" />
						<Heading>
							3. Choose an image to go with your {!!this.props.reboundTrack ? 'rebound' : 'track'}:
						</Heading>
						<input type="file" onChange={this.imageFileChangeHandler} accept="image/*" />
					</React.Fragment>
				)}

				{this.formValidation() ? this.state.uploading ? (
					<Upload>Uploading...</Upload>
				) : (
					<Upload onClick={this.onClickUpload}>Upload!</Upload>
				) : (
					<PleaseComplete>
						Please complete all the fields to upload your {!!this.props.reboundTrack ? 'rebound' : 'track'}.
					</PleaseComplete>
				)}
			</React.Fragment>
		);
	}
}

export default AddATrack;
