import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { FaCheck } from 'react-icons/fa6';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    row-gap: 10px;
    position: relative;
    margin: 7% 10% 7% 10%;

    > div {
        font-size: 12px;
    }

    @media screen and (max-width: 600px) {
        margin: 7% 7% 7% 7%;
        gap: 10px;
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
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
    gap: 10px;
`;

const Button = styled.button<{ $width: string }>`
    font-size: 12px;
    border: 1px solid gray;
    padding: 4px 8px;
    background-color: white;
    width: ${(props) => props.$width};
    backgroud-color: white;
    cursor: pointer;
    border-radius: 8px;
`;

const ImageContainer = styled.div<{ $difficulty: string; $checked: boolean }>`
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

const Image = styled.img<{ $checked: boolean }>`
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-radius: 8px;
    transition: filter 0.3s ease-in-out, opacity 0.3s ease-in-out;
    filter: ${({ $checked }) =>
        $checked ? 'grayscale(100%) brightness(75%)' : ''};
`;

interface Boss {
    check: boolean;
    meso: number;
    name: string;
    num: number;
}

interface ModalBossProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    boss?: Boss[];
    onBossMesoPlus?: (
        e: React.MouseEvent<HTMLButtonElement>,
        ocid?: string
    ) => void;
    onCancle: (onToggle: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onBossClick: any;
    BossArray: any[];
}

const ModalBoss: React.FC<ModalBossProps> = ({
    toggle,
    setToggle,
    boss,
    onBossMesoPlus,
    onCancle,
    onBossClick,
    BossArray,
}) => {
    const [SortedBoss, setSortedBoss] = useState<any[]>([]); //결정석 가격 오름차순으로 정렬
    const [difficulty, setDifficulty] = useState<any>('EASY'); //hard, extreme
    const [ocid, setOcid] = useState<any>('');

    useEffect(() => {
        if (toggle) {
            console.log(boss);
            if (boss && Array.isArray(boss)) {
                if (difficulty === 'EASY') {
                    //사용자가 이지를 클릭했다면
                    const newBossArray = boss.filter((item: any) => !item.hard);
                    const SortedArray = onSortBossArray(newBossArray);
                    setSortedBoss(SortedArray);
                } else if (difficulty === 'HARD') {
                    //사용자가 하드를 클릭했다면
                    const newBossArray = boss.filter(
                        (item: any) => item.hard && !item.extreme
                    );
                    const SortedArray = onSortBossArray(newBossArray);
                    setSortedBoss(SortedArray);
                } else if (difficulty === 'EXTREME') {
                    //사용자가 익스트림을 클릭했다면
                    const newBossArray = boss.filter(
                        (item: any) => item.hard && item.extreme
                    );
                    const SortedArray = onSortBossArray(newBossArray);
                    setSortedBoss(SortedArray);
                }
            }
        }
    }, [toggle, difficulty, boss]);

    useEffect(() => {
        if (BossArray && Array.isArray(BossArray)) {
            const newBossArray = BossArray.filter(
                (item: any) => item.bosstoggle === true
            );
            if (
                newBossArray &&
                Array.isArray(newBossArray) &&
                newBossArray.length > 0
            ) {
                setOcid(newBossArray[0].ocid);
            }
        }
    }, [toggle]);

    const onSortBossArray = (bossArray: any[]) => {
        const SortedArray = [...bossArray];
        return SortedArray.sort((a, b) => {
            return a.meso - b.meso;
        });
    };

    return (
        <Modal toggle={toggle}>
            <ModalHead>금주에 처치한 보스를 체크해주세요</ModalHead>
            <ModalNavigation>
                <div>
                    <Button $width="100%" onClick={() => setDifficulty('EASY')}>
                        이지
                    </Button>
                </div>
                <div>
                    <Button $width="100%" onClick={() => setDifficulty('HARD')}>
                        하드
                    </Button>
                </div>
                <div>
                    <Button
                        $width="100%"
                        onClick={() => setDifficulty('EXTREME')}
                    >
                        익스트림
                    </Button>
                </div>
            </ModalNavigation>
            <ModalContent>
                {SortedBoss &&
                    SortedBoss.map((item: any) => (
                        <div key={item.name}>
                            <ImageContainer
                                $difficulty={item.difficulty}
                                $checked={item.check}
                                onClick={() => onBossClick(ocid, item.name)}
                            >
                                <Image
                                    src={item.src}
                                    alt={item.name}
                                    $checked={item.check}
                                />
                                <div>{item?.difficulty}</div>
                                <div>
                                    <FaCheck />
                                </div>
                            </ImageContainer>
                            <div>
                                <img
                                    src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                                    width="13px"
                                    alt="메소"
                                />
                                &nbsp;
                                {item?.meso.toLocaleString()}
                            </div>
                        </div>
                    ))}
            </ModalContent>
            <Head>
                <Button $width="100px" onClick={onBossMesoPlus}>
                    적용하기
                </Button>
                <Button $width="100px" onClick={() => onCancle(setToggle)}>
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalBoss);
