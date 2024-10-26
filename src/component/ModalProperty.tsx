import React, { useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { Property, defaultProperty } from 'type/Property';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: 10% 30% 30%;
    gap: 40px;
    row-gap: 30px;
    margin: 10% 15% 10% 15%;

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
    width: 90px;
    border-radius: 12px;
    border: 1px solid gray;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
`;

const propertyToKorean: any = {
    meso: 'https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png',
    erda: 'image/jogak.PNG',
    gem: 'image/gem.PNG',
    innocent: 'image/innocent.PNG',
    epicabillity: 'image/epic.PNG',
    editional: 'image/editional.PNG',
    dew: 'https://maplestory.io/api/gms/200/item/2020015/icon?resize=2',
    milk: 'https://maplestory.io/api/gms/200/item/2020013/icon?resize=2',
    pure: 'image/pure.PNG',
};

interface ModalPropertyProps {
    ocid: string;
    toggle: boolean;
    onMesoPlus: any;
    onCancle: any;
    property: any;
    setProperty: any;
    characterProperty: any;
    propertyProfit : any;
    setPropertyProfit : any;
}

const ModalProperty: React.FC<ModalPropertyProps> = ({
    toggle,
    onMesoPlus,
    onCancle,
    ocid,
    property,
    setProperty,
    characterProperty,
    propertyProfit,
    setPropertyProfit
}) => {
    useEffect(() => {
        if (toggle && characterProperty) {
            //캐릭터에 저장된 정보를 input창에 업데이트함 (편의성)
            setProperty(characterProperty);
            getPropertyProfit();
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

    const onProfitChange = (e : any, key : string) => {
        const { value } = e.target;
        const numberValue = Number(value);
        setPropertyProfit((prev: any) => ({
            ...prev, // 이전 상태를 복사
            [key]: numberValue, // 동적 키로 값을 설정
        }));
    };

    const getPropertyProfit = () => {
        const prev = localStorage.getItem('propertyProfit');
        if(prev) {
            const next = JSON.parse(prev);
            setPropertyProfit(next);
        }
    }

    return (
        <Modal toggle={toggle}>
            <ModalHead>획득한 재화와 재화의 가치를 입력해주세요.</ModalHead>
            {property &&
                Object.keys(property).map((key: string) => (
                    <div>
                        {key !== 'totalmeso' && ( //totalmeso는 제외 === 캐릭터 창에 보여줄것이므로
                            <ModalContent key={key}>
                                <div>
                                    <img
                                        src={propertyToKorean[key]}
                                        alt={key}
                                        width="30px"
                                    />
                                </div>
                                <Input
                                    value={property[key]}
                                    onChange={(e) => onChange(e, key)}
                                />
                                <Input 
                                    value={propertyProfit[key]}
                                    onChange={(e) => onProfitChange(e, key)}
                                />
                            </ModalContent>
                        )}
                    </div>
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
