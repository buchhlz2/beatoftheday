import React from "react";
import styled from "styled-components";
import Player from "./shared/Player";
import AddATrack from "./routes/AddATrack";
import TrackShow from "./routes/TrackShow";
import ArtistShow from "./routes/ArtistShow";
import Baked from "./routes/Baked";
import Artists from "./routes/Artists";
import HomePage from "./routes/HomePage";
import AboutUs from "./routes/AboutUs";
import $ from "jquery";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import {
  faBars
} from "@fortawesome/free-solid-svg-icons";

const HomeLinks = styled.div`
  position: fixed;
  top: 16px;
  left: 22px;
  display: block;
  z-index: 100;

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
  font-size: 20px;
  color: #656565;
  cursor: pointer;
  display: none;
  position: fixed;
  top: 0px;
  height: 50px;
  align-items: center;
  left: 19px;
  z-index: 100;

  @media all and (max-width: 600px) {
    display: flex;
  }
`;

class Home extends React.Component {
  constructor(props) {
    super(props);
    window.OPTIONS = this.props || {};
    this.state = {
      menuVisible: window.innerWidth <= 600 ? false : true,
      redirectToAboutUs: false,
    };

    $(".about-us-link").on("click", (e) => {
      $("#about-us-route-link").get(0).click();
      return false;
    });
  }

  render() {
    return (
      <div className="inner-wrapper">
        <Router>
          <MenuX
            onClick={() => {
              this.setState({ menuVisible: !this.state.menuVisible });
            }}
          >
            {this.state.menuVisible ? "✖️" : <FontAwesomeIcon icon={faBars} /> }
          </MenuX>
          <HomeLinks
            style={{ display: this.state.menuVisible ? "flex" : "none" }}
          >
            <NavLink to="/">🎵 Fresh</NavLink>
            <NavLink to="/baked">🧁 Baked</NavLink>
            <NavLink to="/artists">🧞 Artists</NavLink>
            <NavLink
              to="/about-us"
              id="about-us-route-link"
              style={{ position: "relative", left: "999999px" }}
            />
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
            <Route path="/about-us" component={AboutUs} />
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
