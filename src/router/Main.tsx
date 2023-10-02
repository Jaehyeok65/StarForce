import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
    > li {
        margin-top : 3%;
    }
`;

const Background = styled.div`
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width : 767px) {
        width : 100%;
        margin : 0 auto;
    };
`;

const Back = styled.div`
    margin: 5% 5% 5% 5%;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 5% 5% 5% 5%;
`;


const Main = () => {


    return(
        <Background>
            <Back>
        <Ul>
            <li><Link to={"/starforce"}>스타포스 강화하기</Link></li>
            <li><Link to={"/simulate"}>스타포스 시뮬레이터</Link></li>
            <li><Link to={"/solerda"}>헥사 스탯 시뮬레이터</Link></li>
            <li><Link to={"/meso"}>메소 수급 기록</Link></li>
        </Ul>
        </Back>
        </Background>
    )
}


export default React.memo(Main);