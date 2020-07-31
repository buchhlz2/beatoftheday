import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import moment from 'moment';
import { Link } from 'react-router-dom';
import artistUrl from '../util/artistUrl';
import AttachmentBox from './AttachmentBox';

const Wrapper = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	border-radius: 3px;
	position: relative;
	box-shadow: 0px 13px 13px -8px #dadada;
	border: 1px solid #cccccc;
`;

const Heading = styled.div`
	font-size: 10px;
	width: 100%;
	border-bottom: 1px solid #cccccc;
	padding: 5px;
	display: flex;
	justify-content: space-between;
	color: #6b6b6b;
`;

const ThreadBox = styled.div`
	width: 100%;
	height: 100%;
	padding: 5px;
	overflow-y: scroll;
	margin-bottom: 50px;
`;

const Comment = styled.div`
	font-size: 14px;
	width: 100%;
	margin-bottom: 10px;
`;

const CommentInfoWrapper = styled.div`
	display: flex;
	width: 100%;
	justify-content: flex-start;
	align-items: flex-end;
`;

const CommentAuthor = styled(Link)`
  font-size: 10px;
  color: #6b6b6b !important;
  margin-right: 5px;
  text-decoration: none !important;
  padding: 0 !important;

  &:hover {
    color: #6b6b6b !important;
    background: none;
  }
`;

const CommentTime = styled.div`
	font-size: 8px;
	color: #cccccc;
`;

const CommentText = styled.div`
	font-size: 13px;
	color: #6b6b6b;
	width: 100%;
`;

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	position: absolute;
	bottom: 0;
	left: 0;

	input {
		margin: 0 5px 5px 5px;
		border-radius: 3px;
		border: 0;
		min-width: 0;
		border: 1px solid #cccccc;
	}

	div {
		margin-bottom: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
`;

const StyledInput = styled.input`flex-grow: 4;`;

const SubmitButton = styled.div`
	cursor: pointer;
	padding: 10px;
	border-radius: 3px;
	flex-grow: 1;
	background: white;
	color: #7d7d7d;
	margin-right: 5px;
	border: 0px;
	border-radius: 3px;
	user-select: none;
	transition: all 0.2s ease;
	transform: scale(1, 1);

	&:hover {
		background: #79e84b;
		color: white;
		transform: scale(1.03, 1.03);
	}

	&:active {
		background: #40da00;
		color: white;
		transform: scale(0.95, 0.95);
	}
`;

const HeadingSpan = styled.span`
	cursor: pointer;
	font-weight: 600;

	&:hover {
		color: #4c4c4c;
	}
`;

class CommentBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			thread: [],
			attachments: [],
			showAttachments: false,
			newCommentText: '',
			loading: false,
			trackId: this.props.trackId,
			trackInfo: this.props.trackInfo
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
		$.get(`/track_comments/${this.state.trackId}`).done((res) => {
			if (res.thread) {
				this.setState({
					thread: res.thread
				});
			}
		});
	};

	createComment = () => {
		if (this.state.newCommentText.length === 0) return;
		this.setState({ loading: true });
		$.post(`/create_track_comment/${this.props.trackId}`, {
			text_content: this.state.newCommentText
		}).done((res) => {
			const newThread = this.state.thread;
			newThread.push(res.comment);
			this.setState({
				thread: newThread,
				newCommentText: '',
				loading: false
			});
		});
	};

	_handleKeyDown = (e) => {
		if (!this.state.loading && e.key === 'Enter') {
			this.createComment();
		}
	};

	render() {
		const thread =
			this.state.thread.length > 0
				? this.state.thread
				: [
						{
							artist_name: 'Hey',
							created_at: new Date(),
							text: 'Say something here...'
						}
					];

		return (
			<Wrapper>
				<Heading>
					<HeadingSpan
						onClick={() => {
							this.setState({ showAttachments: false });
						}}
					>
						{this.state.thread.length} {this.state.thread.length == 1 ? 'Comment' : 'Comments'}
					</HeadingSpan>
					<HeadingSpan
						onClick={() => {
							this.setState({ showAttachments: true });
						}}
					>
						{this.state.attachments.length}{' '}
						{this.state.attachments.length == 1 ? 'Attachment' : 'Attachments'}
					</HeadingSpan>
				</Heading>
				<AttachmentBox
					trackId={this.props.trackId}
					setCommentBoxState={this.setState.bind(this)}
					visible={this.state.showAttachments}
				/>
				{!this.state.showAttachments && (
					<React.Fragment>
						<ThreadBox>
							{thread.map((comment, i) => {
								return (
									<Comment key={i}>
										<CommentInfoWrapper>
											<CommentAuthor to={artistUrl(comment.artist_name)}>
												{comment.artist_name}
											</CommentAuthor>
											<CommentTime> {moment(comment.created_at).from(new Date())}</CommentTime>
										</CommentInfoWrapper>
										<CommentText>{comment.text}</CommentText>
									</Comment>
								);
							})}
						</ThreadBox>
						{window.OPTIONS.current_user && (
							<React.Fragment>
								<InputWrapper>
									<StyledInput
										type="text"
										maxLength="766"
										onKeyDown={this._handleKeyDown}
										value={this.state.newCommentText}
										onChange={(event) => {
											this.setState({
												newCommentText: event.target.value
											});
										}}
									/>
									<SubmitButton
										onClick={() => {
											if (!this.state.loading) this.createComment();
										}}
									>
										Send
									</SubmitButton>
								</InputWrapper>
							</React.Fragment>
						)}
					</React.Fragment>
				)}
			</Wrapper>
		);
	}
}

export default CommentBox;
