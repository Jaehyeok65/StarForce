import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { FaCheck } from 'react-icons/fa6';
import { BossItem } from 'util/BossArray';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    place-items: center;
    gap: 10px;
    row-gap: 10px;
    position: relative;
    margin: 7% 10% 7% 10%;

    > div {
        font-size: 12px;
    }

    @media screen and (max-width: 600px) {
        margin: 7% 7% 7% 7%;
        grid-template-columns: repeat(5, 1fr);
    }
`;

const ModalHead = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7%;
    font-size: 13px;
`;

const ModalNavigation = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 5% 10%;
    gap: 20px;

    @media screen and (max-width: 600px) {
        margin: 5% 7%;
        gap: 10px;
    }
`;

const ModalMeso = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 5% 10%;
    font-size: 12px;

    @media screen and (max-width: 600px) {
        margin: 5% 7%;
    }
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
    gap: 10px;
`;

const Button = styled.button<{ $width: string; $mode?: boolean }>`
    font-size: 12px;
    border: 1px solid gray;
    padding: 4px 8px;
    background-color: ${(props) => (props.$mode ? 'black' : 'white')};
    color: ${(props) => (props.$mode ? 'white' : 'black')};
    width: ${(props) => props.$width};
    cursor: pointer;
    border-radius: 8px;
`;

const ImageContainer = styled.div<{ $difficulty?: string; $checked?: boolean }>`
    position: relative;
    display: inline-block;
    cursor: pointer;

    > div:nth-child(2) {
        position: absolute;
        bottom: 10%; /* 이미지의 아래쪽에서 10% 위에 배치 */
        right: 5%; /* 이미지의 오른쪽에서 10% 왼쪽에 배치 */
        color: ${({ $difficulty }) => {
            switch ($difficulty) {
                case 'EASY':
                    return 'white'; // 녹색
                case 'NORMAL':
                    return 'white'; // 노란색
                case 'HARD':
                    return 'red'; // 오렌지색
                case 'EXTREME':
                    return 'red'; // 빨간색
                default:
                    return '#8B6331'; // 기본 색상
            }
        }};
        font-size: 15px;
        font-weight: bold;
        z-index: 10; /* 텍스트가 이미지 위에 오도록 설정 */
    }

    > div:nth-child(3) {
        opacity: ${({ $checked }) => ($checked ? 1 : 0)};
        position: absolute;
        top: 50%; /* 이미지 중앙에 배치 */
        left: 50%;
        transform: translate(-50%, -50%); /* 중앙 정렬 */
        color: #4baf4b;
        font-size: 30px;
        font-weight: bold; /* 텍스트 굵기 */
        z-index: 10; /* 텍스트가 이미지 위에 오도록 설정 */
    }
`;

const Image = styled.img<{ $checked?: boolean }>`
    width: 50px;
    height: 60px;
    border: 1px solid gray;
    border-radius: 8px;
    transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
    filter: ${({ $checked }) =>
        $checked ? 'grayscale(100%) brightness(75%)' : ''};

    @media screen and (max-width: 600px) {
        width: 50px;
    }
`;

const ModalBossItem = ({ toggle } : { toggle : boolean}) => {
    return (
        <Modal toggle={toggle}>
            <ModalHead>금주에 획득한 아이템을 체크해주세요</ModalHead>
            <ModalContent>
                {Object.keys(BossItem).map((key: any) => (
                    <div key={key}>
                        <ImageContainer
                        >
                            <Image
                                src={BossItem[key]}
                                alt={key}
                            />
                            <div>
                                <FaCheck />
                            </div>
                        </ImageContainer>
                    </div>
                ))}
            </ModalContent>
            <Head>
                <Button $width="100px">적용하기</Button>
                <Button $width="100px">닫기</Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalBossItem);
