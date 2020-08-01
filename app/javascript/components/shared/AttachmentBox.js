import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import attachmentUpload from '../util/attachmentUpload';
import artistUrl from '../util/artistUrl';
import { Link } from 'react-router-dom';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 5px;
	overflow-y: scroll;
	margin-bottom: 50px;
	display: flex;
	flex-direction: column;
`;

export const StyledLabel = styled.label`flex-grow: 3;`;

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 5px;
	height: 43px;
`;

const SubmitButton = styled.div`
	cursor: pointer;
	border-radius: 3px;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	background: white;
	color: #7d7d7d;
	margin-right: 5px;
	border: 0px;
	border-radius: 3px;
	user-select: none;
	transition: all 0.2s ease;

	&:hover {
		background: #79e84b;
		color: white;
	}

	&:active {
		background: #40da00;
		color: white;
	}
`;

const Attachment = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 10px;
`;
const AttachmentName = styled.a`
	text-decoration: none !important;
	color: #666 !important;

	&:hover {
		color: #929292 !important;
		background: none;
	}
`;

const AttachmentUser = styled.span`
	font-size: 11px;
	color: #929292;

	a {
		text-decoration: none !important;
		color: #666;

		&:hover {
			background: none;
			color: #929292 !important;
		}
	}
`;

class AttachmentBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			trackId: this.props.trackId,
			attachments: [],
			selectedFile: false,
			loading: false
		};
	}

	componentDidUpdate() {
		if (this.state.trackId != this.props.trackId) {
			this.setState({ trackId: this.props.trackId, thread: [] }, this.loadData);
		}
	}

	componentDidMount() {
		this.loadData();
	}

	loadData = () => {
		$.get(`/attachments?track_id=${this.state.trackId}`).done((res) => {
			if (res.attachments) {
				this.setState({
					attachments: res.attachments
				});
				this.props.setCommentBoxState({ attachments: res.attachments });
			}
			this.setState({ loading: false });
		});
	};

	attachmentChangeHandler = (event) => {
		this.setState({
			selectedFile: event.target.files[0]
		});
	};

	onClickUpload = () => {
		this.setState({ loading: true });

		attachmentUpload(
			this.state.selectedFile,
			{
				attachmentName: this.state.selectedFile.name,
				trackId: this.state.trackId
			},
			((res) => {
				attachments = this.state.attachments.concat(res);
				this.setState({ attachments: attachments });
				this.props.setCommentBoxState({ attachments: attachments });
			}).bind(this)
		);
	};

	render() {
		return (
			this.props.visible && (
				<Wrapper>
					{this.state.attachments.map((attachment, i) => {
						return (
							<Attachment key={i}>
								<AttachmentName href={attachment.url} download={attachment.name}>
									{attachment.name}
								</AttachmentName>
								<AttachmentUser>
									from <Link to={artistUrl(attachment.artist_name)}>{attachment.artist_name}</Link>
								</AttachmentUser>
							</Attachment>
						);
					})}
					<InputWrapper>
						<input type="file" id="file" accept="*" onChange={this.attachmentChangeHandler} />
						<StyledLabel htmlFor="file">
							{this.state.selectedFile ? this.state.selectedFile.name : 'Choose a file'}
						</StyledLabel>
						<SubmitButton
							onClick={() => {
								if (!this.state.loading) this.onClickUpload();
							}}
						>
							Upload
						</SubmitButton>
					</InputWrapper>
				</Wrapper>
			)
		);
	}
}

export default AttachmentBox;
