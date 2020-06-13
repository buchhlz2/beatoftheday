import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
`;

const SongBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px;
`;

const SongImg = styled.img`
	height: 100px;
	width: 0;
`;

const NameText = styled.div``;

const SongName = styled.div`
	cursor: pointer;
	font-size: 14px;
	padding: 5px;
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

class AddATrack extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidUpdate() {
		$("[id^='name']").each((i, el) => {
			const elWidth = $(el).width();
			const goodWidth = elWidth < 175 ? elWidth + elWidth * 0.43 : elWidth;
			const width = goodWidth < 150 ? 150 : goodWidth > 250 ? 250 : goodWidth;
			$(el).parent().parent().find('img').width(width);
		});
	}

	render() {
		return (
			<div>
				<InnerHeader>💐 Welcome back!</InnerHeader>
				<Wrapper>
					{this.props.tracks.map((obj, i) => {
						return (
							<SongBox key={obj.link}>
								<SongImg className={`name-${i}`} src={obj.photo} />
								<SongName onClick={() => this.props.enableTrack(i)}>
									<NameText id={`name-${i}`}>{obj.name}</NameText>
								</SongName>
							</SongBox>
						);
					})}
				</Wrapper>
				<AddATrackLink href="/add-a-track">Add a track!</AddATrackLink>
			</div>
		);
	}
}

export default AddATrack;
