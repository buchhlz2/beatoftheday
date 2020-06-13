import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #7d7d7d;
  padding: 0 25px;
`;
const Name = styled.div`
  flex-grow: 1;
  color: white;
`;

const Audio = styled.audio`
  flex-grow: 3;
  outline: none;
`;

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Wrapper>
        <Name>📻 {this.props.name}</Name>
        <Audio controls key={this.props.link}>
          <source
            src={this.props.link}
          />
        </Audio>
      </Wrapper>
    );
  }
}

export default Player;
