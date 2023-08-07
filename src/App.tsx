import Header from 'component/Header';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from 'router/Main';
import SolErda from 'router/SolErda';
import StarForce from 'router/StarForce';
import styled from 'styled-components';

const Background = styled.div`
    width: 60%;
    margin: 0 auto;
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
            <Router>
                <Header />
                <Background>
                    <Back>
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/starforce" element={<StarForce />} />
                            <Route path="/solerda" element={<SolErda />} />
                        </Routes>
                    </Back>
                </Background>
            </Router>
        </React.Fragment>
    );
}

export default App;
