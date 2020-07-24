import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import $ from 'jquery';

const FlexContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	overflow: hidden;
	padding-top: 20px;
`;

const Wrapper = styled.div`
	padding: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 200px;
	max-width: ${window.B_R_E_A_K_P_O_I_N_T}px;
	overflow: hidden;
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
	width: 90%;
	max-width: 95vw;
`;

class TrackShow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<FlexContainer>
				<SmallerHeader>
					Beat of the Day is a community for musicians. Have you ever wanted to jam with people all around the
					world in different places? Simply upload any track you're working on, and anyone else on the site
					can download your track and create a remix of it: a new track based on the original with additional
					layers, say a new drum part, or singing on top. Full creative freedom is encouraged. Anything you
					upload to this site is available for others to modify.
				</SmallerHeader>
				<SmallerHeader>
					I built Beat of the Day because of quarantine. I used to go over to my friends houses to play
					music... alas, no more. The intention of the site is to be a place of free-form creativity. Where
					anyone who is just starting out, or experimenting can post their music and allow others to play and
					experiment with it also.
				</SmallerHeader>
				<SmallerHeader>
					Anything you upload to this site will be made available publicly and for other users on the site to
					modify. Please be responsible in not uploading copyrighted media.
				</SmallerHeader>
				<SmallerHeader>
					The "Fresh" tab shows music that has been uploaded most recently. The "Baked" tab is inteded to
					express completeness, as in, it's not half-baked. Users of the site can click the "baked" button on
					any track to vote on wheather or not they believe the track to be "baked", or done. It's essentialy
					an upvote button for a track to make it to the "Baked" tab. The "Artists" tab simply lists all the
					artists (users who have uploaded tracks) on the site. Each artist page contains all of the tracks
					they have uploaded to the site.
				</SmallerHeader>
				<SmallerHeader>
					"Baked" tracks are ranked based on a combination of how new they are, and how many 'bakes' they
					have. The forumla is (100 hours - how old the track is in hours) * number of 'bakes'.{' '}
				</SmallerHeader>
				<SmallerHeader>
					A remix can be any artistic reaction to a track, in the form of another track. Any track on Beat of
					the Day can be remixed. There are no rules to remixes, but the intendid goal was to have different
					people from around the world be able to layer different instruments on top of each other. So for
					example, I can upload a drum track, Lisa in France can remix and add some bass, then Zach can add
					guitar, Adam can sing on top of it, and then we can all vote on which version is "baked". Another
					way to think about it is a re-mix.
				</SmallerHeader>
				<SmallerHeader>
					There is a fun element of surprise here, someone may think they have uploaded a boring, lame track,
					but it could easily get picked up by someone else who does something very interesting with it. Feel
					free to upload tracks such as "2 minutes of frying bacon", or "the sound of the wind at sunset". Who
					knows where it could take us.
				</SmallerHeader>
				<SmallerHeader>
					Each track has a comments section. You can use it to request other people to add certain instruments
					you'd like to see in your track. Use it to express the vibe of your track. Use it to give the BPM
					and key signiture of your track so its easier for other people to play along with.
				</SmallerHeader>
				<SmallerHeader>
					In the unlikely event that someone actually makes money from music that was created on this site, I
					will do my damndest to make sure the people involved get paid fairly for their creations. For now
					the system is as follows: I have a record of all the different chains of remixes on the site. For
					any track that makes money, the proceeds will be split equally among everyone upstream of the
					published track. Since there are no rules to remixes, this means the published track may sound
					nothing like the original, but the original artist will get paid in this unlikely event. This means
					it is up to you as the artist to choose wheather your work is original or a remix. Anyone may also
					record a more polished, releasable version of any track at any time and give credit to the original
					artists. My lawyer is working on a better version of this paragraph.
				</SmallerHeader>
				<SmallerHeader>Hope you have a good time, thanks for contributing.</SmallerHeader>
				<SmallerHeader />
				<SmallerHeader />
				<SmallerHeader />
				<SmallerHeader />
				<SmallerHeader />
				<SmallerHeader />
				<SmallerHeader>I've found this article inspiring:</SmallerHeader>
				<SmallerHeader>
					<a href="https://blog.viktorbezic.com/post/154553724265/special-wrongness">
						https://blog.viktorbezic.com/post/154553724265/special-wrongness
					</a>
				</SmallerHeader>
				<Wrapper />
			</FlexContainer>
		);
	}
}

export default TrackShow;
