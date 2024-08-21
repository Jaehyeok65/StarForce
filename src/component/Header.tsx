import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

const HeaderBar = styled.div`
    position: sticky;
    width: 100%;
    height: 5vh;
    background-color: orange;
    top: 0;
    z-index: 999;
`;

const HeaderContent = styled.div`
    display: flex;
    justify-content: center;
    font-size: 18px;
`;

const StyledLink = styled(Link)`
    color: inherit;
    text-decoration: none;
`;

const Header = () => {
    const location = useLocation();
    const [subject, setSubject] = useState<String>('MapleStory');

    const RenewalSubject = (sub: String): String => {
        if (sub === '/starforce') {
            return '스타포스 강화';
        } else if (sub === '/solerda') {
            return '헥사 스탯 시뮬레이터';
        } else if (sub === '/simulate') {
            return '스타포스 시뮬레이터';
        } else if (sub === '/meso') {
            return '메소 수급 기록';
        } else if (sub.startsWith('/info')) {
            return '캐릭터 정보 조회';
        } else if (sub === '/boss') {
            return '주간 보스 기록';
        } else {
            return 'MapleStory';
        }
    };

    useEffect(() => {
        setSubject(RenewalSubject(location.pathname));
    }, [location]);

    return (
        <HeaderBar>
            <HeaderContent>
                <StyledLink to={'/'}>{subject}</StyledLink>
            </HeaderContent>
        </HeaderBar>
    );
};

export default React.memo(Header);
