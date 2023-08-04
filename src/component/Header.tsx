import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';

const HeaderBar = styled.div`
    position: sticky;
    width: 100%;
    height: 5vh;
    background-color: orange;
    top: 0;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: center;
    font-size : 18px;
`;

const Header = () => {
    const location = useLocation();
    const [subject, setSubject] = useState<String>('MapleStory');

    const RenewalSubject = (sub: String): String => {
        if (sub === '/starforce') {
            return '스타포스 시뮬레이터';
        } else if (sub === '/solerda') {
            return '헥사 스탯 시뮬레이터';
        } else {
            return 'MapleStory';
        }
    };

    useEffect(() => {
        setSubject(RenewalSubject(location.pathname));
    }, [location]);

    return (
        <HeaderBar>
            <HeaderContent>{subject}</HeaderContent>
        </HeaderBar>
    );
};

export default React.memo(Header);
