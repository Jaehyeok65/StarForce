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

interface ModalPropertyProps {
    ocid: string;
    mesoImage: string;
    erdaImage: string;
    toggle: boolean;
    meso: number;
    erda: number;
    onInputChange: any;
    setMeso: any;
    setErda: any;
    setToggle: any;
    onMesoPlus: (ocid: string, meso: number, erda: number) => void;
    onCancle: any;
}

const ModalProperty: React.FC<ModalPropertyProps> = ({
    mesoImage,
    erdaImage,
    toggle,
    meso,
    erda,
    onInputChange,
    setErda,
    setMeso,
    setToggle,
    onMesoPlus,
    onCancle,
    ocid,
}) => {
    return (
        <Modal toggle={toggle}>
            <ModalHead>획득한 메소를 입력해주세요.</ModalHead>
            <ModalContent>
                <div>
                    <img src={mesoImage} width="30px" alt="메소" />{' '}
                    &nbsp;&nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        value={meso}
                        onChange={(e) => onInputChange(e, ocid, setMeso)}
                    />
                </div>
                <div>
                    {meso && meso.toLocaleString()}
                    &nbsp;메소
                </div>
                <div>
                    <img src={erdaImage} width="35px" alt="조각" />{' '}
                    &nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        value={erda}
                        onChange={(e) => onInputChange(e, ocid, setErda)}
                    />
                </div>
                <div>{erda && erda}&nbsp;개</div>
            </ModalContent>
            <Head>
                <Button
                    width="100px"
                    onClick={() => onMesoPlus(ocid, meso, erda)}
                >
                    적용하기
                </Button>
                <Button width="100px" onClick={() => onCancle(ocid)}>
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalProperty);
