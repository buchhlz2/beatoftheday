import React from 'react';
import styled from 'styled-components';
import Sampler from './Sampler';
import $ from 'jquery';

const Wrapper = styled.div`
	margin-top: 50px;
	padding: 20px;
	display: flex;
	flex-wrap: wrap;
	max-width: 1080px;
	background: #f7f7f7;
`;

class Home extends React.Component {
	render() {
		return <Wrapper className="outside-video-area">Hiii</Wrapper>;
	}
}

export default Home;
