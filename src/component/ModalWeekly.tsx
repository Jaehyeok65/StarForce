import React from 'react';
import Modal from './Modal';
import styled from 'styled-components';

const Bold = styled.span`
    font-weight: bold;
`;

const DivBtn = styled.div`
    border: 1px solid gray;
    border-radius: 12px;
    padding: 6px;
    cursor: pointer;
    margin-right: 6px;
    font-size: 12px;
    max-width: 200px;
    text-align: center;
`;

const Head = styled.div`
    display : flex;
    justify-content : center;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    margin: 10% 5% 7% 5%;

    > div {
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 767px) {
        margin: 7% 2% 7% 2%;
    }
`;

interface ModalWeeklyProps {
    toggle : boolean;
    weeklymeso : Week;
    setToggle : React.Dispatch<React.SetStateAction<boolean>>;
    formatting : (param : number) => string;
}

interface Week {
    property: number;
    boss: number;
};

const ModalWeekly : React.FC<ModalWeeklyProps> = ({toggle, weeklymeso, setToggle, formatting}) => {


    return(
        <Modal toggle={toggle}>
                <div>
                    <Content>
                        <Head>
                            금주의 재획 수익은 &nbsp;
                            <Bold>
                                {weeklymeso && formatting(weeklymeso.property)}
                            </Bold>
                            &nbsp;메소이며&nbsp;
                        </Head>
                    </Content>
                    <Content>
                        <Head>
                            금주의 보스 수익은 &nbsp;
                            <Bold>
                                {weeklymeso && formatting(weeklymeso.boss)}
                            </Bold>
                            &nbsp;메소이고&nbsp;
                        </Head>
                    </Content>
                    <Content>
                        <Head>
                            금주의 총 수익은 &nbsp;
                            <Bold>
                                {weeklymeso &&
                                    formatting(
                                        weeklymeso.property + weeklymeso.boss
                                    )}
                            </Bold>
                            &nbsp;메소입니다.&nbsp;
                        </Head>
                    </Content>
                    <Content>
                        <DivBtn
                            onClick={() => setToggle((prev) => !prev)}
                        >
                            닫기
                        </DivBtn>
                    </Content>
                </div>
            </Modal>
    )
}

export default React.memo(ModalWeekly);