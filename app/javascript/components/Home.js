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
	display: block;

	@media all and (max-width: 600px) {
		display: none;
		flex-direction: column;
		top: 50px;
		left: 0px;
		background: white;
	}
`;

const NavLink = styled(Link)`
	margin-right: 20px;
	
	@media all and (max-width: 600px) {
		margin-right: 0px;
		padding: 10px 20px 10px 20px;
	}
`;

const MenuX = styled.div`
	cursor: pointer;
	display: none;
	position: absolute;
	top: 18px;
	left: 22px;

	@media all and (max-width: 600px) {
		display: block;
	}
`;

class Home extends React.Component {
	constructor(props) {
		super(props);
		window.OPTIONS = this.props || {};
		this.state = {
			menuVisible: window.innerWidth <= 600 ? false : true
		};
	}

	render() {
		console.log(location.pathname);
		return (
			<div className="inner-wrapper">
				<Router>
					<MenuX
						onClick={() => {
							this.setState({ menuVisible: !this.state.menuVisible });
						}}
					>
						{this.state.menuVisible ? '✖️' : '🍔'}
					</MenuX>
					<HomeLinks style={{ display: this.state.menuVisible ? 'flex' : 'none' }}>
						<NavLink to="/">🎵 Fresh</NavLink>
						<NavLink to="/baked">🧁 Baked</NavLink>
						<NavLink to="/artists">🧞 Artists</NavLink>
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
