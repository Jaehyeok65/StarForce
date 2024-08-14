import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCharacterData } from 'api/Maple';
import moment from 'moment';
import styled from 'styled-components';
import ModalBoss from './ModalBoss';

const Info = styled.div`
    font-size: 11px;
    display: grid;
    place-items: center;
    gap: 5px;
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
`;

interface bossinfo {
    ocid: string; //캐릭터 ocid
    boss: any[]; //처치 보스 목록
    done: boolean; //보스돌이 완료여부
    bossToggle: boolean;
    meso: number;
    setBossToggle: any;
    onCancle: any;
    onCheckChange: any;
    onBossMesoPlus: any;
}

const BossCharacterInfo: React.FC<bossinfo> = ({
    ocid,
    boss,
    done,
    bossToggle,
    meso,
    setBossToggle,
    onCancle,
    onCheckChange,
    onBossMesoPlus,
}) => {
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['bossinfo', ocid],
        queryFn: () => getCharacterData(ocid, moment().format('YYYY-MM-DD')),
        enabled: !!ocid,
    });

    return (
        <React.Fragment>
            <Info>
                <img src={data?.character_image} alt={data?.character_name} />
                <div>{data?.character_name}</div>
                <div>{data?.character_level}</div>
                <div>{data?.character_class}</div>
                <div>
                    <Button onClick={() => setBossToggle(ocid)}>입력</Button>
                </div>
                <div>{meso && meso.toLocaleString()}</div>
                <div>{<Checkbox type="checkbox" checked={false} />}</div>
            </Info>
            <ModalBoss
                toggle={bossToggle}
                setToggle={() => setBossToggle(ocid)}
                onCancle={() => onCancle(() => setBossToggle(ocid))}
                boss={boss}
                onCheckChange={(e) => onCheckChange(e, ocid)}
                onBossMesoPlus={(e) => onBossMesoPlus(e, ocid)}
            />
        </React.Fragment>
    );
};

export default React.memo(BossCharacterInfo);
