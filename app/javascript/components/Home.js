import React from 'react';
import styled from 'styled-components';
import Player from './shared/Player';
import AddATrack from './routes/AddATrack';
import TrackShow from './routes/TrackShow';
import ArtistShow from './routes/ArtistShow';
import Baked from './routes/Baked';
import Artists from './routes/Artists';
import HomePage from './routes/HomePage';
import $ from 'jquery';

import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';

const HomeLinks = styled.div`
	position: absolute;
	top: 16px;
	left: 22px;
`;

const NavLink = styled(Link)`
  margin-right: 20px;
`;

class Home extends React.Component {
	constructor(props) {
		super(props);
		window.OPTIONS = this.props || {};
	}

	render() {
		console.log(location.pathname);
		return (
			<div className="inner-wrapper">
				<Router>
					<HomeLinks>
						<NavLink to="/">🎵 Fresh</NavLink>
						<NavLink to="/baked">Baked</NavLink>
						<NavLink to="/artists">Artists</NavLink>
					</HomeLinks>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route path="/tracks/:id" component={TrackShow} />
						<Route path="/add-a-track">
							<AddATrack />
						</Route>
						<Route path="/tracks/:id" component={TrackShow} />
						<Route path="/artist/:id" component={ArtistShow} />
						<Route path="/baked" component={Baked} />
						<Route path="/artists" component={Artists} />
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
