import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import $ from "jquery";
import SongBox from "./shared/SongBox";
import moment from "moment";

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1080px;
`;

const InfoBox = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
`;

const H2 = styled(Link)`
  margin-top: 0px;
  font-size: 24px;
  text-decoration: none !important;
  color: #5e6469 !important;
  display: block;

  &:visited {
    color: #5e6469 !important;
  }
`;

const ArtistName = styled(Link)`
  margin-top: 20px;
  text-decoration: none !important;
  color: #5e6469 !important;
  display: block;

  &:visited {
    color: #5e6469 !important;
  }
`;

const CreatedAt = styled.p`
  position: absolute;
  bottom: 0;
  margin-bottom: 0;
`;

var track = {};

const StyledSongBox = styled(SongBox)``;

class TrackShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $.get(`/tracks/show_track/${this.props.match.params.id}`).done((res) => {
      if (masterAudioTag.paused) window.masterShowTrack(res);
      track = res;
      this.forceUpdate();
    });
  }

  render() {
    return track.name ? (
      <Wrapper>
        <StyledSongBox
          width={280}
          height={280}
          trackInfo={track}
          enableTrack={() => {
            window.masterShowTrack(track, true);
          }}
        />
        <InfoBox>
          <H2 to={`/tracks/${track.id}`}>{track.name}</H2>
          <ArtistName to={`/artist/${track.artist_name}`}>
            {track.artist_name}
          </ArtistName>
          <CreatedAt>
            Created {moment(track.created_at).from(new Date())}
          </CreatedAt>
        </InfoBox>
      </Wrapper>
    ) : (
      <div />
    );
  }
}

export default TrackShow;
