import React from 'react';
import { Link } from 'react-router-dom';



const Main = () => {


    return(
        <>
        메인페이지
        <Link to={"/starforce"}>스타포스 시뮬레이터</Link>
        <Link to={"/solerda"}>헥사 스탯 시뮬레이터</Link>
        </>
    )
}


export default React.memo(Main);