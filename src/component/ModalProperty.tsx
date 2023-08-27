import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: 10% 35% 55%;
    gap: 40px;
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
`;

interface ModalPropertyProps {
    src1: string;
    src3: string;
    src4: string;
    src5: string;
    toggle: boolean;
    propertynum: number;
    property: number;
    erda: number;
    gem: number;
    totalproperty : number;
    totalerda : number;
    totalgem : number
    total: boolean;
    
    onInputChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<number>>
    ) => void;
    setPropertyNum: React.Dispatch<React.SetStateAction<number>>;
    setProperty: React.Dispatch<React.SetStateAction<number>>;
    setErda: React.Dispatch<React.SetStateAction<number>>;
    setGem: React.Dispatch<React.SetStateAction<number>>;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    formatting: (param: number) => string;
    onPropertyPlus : () => void;
}

const ModalProperty: React.FC<ModalPropertyProps> = ({
    src1,
    src3,
    src4,
    src5,
    toggle,
    propertynum,
    property,
    erda,
    gem,
    totalproperty,
    totalerda,
    totalgem,
    total,
    onInputChange,
    setPropertyNum,
    setProperty,
    setErda,
    setGem,
    setToggle,
    formatting,
    onPropertyPlus
}) => {
    return (
        <Modal toggle={toggle}>
            {total ? (
                <ModalHead>오늘 획득한 재화를 입력해주세요.</ModalHead>
            ) : (
                <ModalHead>획득한 재화를 입력해주세요.</ModalHead>
            )}
            <ModalContent>
                {total && (
                    <div>
                        <img src={src1} width="30px" alt="재획" />{' '}
                        &nbsp;&nbsp;&nbsp;:
                    </div>
                )}
                {total && (
                    <div>
                        <Input
                            type="number"
                            onChange={(e) => onInputChange(e, setPropertyNum)}
                        />
                    </div>
                )}
                {total && <div>{propertynum}&nbsp;회</div>}
                <div>
                    <img src={src3} width="30px" alt="메소" />{' '}
                    &nbsp;&nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        onChange={(e) => onInputChange(e, setProperty)}
                    />
                </div>
                <div>{total ? formatting(totalproperty) : formatting(property)}&nbsp;메소</div>
                <div>
                    <img src={src4} width="35px" alt="조각" /> &nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        onChange={(e) => onInputChange(e, setErda)}
                    />
                </div>
                <div>{total ? totalerda : erda}&nbsp;개</div>
                <div>
                    <img src={src5} width="35px" alt="코젬" /> &nbsp;&nbsp;:
                </div>
                <div>
                    <Input
                        type="number"
                        onChange={(e) => onInputChange(e, setGem)}
                    />
                </div>
                <div>{total ? totalgem : gem}&nbsp;개</div>
            </ModalContent>
            <Head>
                {!total && (
                    <Button
                        width="100px"
                        onClick={() => onPropertyPlus()}
                    >
                        적용하기
                    </Button>
                )}
                <Button
                    width="100px"
                    onClick={() => setToggle((prev) => !prev)}
                >
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalProperty);
