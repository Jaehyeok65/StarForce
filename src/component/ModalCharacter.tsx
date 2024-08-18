import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 10% 10%;

    > div {
        font-size: 12px;
    }
`;

const Info = styled.div`
    font-size: 11px;
    display: grid;
    place-items: center;
    gap: 8px;
`;

const ModalHead = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7%;
    margin-bottom: 7%;
    font-size: 13px;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
    gap: 20px;
`;

const Button = styled.button`
    border: 1px solid gray;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
`;

interface ModalBossProps {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    BossArray: any[];
    onBossCopy: any;
    onCancle: (onToggle: React.Dispatch<React.SetStateAction<boolean>>) => void;
}

const ModalBoss: React.FC<ModalBossProps> = ({
    toggle,
    setToggle,
    BossArray,
    onBossCopy,
    onCancle,
}) => {
    const [BossCharacter, setBossCharacter] = useState<any[]>([]);
    const [copyocid, setCopyOcid] = useState<any>('');
    

    useEffect(() => {
        if (toggle) {
            //toggle이 true인경우에만
            if (BossArray && Array.isArray(BossArray)) {
                //BossArray가 true이며 배열이라면
                const newBossArray = BossArray.filter(
                    (item: any) => item.copytoggle === false
                );
                const CopyPrev = BossArray.filter((item : any) => item.copytoggle === true);
                if(CopyPrev && Array.isArray(CopyPrev) && CopyPrev.length > 0) {
                    setCopyOcid(CopyPrev[0].ocid);
                }
                setBossCharacter(newBossArray);
            }
        }
    }, [toggle]);

    return (
        <Modal toggle={toggle}>
            <ModalHead>보스 처치 현황을 복사할 캐릭터를 선택하세요</ModalHead>
            <ModalContent>
                {BossCharacter &&
                    Array.isArray(BossCharacter) &&
                    BossCharacter.map((character: any) => (
                        <Info key={character?.characterData?.character_name}>
                            <div>
                                <img
                                    src={
                                        character?.characterData
                                            ?.character_image
                                    }
                                    alt={
                                        character?.characterData?.character_name
                                    }
                                />
                            </div>
                            <div>
                                {' '}
                                {character?.characterData?.character_name}
                            </div>
                            <div>
                            {character?.characterData?.character_level+"레벨"}
                            </div>
                            <div>
                            {character?.characterData?.character_class}
                            </div>
                            <div>
                                <Button onClick={() => onBossCopy(copyocid,character?.ocid)}>복사하기</Button>
                            </div>
                        </Info>
                    ))}
            </ModalContent>
            <Head>
                <Button onClick={() => onCancle(setToggle)}>닫기</Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalBoss);
