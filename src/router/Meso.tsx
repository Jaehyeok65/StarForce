import Modal from 'component/Modal';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Head = styled.div`
    display: flex;
    justify-content: center;
`;

const Nav = styled.div`
    display: flex;
    justify-content: right;
    margin-top: 3%;
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
`;

const Background = styled.div`
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 767px) {
        width: 100%;
        margin: 0 auto;
    }
`;

const Back = styled.div`
    margin: 5% 5% 5% 5%;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 5% 5% 5% 5%;
`;

const Meso = () => {
    const [day, setDay] = useState<Date>(new Date());

    const getDayItem = (day: string) => {
        const tmp = window.localStorage.getItem(day);
        if (tmp) {
            //해당 날짜에 데이터가 있는 경우
            const value = JSON.parse(tmp);
        } else {
            //해당 날짜에 데이터가 없는 경우 빈데이터 출력
        }
    };

    const src1 =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_YvmRV52YvU3lkRTBEfPSpqzDpMB9BShWoA&usqp=CAU';

    useEffect(() => {
        //day가 바뀌면 그에 맞춰 로컬스토리지에서 해당 날짜 데이터를 가져옴
        getDayItem(day.toLocaleDateString('ko-KR'));
    }, [day]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDay(new Date(value));
    };

    return (
        <React.Fragment>
            <Background>
                <Back>
                    <Head>
                        {day.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Head>
                    <Nav>
                        <input type="date" onChange={onChange} />
                    </Nav>
                    <Head>
                        <Content>
                            <img src={src1} width="30px" alt="이미지" />
                            <div>하이</div>
                        </Content>
                    </Head>
                </Back>
            </Background>
            <Modal toggle={false}>하이</Modal>
        </React.Fragment>
    );
};

export default React.memo(Meso);
