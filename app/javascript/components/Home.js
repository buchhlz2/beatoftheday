import React from "react";
import styled from "styled-components";
import Player from "./Player";
import AddATrack from "./AddATrack";
import HomePage from "./HomePage";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyPlaying: {}
    }

    this.enableTrack = this.enableTrack.bind(this);
  }

  enableTrack(newTrack) {
    this.setState({
      currentlyPlaying: {
        name: newTrack.name,
        link: newTrack.link,
        type: newTrack.type,
      },
    });
  }

  render() {
    return (
      <div className="inner-wrapper">
        <Router>
          <Switch>
            <Route path="/">
              <HomePage enableTrack={this.enableTrack} />
            </Route>
            <Route path="/add-a-track">
              <AddATrack />
            </Route>
          </Switch>
        </Router>

        <div className="footer">
          {this.state.currentlyPlaying.name &&
            <Player
              name={this.state.currentlyPlaying.name}
              link={this.state.currentlyPlaying.link}
              type={this.state.currentlyPlaying.type}
            />
          }
        </div>
      </div>
    );
  }
}

export default Home;
