import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background: purple;
  height: 100%;
`;

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Wrapper>Yo</Wrapper>;
  }
}

export default CommentBox;
