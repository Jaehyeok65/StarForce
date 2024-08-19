import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    gap: 30px;
    row-gap: 10px;
    position: relative;
    margin: 7% 10% 7% 10%;

    > div {
        font-size: 12px;
    }

    @media screen and (max-width: 600px) {
        margin: 7% 7% 7% 7%;
    }
`;

const ModalColumns = styled.div`
    display: grid;
    grid-template-columns: 40% 40% 20%;
    align-items: center;
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

const Checkbox = styled.input`
    width: 20px;
    height: 16px;
    border: 1px solid gray;
    border-radius: 4px;
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

const ImageContainer = styled.div<{ $difficulty: string }>`
    position: relative;
    display: inline-block;

    > div {
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
`;

const Image = styled.img`
    width: 100px;
    height: 100px;
    border: 1px solid gray;
    border-radius: 8px;
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
    onCheckChange?: (
        e: React.ChangeEvent<HTMLInputElement>,
        ocid?: string
    ) => void;
    onBossMesoPlus?: (
        e: React.MouseEvent<HTMLButtonElement>,
        ocid?: string
    ) => void;
    onCancle: (onToggle: React.Dispatch<React.SetStateAction<boolean>>) => void;
    onBossClick : any;
}

const ModalBoss: React.FC<ModalBossProps> = ({
    toggle,
    setToggle,
    boss,
    onCheckChange,
    onBossMesoPlus,
    onCancle,
    onBossClick
}) => {
    const [SortedBoss, setSortedBoss] = useState<any[]>([]); //결정석 가격 오름차순으로 정렬
    const [difficulty, setDifficulty] = useState<any>('EASY'); //hard, extreme
    const [ocid, setOcid] = useState<any>('');

    useEffect(() => {
        if (toggle) {
            if (boss && Array.isArray(boss)) {
                //boss가 undefined가 아니며 배열이라면
                const prev  = boss.filter(
                    (item: any) => item.bosstoggle === true
                );
                console.log(boss);
              
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
                        <ModalColumns key={item.name}>
                            <div>
                                <ImageContainer $difficulty={item.difficulty} onClick={() => onBossClick()}>
                                    <Image src={item.src} alt={item.name} />
                                    <div>{item?.difficulty}</div>
                                </ImageContainer>
                            </div>
                            <div>
                                <img
                                    src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                                    width="13px"
                                    alt="메소"
                                />
                                &nbsp;
                                {item?.meso.toLocaleString()}
                            </div>
                            <Checkbox
                                type="checkbox"
                                checked={item?.check}
                                name={item?.name}
                                onChange={onCheckChange}
                            />
                        </ModalColumns>
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
