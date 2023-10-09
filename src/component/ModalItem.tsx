import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding-top: 7px;
    padding-bottom: 7px;
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
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding-left: 10%;
    padding-right: 10%;
    font-weight: bold;
    font-size: 12px;
    padding-bottom: 20px;
    text-align: center;
`;

const Text = styled.div`
    flex: 1;
    display: grid;
    grid-template-columns: 30% 30% 30%;
    gap: 10px;
    font-size: 12px;
    color: #495057;
    > div {
        text-align: center;
    }
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

type Item = {
    name: string;
    price: number;
    date: string;
};

interface ModalStorageProps {
    toggle: boolean;
    itemarray: Array<Item>;
    onCancle: () => void;
    formatting: (param: number) => string;
    onItemConsumeMeso: () => number;
}

const ModalItem: React.FC<ModalStorageProps> = ({
    toggle,
    onCancle,
    formatting,
    itemarray,
    onItemConsumeMeso,
}) => {
    return (
        <Modal toggle={toggle}>
            <Head>아이템 구매 내역</Head>
            <Block>
                <TodoItemBlock>
                    <Text>
                        <div>이름</div>
                        <div>가격</div>
                        <div>구매 날짜</div>
                    </Text>
                </TodoItemBlock>
                {itemarray.map((item, index) => (
                    <TodoItemBlock key={index}>
                        <Text>
                            <div>{item.name && item.name}</div>
                            <div>{item.price && formatting(item.price)}</div>
                            <div>{item.date && item.date}</div>
                        </Text>
                    </TodoItemBlock>
                ))}
            </Block>
            <Footer>
                <div>총 소비 메소 : </div>
                <div>{formatting(onItemConsumeMeso())}&nbsp;메소</div>
            </Footer>
            <End>
                {' '}
                <StarBtn onClick={onCancle}>닫기</StarBtn>
            </End>
        </Modal>
    );
};

export default React.memo(ModalItem);
