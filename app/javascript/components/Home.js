import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const tracks = [
	{
		link: 'take_your_time_girl.m4a',
		name: 'Take your time girl'
	},
	{
		link: 'beat.mp3',
		name: 'Beat 10'
	},
	{
		link: '12albert.mp3',
		name: 'Albert'
	},
	{
		link: '14beat.mp3',
		name: 'Beat 14'
	},
	{
		link: '15suicide.mp3',
		name: 'Suicide'
	},
	{
		link: '16bells.mp3',
		name: 'Bells'
	},
	{
		link: '20beat.mp3',
		name: 'Beat 20'
	},
	{
		link: '21beat.mp3',
		name: 'Beat 21'
	},
	{
		link: '22beat.mp3',
		name: 'Beat'
	},
	{
		link: '8grown.mp3',
		name: 'Grown'
	},
	{
		link: '9spider.mp3',
		name: 'Spider'
	},
	{
		link: 'Cadillac.mp3',
		name: 'Cadillac'
	},
	{
		link: 'Nature Boy.mp3',
		name: 'Nature Boy'
	},
	{
		link: 'Tablasong.mp3',
		name: 'Tablasong'
	},
	{
		link: 'The Crunch.mp3',
		name: 'The Crunch'
	},
	{
		link: "You're not alone.mp3",
		name: "You're not alone"
	},
	{
		link: 'bogslore.mp3',
		name: 'Bogslore'
	},
	{
		link: 'cool.mp3',
		name: 'Cool'
	},
	{
		link: 'dontstop.mp3',
		name: 'Dont stop'
	},
	{
		link: 'feeldarydam.mp3',
		name: 'Feeldarydam'
	},
	{
		link: 'haircutday.mp3',
		name: 'Haircut day'
	},
	{
		link: 'ligo.mp3',
		name: 'Ligo'
	},
	{
		link: 'liveforpeace2.mp3',
		name: 'Live for peace'
	},
	{
		link: 'makeitwithyou.mp3',
		name: 'Make it with you'
	},
	{
		link: 'newbells.mp3',
		name: 'New bells'
	},
	{
		link: 'nozo.mp3',
		name: 'Nozo'
	},
	{
		link: 'taxidriver.mp3',
		name: 'Taxi driver'
	},
	{
		link: 'whatmoredoyouwant.mp3',
		name: 'What more do you want'
	}
];

const Wrapper = styled.div`
	padding: 20px;
	margin-bottom: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	max-width: 1080px;
	background: #f7f7f7;
`;

const InnerHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 20px;
`;

const SongBox = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px;
`;

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			tracks: tracks
		};
	}

	showControls(i) {
		var newTracks = this.state.tracks;
		newTracks[i].visible = true;
		this.setState({ tracks: newTracks });
	}

	showControlsFor(i) {
		return !!this.state.tracks[i].visible;
	}

	render() {
		return (
			<div>
				<InnerHeader>
					<p>Welcome back</p>
				</InnerHeader>
				<Wrapper className="outside-video-area">
					{tracks.map((obj, i) => {
						return (
							<SongBox key={obj.link}>
								<p onClick={() => this.showControls(i)}>{obj.name}</p>
								{this.showControlsFor(i) && (
									<audio controls>
										<source
											src={`https://beatoftheday.s3-us-west-1.amazonaws.com/${obj.link}`}
											type="audio/mp3"
										/>
									</audio>
								)}
							</SongBox>
						);
					})}
				</Wrapper>
			</div>
		);
	}
}

export default Home;
