import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import upload from '../util/upload';
import { Loader } from './AttachmentBox';

const LoaderWrapper = styled.div`
	position: relative;
	margin-top: 22px;
	height: 50px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const NameInput = styled.input`
	width: 100%;
	margin-left: 10px !important;
	margin-bottom: 0 !important;
	border: 1px solid #adadad;
	color: #5e6469;
	border-radius: 3px;
	font-size: 14px;

	::placeholder {
		color: #bdbdbd;
		opacity: 1;
	}
`;

const DownloadButton = styled.a`
	font-size: 14px;
	cursor: pointer;
	width: 100%;
	margin-left: 10px;
	color: white !important;
	transform: scale(1, 1);
	transition: transform 0.5s ease;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #f15d22;
	border: none;
	border-radius: 3px;
	text-decoration: none !important;
	line-height: 17px;
	height: 17px;
	padding: 10px;
	box-sizing: content-box;

	&:hover {
		background: #f15d22;
	}
`;

const PleaseComplete = styled.p`
	font-size: 14px;
	margin-top: 30px;
	margin-bottom: 10px;
	background: #5e6469;
	border: none;
	border-radius: 3px;
	text-decoration: none !important;
	padding: 10px;
	color: white;
	display: flex;
	justify-content: center;
	cursor: help;
	margin-left: 26px;
	width: 100%;
	line-height: initial;

	&:hover {
		background: #5e6469;
	}
`;

const Upload = styled.button`
	width: 100%;
	margin-top: 30px;
	margin-bottom: 10px;
	font-size: 14px;
	cursor: pointer;
	padding: 10px;
	background: #79e84b;
	border: none;
	border-radius: 3px;
	text-decoration: none !important;
	outline: none;
	margin-left: 26px;
	text-shadow: none;
	font-weight: normal;
	line-height: 17px;

	&:hover {
		background: #79e84b !important;
	}

	&:active {
		background: #40da00;
	}
`;

const Heading = styled.h3`
	font-size: 16px;
	margin-bottom: 30px;
	width: 100%;
	line-height: 27px;
	display: flex;
`;

const StyledLabel = styled.label`
	padding: 10px;
	width: 100%;
	font-size: 14px !important;
	line-height: initial;
	margin-left: 10px;
	margin-right: 0px;
`;

class AddATrack extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedFile: false,
			selectedImage: false,
			doneUploading: false,
			trackName: '',
			uploading: false
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
		this.setState({ uploading: true });

		upload(
			this.state.selectedFile,
			this.state.selectedImage,
			{
				name: this.state.trackName,
				newTrackName: this.state.selectedFile.name,
				newPhotoName: this.state.selectedImage.name,
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
								Download the track
							</DownloadButton>
						</Heading>
						<Heading>
							2.
							<input type="file" id="file" onChange={this.audioFileChangeHandler} accept="audio/*" />
							<StyledLabel htmlFor="file">
								{this.state.selectedFile ? this.state.selectedFile.name : 'Choose an audio file'}
							</StyledLabel>
						</Heading>
						<Heading>
							3.
							<input type="file" id="img-file" onChange={this.imageFileChangeHandler} accept="image/*" />
							<StyledLabel htmlFor="img-file">
								{this.state.selectedImage ? this.state.selectedImage.name : 'Choose an image'}
							</StyledLabel>
						</Heading>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Heading>
							1.
							<NameInput
								placeholder="Name"
								style={{ width: '100%' }}
								id="name"
								type="text"
								onChange={this.nameChangeHandler}
							/>
						</Heading>
						<Heading>
							2.
							<input type="file" id="file" onChange={this.audioFileChangeHandler} accept="audio/*" />
							<StyledLabel htmlFor="file">
								{this.state.selectedFile ? this.state.selectedFile.name : 'Choose an audio file'}
							</StyledLabel>
						</Heading>
						<Heading>
							3.
							<input type="file" id="img-file" onChange={this.imageFileChangeHandler} accept="image/*" />
							<StyledLabel htmlFor="img-file">
								{this.state.selectedImage ? this.state.selectedImage.name : 'Choose an image'}
							</StyledLabel>
						</Heading>
					</React.Fragment>
				)}
				<Heading>
					{this.formValidation() ? this.state.uploading ? (
						<LoaderWrapper>
							<Loader src="https://beatoftheday.s3.us-west-1.amazonaws.com/audio%2F7a17a42d-5cc8-4f96-bc7f-d7de1d8ac79a%2Floader.gif" />
						</LoaderWrapper>
					) : (
						<Upload onClick={this.onClickUpload}>Upload</Upload>
					) : (
						<PleaseComplete>
							Choose an audio file and an image to upload your{' '}
							{!!this.props.reboundTrack ? 'remix' : 'track'}
						</PleaseComplete>
					)}
				</Heading>
			</React.Fragment>
		);
	}
}

export default AddATrack;
