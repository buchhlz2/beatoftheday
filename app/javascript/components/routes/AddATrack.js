import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddATrack from '../shared/AddATrack';
import upload from '../util/upload';
import { ReboundHeader } from './TrackShow';

const StyledReboundHeader = styled(ReboundHeader)`
	margin-bottom: 30px;
	margin-left: 10px;
`;

const Wrapper = styled.div`
	margin-top: 30px;
	margin-bottom: 200px;
	padding: 20px;
	display: flex;
	align-items: start;
	flex-direction: column;
	flex-wrap: wrap;
	max-width: 500px;
	width: 100%;

	input {
		padding-left: 0;
		margin-left: 0;
		font-size: 14px;

		&[type="text"] {
			padding: 10px;
			font-size: 14px;
		}
	}
`;

class AddATrackRoute extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Wrapper>
				<StyledReboundHeader>New Track</StyledReboundHeader>
				<AddATrack />
			</Wrapper>
		);
	}
}

export default AddATrackRoute;
