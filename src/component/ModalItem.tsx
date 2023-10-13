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
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding-left: 10%;
    padding-right: 20%;
    font-weight: bold;
    font-size: 12px;
    padding-bottom: 5%;
    place-items: center;
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

const Nav = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    place-items: center;
    padding-top: 2%;
    padding-bottom: 2%;
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
    cursor: pointer;
`;

type Item = {
    name: string;
    price: number;
    date: string;
    buy: boolean;
};

interface ModalStorageProps {
    toggle: boolean;
    itemarray: Array<Item>;
    buy: boolean;
    onCancle: () => void;
    formatting: (param: number) => string;
    onItemBuyMeso: () => number;
    onItemSellMeso: () => number;
    onBuyClick: () => void;
    onSellClick: () => void;
}

const ModalItem: React.FC<ModalStorageProps> = ({
    toggle,
    onCancle,
    formatting,
    itemarray,
    onItemBuyMeso,
    onItemSellMeso,
    buy,
    onBuyClick,
    onSellClick,
}) => {
    return (
        <Modal toggle={toggle}>
            <Head>아이템 {buy ? '구매 ' : '판매 '}내역</Head>
            <Nav>
                <StarBtn onClick={onBuyClick}>구매</StarBtn>
                <StarBtn onClick={onSellClick}>판매</StarBtn>
            </Nav>
            <Block>
                <TodoItemBlock>
                    <Text>
                        <div>이름</div>
                        <div>가격</div>
                        <div>{buy ? '구매 ' : '판매 '}날짜</div>
                    </Text>
                </TodoItemBlock>
                {itemarray &&
                    itemarray
                        .sort((a, b) => {
                            const dateA = new Date(a.date);
                            const dateB = new Date(b.date);

                            if (dateA > dateB) return 1;
                            if (dateA < dateB) return -1;
                            return 0;
                        })
                        .map((item, index) => {
                            if (item.buy === buy) {
                                return (
                                    <TodoItemBlock key={index}>
                                        <Text>
                                            <div>{item.name && item.name}</div>
                                            <div>
                                                {item.price &&
                                                    formatting(item.price)}
                                            </div>
                                            <div>{item.date && item.date}</div>
                                        </Text>
                                    </TodoItemBlock>
                                );
                            } else {
                                return null; // 판매 아이템을 숨기기 위해 null 반환
                            }
                        })}
            </Block>
            <Footer>
                <div>총 {buy ? '구매 ' : '판매 '} 메소 : </div>
                <div>
                    {buy
                        ? formatting(onItemBuyMeso())
                        : formatting(onItemSellMeso())}
                    &nbsp;메소
                </div>
            </Footer>
            <End>
                {' '}
                <StarBtn onClick={onCancle}>닫기</StarBtn>
            </End>
        </Modal>
    );
};

export default React.memo(ModalItem);
