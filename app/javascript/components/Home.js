import React from "react";
import styled from "styled-components";
import Player from "./Player";
import AddATrack from "./AddATrack";
import TrackShow from "./TrackShow";
import HomePage from "./HomePage";
import $ from "jquery";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyPlaying: {},
      tracks: [],
    };
  }

  componentDidMount() {
    if (location.pathname == "/") {
      $.get("/tracks").done((res) => {
        console.log(res);
        this.setState(
          {
            tracks: res.tracks,
          },
          () => {
            this.enableTrack(0);
          }
        );
      });
    }
  }

  enableTrack = (i) => {
    const newTrack = this.state.tracks[i];
    this.showTrack(newTrack);
  }

  showTrack = (newTrack) => {
    this.setState({
      currentlyPlaying: {
        name: newTrack.name,
        link: newTrack.link,
        type: newTrack.type,
      },
    });
  }

  render() {
    console.log(location.pathname);
    return (
      <div className="inner-wrapper">
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage
                tracks={this.state.tracks}
                enableTrack={this.enableTrack}
              />
            </Route>
            <Route path="/add-a-track">
              <AddATrack />
            </Route>
            <Route path="/tracks/:id">
              <TrackShow showTrack={this.showTrack} {...this.props} />
            </Route>
          </Switch>
        </Router>

        <div className="footer">
          {this.state.currentlyPlaying.name && (
            <Player
              name={this.state.currentlyPlaying.name}
              link={this.state.currentlyPlaying.link}
              type={this.state.currentlyPlaying.type}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Home;
