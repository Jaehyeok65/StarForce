import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { Property, defaultProperty } from 'type/Property';

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
    toggle: boolean;
    onMesoPlus: any;
    onCancle: any;
    property : any;
    setProperty : any;
}

const ModalProperty: React.FC<ModalPropertyProps> = ({
    toggle,
    onMesoPlus,
    onCancle,
    ocid,
    property,
    setProperty
}) => {

    const onChange = (e : any, key : string) => {
        const { value } = e.target;
        const numberValue = Number(value);
        setProperty((prev: any) => ({
            ...prev,           // 이전 상태를 복사
            [key]: numberValue       // 동적 키로 값을 설정
          }));
    };

    console.log(property);


    return (
        <Modal toggle={toggle}>
            <ModalHead>획득한 메소를 입력해주세요.</ModalHead>
            {property && Object.keys(property).map((key : string) => (
                <ModalContent key={key}>
                    <Input value={property[key]} onChange={(e) => onChange(e,key)}/>
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
