import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Wrapper = styled.div`
	margin-top: 50px;
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	max-width: 1080px;
	background: #f7f7f7;
`;

const SongBox = styled.div`
	display: flex;
	flex-direction: column;
`;

class Home extends React.Component {
	render() {
		return (
			<Wrapper className="outside-video-area">
				<SongBox>
					<p>Hii</p>
					<br />
					<br />
					<br />
					<p>Take your time girl</p>
					<audio controls>
						<source
							src="https://beatoftheday.s3-us-west-1.amazonaws.com/take_your_time_girl.m4a"
							type="audio/ogg"
						/>
					</audio>
				</SongBox>
			</Wrapper>
		);
	}
}

export default Home;
