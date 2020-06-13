import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1080px;
  background: #f7f7f7;
`;

class TrackShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.showTrack({
      link: this.props.track.link,
      name: this.props.track.name,
      type: this.props.track.type,
    });
  }

  render() {
    return (
      <Wrapper>
        {this.props.track.name}
      </Wrapper>
    );
  }
}

export default TrackShow;
