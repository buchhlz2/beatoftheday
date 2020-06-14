import React from 'react';
import styled from 'styled-components';
import Player from './Player';
import AddATrack from './AddATrack';
import TrackShow from './TrackShow';
import ArtistShow from './ArtistShow';
import HomePage from './HomePage';
import $ from 'jquery';

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';

const HomeLink = styled(Link)`
	position: absolute;
	top: 16px;
	left: 22px;
`;

class Home extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log(location.pathname);
		return (
			<div className="inner-wrapper">
				<Router>
					<HomeLink to="/">🎵 Beat of the day</HomeLink>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/tracks/:id" component={TrackShow} />
						<Route path="/add-a-track">
							<AddATrack />
						</Route>
						<Route path="/tracks/:id" component={TrackShow} />
						<Route path="/artist/:id" component={ArtistShow} />
					</Switch>
					<div className="footer">
						<Player />
					</div>
				</Router>
			</div>
		);
	}
}

export default Home;
