import React from 'react';
import styled from 'styled-components';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';

const DivBtn = styled.div`
    border: 1px solid gray;
    border-radius: 12px;
    padding: 6px;
    cursor: pointer;
    margin-right: 6px;
`;

const Button = styled.button<{ width: string }>`
    font-size: 12px;
    border: none;
    background-color: white;
    width: ${(props) => props.width};
    height: 10px;
    backgroud-color: white;
`;

const ButtonWrapper = styled.div`
    display: grid;
    grid-templates-columns: 1fr;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    margin: 7% 5% 7% 5%;

    > div {
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 767px) {
        margin: 7% 2% 7% 2%;
    }
`;

interface MesoViewProps {
    src: string;
    num: number;
    name: string;
    total: number;
    setNum: React.Dispatch<React.SetStateAction<number>>;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    setTotalToggle: React.Dispatch<React.SetStateAction<boolean>>;
    onPlusClick: (
        setNum: React.Dispatch<React.SetStateAction<number>>,
        setToggle: React.Dispatch<React.SetStateAction<boolean>>,
        onPlus: (prev: number) => number,
        num: number
    ) => void;
    onMinusClick: (
        setNum: React.Dispatch<React.SetStateAction<number>>,
        setToggle: React.Dispatch<React.SetStateAction<boolean>>,
        onMinus: (prev: number) => number,
        num: number
    ) => void;
    formatting: (param: number) => string;
    onPlus : (prev : number) => number;
    onMinus : (prev : number) => number;
}

const MesoView: React.FC<MesoViewProps> = ({
    src,
    num,
    name,
    total,
    setToggle,
    setTotalToggle,
    onPlusClick,
    onMinusClick,
    formatting,
    setNum,
    onPlus,
    onMinus
}) => {
    return (
        <>
            <Content>
                <div>
                    <img src={src} width="30px" alt="이미지" />
                    &nbsp; {name} &nbsp; x {num}{' '}
                    <ButtonWrapper>
                        <Button width="25px" onClick={() => onPlusClick(setNum, setToggle, onPlus, num)}>
                            <FaAngleUp />
                        </Button>
                        <Button width="25px" onClick={() => onMinusClick(setNum, setToggle, onMinus, num)}>
                            <FaAngleDown />
                        </Button>
                    </ButtonWrapper>
                    <DivBtn onClick={() => setToggle((prev) => !prev)}>
                        수정
                    </DivBtn>
                    <DivBtn onClick={() => setTotalToggle((prev) => !prev)}>
                        일괄입력
                    </DivBtn>
                </div>
            </Content>
            <Content>
                <div>수입 : {formatting(total)}&nbsp;메소</div>
            </Content>
        </>
    );
};

export default React.memo(MesoView);
