import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { Property, defaultProperty } from 'type/Property';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: 40% 60%;
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

const propertyToKorean: any = {
    meso: '메소',
    erda: '조각',
    gem: '코어 젬스톤',
    innocent: '이노센트',
    epicabillity: '에픽잠재',
    editional: '에디셔널',
    dew: '황혼의 이슬',
    milk: '순록의 우유',
    pure: '순백',
    totalmeso: '총 메소',
};

interface ModalPropertyProps {
    ocid: string;
    toggle: boolean;
    onMesoPlus: any;
    onCancle: any;
    property: any;
    setProperty: any;
    characterProperty: any;
}

const ModalProperty: React.FC<ModalPropertyProps> = ({
    toggle,
    onMesoPlus,
    onCancle,
    ocid,
    property,
    setProperty,
    characterProperty,
}) => {
    useEffect(() => {
        if (toggle && characterProperty) {
            //캐릭터에 저장된 정보를 input창에 업데이트함 (편의성)
            setProperty(characterProperty);
        }
    }, [toggle]);

    const onChange = (e: any, key: string) => {
        const { value } = e.target;
        const numberValue = Number(value);
        setProperty((prev: any) => ({
            ...prev, // 이전 상태를 복사
            [key]: numberValue, // 동적 키로 값을 설정
        }));
    };

    console.log(characterProperty);

    return (
        <Modal toggle={toggle}>
            <ModalHead>획득한 메소를 입력해주세요.</ModalHead>
            {property &&
                Object.keys(property).map((key: string) => (
                    <ModalContent key={key}>
                        <div>{propertyToKorean[key]}</div>
                        <Input
                            value={property[key]}
                            onChange={(e) => onChange(e, key)}
                        />
                    </ModalContent>
                ))}
            <Head>
                <Button
                    width="100px"
                    onClick={() => onMesoPlus(ocid, property)}
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
