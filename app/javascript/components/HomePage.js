import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SongBox from './shared/SongBox';
import $ from 'jquery';

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 1080px;
	background: #f7f7f7;
`;

const InnerHeader = styled.div`
	width: 100%;
	height: 120px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
`;

const AddATrackLink = styled.a`
	cursor: pointer;
	font-size: 14px;
	padding: 5px;
	padding-bottom: 100px;
	width: 100%;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

class HomePage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<InnerHeader>💐 Welcome back!</InnerHeader>
				<Wrapper>
					{this.props.tracks.map((obj, i) => {
						return (
							<SongBox
								key={obj.link}
								trackInfo={obj}
								enableTrack={() => {
									this.props.enableTrack(i);
								}}
							/>
						);
					})}
				</Wrapper>
				<AddATrackLink href="/add-a-track">Add a track!</AddATrackLink>
			</div>
		);
	}
}

export default HomePage;
