import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const Content = styled.div`
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

const Head = styled.div`
    display: flex;
    justify-content: center;
    font-size: 12px;
    margin-top: 5%;
`;

const DivBtn = styled.div`
    border: 1px solid gray;
    border-radius: 12px;
    padding: 6px;
    cursor: pointer;
    margin-right: 6px;
    font-size: 12px;
    max-width: 100px;
    text-align: center;
`;

const Color = styled.div<{ $plus: string }>`
    color: ${(props) => (props.$plus === 'true' ? 'red' : 'blue')};
`;

interface ModalCompareProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    diff: number;
    date: Date | null;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    formatting: (param: number) => string;
}

const ModalCompare: React.FC<ModalCompareProps> = ({
    toggle,
    setToggle,
    date,
    onDateChange,
    diff,
    formatting,
}) => {

    console.log(diff);
    return (
        <Modal toggle={toggle}>
            <Content>
                <Head>비교할 날짜를 선택해주세요.</Head>
                <Head>
                    <input type="date" onChange={onDateChange} />
                </Head>
                {date && (
                    <Head>
                        {date.toLocaleDateString('ko-kr')}일
                        {diff > 0 ? (
                            <Color $plus="true">
                                &nbsp;대비 &nbsp;{formatting(Math.abs(diff))}&nbsp;메소가
                                증가했습니다.
                            </Color>
                        ) : diff === 0 ? (
                            <div>에는 저장된 데이터가 없습니다.</div>
                        ) : (
                            <Color $plus="false">
                                &nbsp;대비 &nbsp;{formatting(Math.abs(diff))}&nbsp;메소가
                                감소했습니다.
                            </Color>
                        )}
                    </Head>
                )}
                <Head>
                    <DivBtn onClick={() => setToggle((prev) => !prev)}>
                        닫기
                    </DivBtn>
                </Head>
            </Content>
        </Modal>
    );
};

export default React.memo(ModalCompare);
