import Header from 'component/Header';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from 'router/Main';
import Meso from 'router/Meso';
import SolErda from 'router/SolErda';
import StarForce from 'router/StarForce';
import styled from 'styled-components';

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

function App() {
    return (
        <React.Fragment>
            <Router basename={process.env.PUBLIC_URL}>
                <Header />
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/starforce" element={<StarForce />} />
                            <Route path="/solerda" element={<SolErda />} />
                            <Route path="/meso" element={<Meso />} />
                        </Routes>
            </Router>
        </React.Fragment>
    );
}

export default App;
