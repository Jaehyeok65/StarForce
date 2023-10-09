import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: 20% 60%;
    gap: 40px;
    row-gap: 30px;
    margin: 10% 20% 10% 20%;

    > div {
        font-size: 14px;
        display: flex;
        align-items: center;
    }
`;

const ModalHead = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
`;

const Button = styled.button<{ width: string }>`
    font-size: 12px;
    border: none;
    background-color: white;
    width: ${(props) => props.width};
    height: 10px;
    backgroud-color: white;
`;

const Input = styled.input`
    width: 100px;
    border-radius: 12px;
    border: 1px solid gray;
`;

const Hide = styled.div`
    opacity: 0;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
`;

type Item = {
    name: string;
    price: number;
    date: string;
};

interface ModalAddItemProps {
    toggle: boolean;
    item: Item;
    onCancle: () => void;
    formatting: (param: number) => string;
    onStore: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalAddItem: React.FC<ModalAddItemProps> = ({
    item,
    toggle,
    onCancle,
    formatting,
    onStore,
    onChange,
}) => {
    return (
        <Modal toggle={toggle}>
            <ModalHead>구매한 아이템의 이름과 가격을 입력해주세요.</ModalHead>
            <ModalContent>
                <div>이름 : &nbsp;&nbsp;</div>
                <div>
                    <Input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={onChange}
                    />
                </div>
                <div>가격 : &nbsp;&nbsp;</div>
                <div>
                    <Input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={onChange}
                    />
                </div>
                <Hide>숨김</Hide>
                <div>{item.price > 0 && formatting(item.price)}</div>
            </ModalContent>
            <Head>
                <Button width="100px" onClick={onStore}>
                    저장하기
                </Button>
                <Button width="100px" onClick={onCancle}>
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalAddItem);
