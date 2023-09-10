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

interface ModalErdaProps {
    src4: string;
    src5: string;
    toggle: boolean;
    erdameso: number;
    gemmeso: number;
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<number>>
    ) => void;
    setGemMeso: React.Dispatch<React.SetStateAction<number>>;
    setErdaMeso: React.Dispatch<React.SetStateAction<number>>;
    onCancle: () => void;
    formatting: (param: number) => string;
}

const ModalErda: React.FC<ModalErdaProps> = ({
    src4,
    src5,
    gemmeso,
    erdameso,
    onInputChange,
    setErdaMeso,
    setGemMeso,
    toggle,
    onCancle,
    formatting,
}) => {
    return (
        <Modal toggle={toggle}>
            <ModalHead>현재 시세를 입력하세요.</ModalHead>
            <ModalContent>
                <div>
                    <img src={src4} width="35px" alt="조각" /> &nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        value={erdameso}
                        onChange={(e) => onInputChange(e, setErdaMeso)}
                    />
                </div>
                <div>{formatting(erdameso)}&nbsp;메소</div>
                <div>
                    <img src={src5} width="35px" alt="코젬" /> &nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        value={gemmeso}
                        onChange={(e) => onInputChange(e, setGemMeso)}
                    />
                </div>
                <div>{formatting(gemmeso)}&nbsp;메소</div>
            </ModalContent>
            <Head>
                <Button width="100px" onClick={onCancle}>
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalErda);
