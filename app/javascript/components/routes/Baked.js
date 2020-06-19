import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from '../shared/SongBox';
import $ from 'jquery';

const Header = styled.h3`font-size: 40px;`;

class Baked extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<div>
				<Header>Baked Tracks:</Header>
			</div>
		);
	}
}

export default Baked;
