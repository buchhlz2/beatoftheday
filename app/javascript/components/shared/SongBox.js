import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
import ReactTooltip from "react-tooltip";

const SongBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px;
  position: relative;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: 0 8px 6px -6px black;
  transform: scale(1, 1);
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05, 1.05);
  }
`;

const SongImg = styled.img`
  height: 120px;
  width: 180px;
  transition: width 1.2s ease;
`;

const BottomLeft = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
`;

const NumLikes = styled.p`
  margin-left: 5px;
  margin-bottom: 0;
`;

const NumBakes = styled.p`
  margin-left: 5px;
  margin-bottom: 0;
`;

const LikeButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  margin-left: 5px;
  background: black;
  opacity: 0.5;
  color: white;
  margin-bottom: 5px;
  transform: scale(1, 1);
  transition: transform 0.2s linear;
  transition: background-color 0.2s linear;
  transition: color 0.2s linear;
  display: flex;

  &:hover {
    color: #e0e0e0;
    background: #666;
    transform: scale(1.05, 1.05);
  }

  &:active {
    color: #ffffff;
    background: ##9e9e9e;
    transform: scale(0.95, 0.95);
  }
`;

const BakedButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  margin-left: 5px;
  background: black;
  opacity: 0.5;
  color: white;
  margin-bottom: 5px;
  transform: scale(1, 1);
  transition: transform 0.2s linear;
  transition: background-color 0.2s linear;
  transition: color 0.2s linear;
  display: flex;

  &:hover {
    color: #e0e0e0;
    background: #666;
    transform: scale(1.05, 1.05);
  }

  &:active {
    color: #ffffff;
    background: ##9e9e9e;
    transform: scale(0.95, 0.95);
  }
`;

const NameText = styled(Link)`
  display: block;
  background: black;
  opacity: 0.5;
  color: white !important;
  margin-bottom: 5px;
  width: fit-content;
  text-decoration: none !important;

  &:visited {
    color: white !important;
  }
`;

const SongName = styled.div`
  cursor: pointer;
  font-size: 14px;
  padding: 5px;
  margin-right: 5px;
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none !important;
  color: white !important;

  &:visited {
    color: white !important;
  }
`;

const PlayButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  padding: 10px;
  margin-right: 5px;
  position: absolute;
  bottom: 0;
  right: 0;
  background: black;
  opacity: 0.5;
  color: white;
  margin-bottom: 5px;
  transform: scale(1, 1);
  transition: transform 0.2s linear;
  transition: background-color 0.2s linear;
  transition: color 0.2s linear;

  &:hover {
    color: #e0e0e0;
    background: #666;
    transform: scale(1.05, 1.05);
  }

  &:active {
    color: #ffffff;
    background: ##9e9e9e;
    transform: scale(0.95, 0.95);
  }
`;

class SongBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      elName: Math.random().toString(36).substring(10),
      numLikes: props.trackInfo.num_likes,
      numBakes: props.trackInfo.num_bakes,
    };
  }

  componentDidMount() {
    if (!this.props.width || !this.props.height) {
      const nameEl = $(`#name-${this.state.elName}`);
      const elWidth = $(nameEl).width();
      const goodWidth =
        elWidth < 290 ? elWidth + elWidth * Math.random() * 1.9 : elWidth;
      const width = goodWidth < 160 ? 160 : goodWidth > 290 ? 290 : goodWidth;
      const img = $(`.name-${this.state.elName}`);
      img.width(width);
    }
  }

  likeTrack = () => {
    this.setState({
      numLikes: this.state.numLikes + 1,
    });
    $.ajax({
      type: "POST",
      url: "/likes",
      data: { track_id: this.props.trackInfo.id },
    });
  };

  bakeTrack = () => {
    this.setState({
      numBakes: this.state.numBakes + 1,
    });
    $.ajax({
      type: "POST",
      url: "/likes",
      data: { track_id: this.props.trackInfo.id, baked: true },
    });
  };

  render() {
    return (
      <SongBoxWrapper>
        <SongName>
          <NameText
            id={`name-${this.state.elName}`}
            to={`/tracks/${this.props.trackInfo.id}`}
          >
            {this.props.trackInfo.name}
          </NameText>
          <NameText to={`/artist/${this.props.trackInfo.artist_name}`}>
            {this.props.trackInfo.artist_name}
          </NameText>
        </SongName>
        <BottomLeft>
          <LikeButton onClick={this.likeTrack}>
            ♡
            <NumLikes data-tip="Like this track">
              {this.state.numLikes}
            </NumLikes>
          </LikeButton>
          <BakedButton onClick={this.likeTrack}>
            🧁
            <NumBakes data-tip="Mark this track as baked">
              {this.state.numBakes}
            </NumBakes>
          </BakedButton>
        </BottomLeft>
        <PlayButton onClick={this.props.enableTrack}>▶</PlayButton>
        <SongImg
          className={`name-${this.state.elName}`}
          src={this.props.trackInfo.photo}
          style={
            this.props.width && this.props.height
              ? { height: this.props.height, width: this.props.width }
              : {}
          }
        />
        <ReactTooltip />
      </SongBoxWrapper>
    );
  }
}

export default SongBox;
