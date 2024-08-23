import React from 'react';
import styled from 'styled-components';
import ModalBoss from './ModalBoss';
import ModalCharacter from './ModalCharacter';
import { FaRegTrashCan } from 'react-icons/fa6';

const Info = styled.div`
    font-size: 11px;
    display: grid;
    place-items: center;
    gap: 8px;
`;

const ImageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: start;
    align-items: end;
`;

const ImageInfo = styled.div`
    display: grid;
    row-gap: 5px;
    margin-left: 2.5px;

    @media screen and (max-width: 1300px) {
        margin-left: -2px;
    }
`;

const Checkbox = styled.input`
    width: 20px;
    height: 16px;
    border: 1px solid gray;
    border-radius: 4px;
`;

const Button = styled.button`
    border: 1px solid gray;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
`;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    place-items: center;
`;

interface bossinfo {
    ocid: string; //캐릭터 ocid
    boss: any[]; //처치 보스 목록
    done: boolean; //보스돌이 완료여부
    bossToggle: boolean;
    meso: number;
    setBossToggle: any;
    onCancle: any;
    onBossMesoPlus: any;
    data: any;
    onBossDoneChange: any;
    onCharacterDelete: any;
    BossArray: any;
    onBossCopy: any;
    setCopyToggle: any;
    copyToggle: boolean;
    onBossClick: any;
    onClickCharacterInfo: any;
}

const BossCharacterInfo: React.FC<bossinfo> = ({
    ocid,
    boss,
    done,
    bossToggle,
    meso,
    setBossToggle,
    onCancle,
    onBossMesoPlus,
    data,
    onBossDoneChange,
    onCharacterDelete,
    BossArray,
    onBossCopy,
    setCopyToggle,
    copyToggle,
    onBossClick,
    onClickCharacterInfo,
}) => {
    return (
        <React.Fragment>
            <Info>
                <ImageContainer>
                    <img
                        src={data?.character_image}
                        alt={data?.character_name}
                    />
                    <ImageInfo>
                        <div>{data?.character_name}</div>
                        <div>{data?.character_level + '레벨'}</div>
                        <div>{data?.character_class}</div>
                        <div>
                            <Button
                                onClick={() =>
                                    onClickCharacterInfo(data?.character_name)
                                }
                            >
                                상세보기
                            </Button>
                        </div>
                    </ImageInfo>
                </ImageContainer>
                <Inner>
                            <div>
                                <Button onClick={() => setBossToggle(ocid)}>
                                    입력
                                </Button>
                            </div>
                            <div>
                                <Button onClick={() => setCopyToggle(ocid)}>
                                    복사
                                </Button>
                            </div>
                        </Inner>
                <div>
                    <img
                        src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                        width="13px"
                        alt="메소"
                    />
                    &nbsp;
                    {meso && meso.toLocaleString()}
                </div>
                <Inner>
                    <div>
                        {
                            <Checkbox
                                type="checkbox"
                                checked={done}
                                onChange={() => onBossDoneChange(ocid)}
                            />
                        }
                    </div>
                    <div>
                        <Button onClick={() => onCharacterDelete(ocid)}>
                            <FaRegTrashCan />
                        </Button>
                    </div>
                </Inner>
            </Info>
            <ModalBoss
                toggle={bossToggle}
                setToggle={() => setBossToggle(ocid)}
                onCancle={() => onCancle(() => setBossToggle(ocid))}
                boss={boss}
                onBossMesoPlus={(e) => onBossMesoPlus(e, ocid)}
                onBossClick={onBossClick}
                BossArray={BossArray}
            />
            <ModalCharacter
                toggle={copyToggle}
                setToggle={() => setCopyToggle(ocid)}
                onCancle={() => onCancle(() => setCopyToggle(ocid))}
                onBossCopy={onBossCopy}
                BossArray={BossArray}
            />
        </React.Fragment>
    );
};

export default React.memo(BossCharacterInfo);
