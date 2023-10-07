import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import Modal from './Modal';

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 30px;
    cursor: pointer;
    opacity: 0;
    &:hover {
        color: #ff6b6b;
    }
`;

const UPDATE = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 12px;
    cursor: pointer;
    opacity: 0;
    &:hover {
        color: #ff6b6b;
    }
`;

const TodoItemBlock = styled.div<{$consume : number}>`
    display: flex;
    align-items: center;
    padding-top: 7px;
    padding-bottom: 7px;
    &:hover {
        ${Remove} {
            opacity: 1;
        }
        ${(props) =>
            props.$consume > 0 &&
            css`
            ${UPDATE} {
                opacity: 1;
            }
            `}
    }
`;

const Head = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding-bottom: 4px;
    padding-top: 30px;
`;

const End = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10%;
    padding-top: 20px;
`;

const Footer = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns : repeat(2,1fr);
    gap : 20px;
    padding-left : 10%;
    padding-right : 10%;
    font-weight: bold;
    font-size : 12px;
    padding-bottom: 20px;
    text-align : center;
`;

const CheckCircle = styled.div<{ $done: boolean }>`
    width: 18px;
    height: 18px;
    border-radius: 16px;
    border: 1px solid #ced4da;
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    cursor: pointer;
    ${(props) =>
        props.$done &&
        css`
            border: 1px solid #38d9a9;
            color: #38d9a9;
        `}
`;

const Hide = styled.div`
    opacity: 0;
`;

const Text = styled.div<{ $done: boolean }>`
    flex: 1;
    display: grid;
    grid-template-columns: 35% 35% 30%;
    gap: 10px;
    font-size: 12px;
    color: #495057;
    > div {
        text-align: center;
    }
    ${(props) =>
        props.$done &&
        css`
            color: #495057;
        `}
`;

const Block = styled.div`
    flex: 1;
    padding: 20px 32px;
    padding-bottom: 48px;
    overflow-y: auto;
`;

const StarBtn = styled.button`
    font-size: 12px;
    border: 1px solid gray;
    border-radius: 8px;
    width: 70px;
    height: 20px;
    backgroud-color: white;
`;

type simul = {
    done: boolean;
    needmeso: number;
    name: string;
    consumemeso: number;
    key : number;
};

interface ModalSimulProps {
    toggle: boolean;
    simulstore: simul[];
    onClickSimulStoreToggle: () => void;
    formatting: (param: number) => string;
    onAddSimulateConsumeMeso: (num : number) => void;
    onDeleteSimulResult : (num : number) => void;
    onCheckSimulResult : (num : number) => void;
    onNeedMeso : () => number;
    onConsumeMeso : () => number;
};

const ModalSimul: React.FC<ModalSimulProps> = ({
    toggle,
    simulstore,
    onClickSimulStoreToggle,
    formatting,
    onAddSimulateConsumeMeso,
    onDeleteSimulResult,
    onCheckSimulResult,
    onNeedMeso,
    onConsumeMeso
}) => {
    return (
        <Modal toggle={toggle}>
            <Head>스타포스 기대값 저장 목록</Head>
            <Block>
                <TodoItemBlock $consume={0}>
                    <Hide>숨김</Hide>
                    <Text $done={false}>
                        <div>이름</div>
                        <div>필요 메소</div>
                        <div>소모 메소</div>
                    </Text>
                    <Hide>숨김</Hide>
                </TodoItemBlock>
                {simulstore.map((simul) => (
                    <TodoItemBlock key={simul.key} $consume={simul.consumemeso}>
                        <CheckCircle $done={simul.done} onClick={() => onCheckSimulResult(simul.key)}>
                            {simul.done && <MdDone />}
                        </CheckCircle>
                        <Text $done={simul.done}>
                            <div>{simul.name}</div>
                            <div>{simul.needmeso && formatting(simul.needmeso)}</div>
                            <div>
                                {simul.consumemeso ? (
                                    formatting(simul.consumemeso)
                                ) : (
                                    <StarBtn onClick={() => onAddSimulateConsumeMeso(simul.key)}>
                                        입력
                                    </StarBtn>
                                )}
                            </div>
                        </Text>
                        <UPDATE onClick={() => onAddSimulateConsumeMeso(simul.key)}>수정</UPDATE>
                        <Remove onClick={() => onDeleteSimulResult(simul.key)}>
                            <MdDelete />
                        </Remove>
                    </TodoItemBlock>
                ))}
            </Block>
            <Footer>
                <div>총 필요 메소</div>
                <div>{formatting(onNeedMeso())}&nbsp;메소</div>
                <div>총 소모 메소</div>
                <div>{formatting(onConsumeMeso())}&nbsp;메소</div>
            </Footer>
            <End> <StarBtn onClick={onClickSimulStoreToggle}>닫기</StarBtn></End>
        </Modal>
    );
};

export default React.memo(ModalSimul);
