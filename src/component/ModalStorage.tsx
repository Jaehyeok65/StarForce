import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: 10% 35% 55%;
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

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
`;

interface ModalStorageProps {
    src6: string;
    toggle: boolean;
    storagemeso: number;
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<number>>
    ) => void;
    setStorageMeso: React.Dispatch<React.SetStateAction<number>>;
    onCancle: () => void;
    formatting: (param: number) => string;
    onStore : () => void;
}

const ModalStorage: React.FC<ModalStorageProps> = ({
    src6,
    onInputChange,
    storagemeso,
    setStorageMeso,
    toggle,
    onCancle,
    formatting,
    onStore
}) => {
    return (
        <Modal toggle={toggle}>
            <ModalHead>현재 보유한 메소를 입력해주세요.</ModalHead>
            <ModalContent>
                <div>
                    <img src={src6} width="35px" alt="조각" /> &nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        value={storagemeso}
                        onChange={(e) => onInputChange(e, setStorageMeso)}
                    />
                </div>
                <div>{storagemeso && formatting(storagemeso)}&nbsp;메소</div>
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

export default React.memo(ModalStorage);
