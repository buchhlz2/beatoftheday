import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import AddATrack from '../shared/AddATrack';
import upload from '../util/upload';

const Wrapper = styled.div`
	margin-top: 100px;
	margin-bottom: 200px;
	padding: 20px;
	display: flex;
	align-items: start;
	flex-direction: column;
	flex-wrap: wrap;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;

	input {
		padding-left: 0;
		margin-left: 0;
		font-size: 16px;

		&[type="text"] {
			padding: 10px;
			font-size: 16px;
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
				<AddATrack />
			</Wrapper>
		);
	}
}

export default AddATrackRoute;
