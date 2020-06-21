// https://blog.viktorbezic.com/post/154553724265/special-wrongness

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 200px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
`;

const InnerHeader = styled.div`
	width: 100%;
	margin-top: 50px;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24px;
	color: #61646d;
`;

const SmallerHeader = styled.div`
	margin-top: 30px;
	line-height: 22px;
	font-size: 16px;
	width: 70%;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
`;

class TrackShow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<FlexContainer>
				<InnerHeader>🎵 About us:</InnerHeader>

				<SmallerHeader>
					I built beat of the day because of coronavirus. I used to go over to my friends houses to play
					music... alas, no more. The intention of the site is to be a place of free-form creativity. Where
					anyone who is just starting out, or expiramenting can post their music and allow others to play and
					expirament with it also.
				</SmallerHeader>
				<SmallerHeader>
					Anything you upload to this site will be made available publicly and for other users on the site to
					modify. Please be responsible in not uploading copyrighted media.
				</SmallerHeader>
				<SmallerHeader>
					The "Fresh" tab shows music that has been uploaded most recently. The "Baked" tab is inteded to
					express completeness, as in, it's not "half-baked". Users of the site can click the baked button on
					any track to vote on wheather or not they believe the track to be "baked", or "done". The "Artists"
					tab simply lists all the artists (users who have uploaded tracks) on the site. Each artist page
					contains all of the tracks they have uploaded to the site.
				</SmallerHeader>
				<SmallerHeader>
					A "Rebound" is an artistic reaction to a track, in the form of another track. Any track on beat of
					the day can be rebounded. There are no rules to rebounds, but the intendid goal was to have
					different people from around the world be able to layer different instruments on top of each other.
					So for example, I can upload a drum track, Lisa in France can rebound and add some bass, then Zach
					can add guitar, Adam can sing on top of it, and then we can all vote on which version is baked.
					Another way to think about it is a "re-mix".
				</SmallerHeader>
				<SmallerHeader>
					In the unlikely event that someone actually makes money from music that was created on this site, I
					will do my damndest to make sure the people involved get paid fairly for their creations. For now
					the system is as follows: I have a record of all the different chains of rebounds on the site. For
					any track that makes money, the proceeds will be split equally among everyone upstream of the
					published track. Since there are no rules to rebounds, this means the published track may sound
					nothing like the original, but the original artist will get paid in this unlikely event. This means
					it is up to you as the artist to choose wheather your work is original or a rebound. My lawyer is
					working on a better version of this paragraph.
				</SmallerHeader>
				<SmallerHeader>
					There is a fun element of surprise here, someone may think they have uploaded a boring, lame track,
					but it could easily get picked up by someone else who does something very interesting with it. Feel
					free to upload tracks such as "2 minutes of frying bacon", or "the sound of the wind at sunset". Who
					knows where it could take us.
				</SmallerHeader>
				<SmallerHeader>
					Each track has a comments section. Please be nice to each other, or don't. But you are responsible
					for what you say, whatever that means. I personally don't care what you say. This is nonesense...
					Use the comments sections to request other people to add certain instruments you'd like to see in
					your track. Use it to express the vibe of your track. Use it to give the BPM and key signiture of
					your track so its easier for other people to play along with. Laugh at things.
				</SmallerHeader>
				<Wrapper />
			</FlexContainer>
		);
	}
}

export default TrackShow;
