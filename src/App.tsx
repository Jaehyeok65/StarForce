import Header from 'component/Header';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from 'router/Main';
import Meso from 'router/Meso';
import SolErda from 'router/SolErda';
import StarForce from 'router/StarForce';

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
