import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getStatData, getCharacterData, getAbilityData } from 'api/Maple';

const Info = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin: 0% 25% 0% 25%;
    font-size: 14px;

    @media screen and (max-width: 1020px) {
        margin: 0% 20% 0% 20%;
    }

    @media screen and (max-width: 567px) {
        margin: 0% 0% 0% 0%;
    }
`;

const Target = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const Ability = styled.div`
    display: grid;
    grid-template-columns: 1fr;
`;

const AbilityInner = styled.div<{ $grade: string }>`
    color: ${(props) =>
        props.$grade === '레전드리'
            ? '#228B22'
            : props.$grade === '유니크'
            ? '#FF9100'
            : props.$grade === '에픽'
            ? '#C71585'
            : '#46BEFF'};

    font-size: 12px;
`;

const Background = styled.div`
    margin: 5% 0% 5% 0%;
`;

const infoarray: any[] = [
    'character_level',
    'character_name',
    'world_name',
    'character_class',
    'character_guild_name',
];

const name: any = {
    character_level: '레벨',
    character_name: '닉네임',
    world_name: '월드',
    character_class: '직업',
    character_guild_name: '길드',
};

const statarray: any[] = [
    '전투력',
    '최대 스탯공격력',
    'STR',
    'DEX',
    'INT',
    'LUK',
    '크리티컬 확률',
    '보스 몬스터 데미지',
    '방어율 무시',
    '크리티컬 데미지',
    '버프 지속시간',
    '재사용 대기시간 감소 (초)',
    '재사용 대기시간 감소 (%)',
    '아이템 드롭률',
    '메소 획득량',
    '아케인포스',
    '어센틱포스',
];

const CharacterInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const {
        isLoading: statLoading,
        data: stat,
        isError: statError,
        error: staterror,
    } = useQuery({
        queryKey: ['stat', ocid, date],
        queryFn: () => getStatData(ocid, date),
        enabled: !!ocid,
    });

    const {
        isLoading: infoLoading,
        data: info,
        isError: infoError,
        error: infoerror,
    } = useQuery({
        queryKey: ['info', ocid, date],
        queryFn: () => getCharacterData(ocid, date),
        enabled: !!ocid,
    });

    const { data: ability } = useQuery({
        queryKey: ['ability', ocid, date],
        queryFn: () => getAbilityData(ocid, date),
        enabled: !!ocid,
    });

    const formatting = (stat_name: string, stat_value: string): string => {
        if (
            stat_name === '보스 몬스터 데미지' ||
            stat_name === '방어율 무시' ||
            stat_name === '재사용 대기시간 감소 (%)' ||
            stat_name === '크리티컬 데미지' ||
            stat_name === '아이템 드롭률' ||
            stat_name === '메소 획득량' ||
            stat_name === '크리티컬 확률' ||
            stat_name === '버프 지속시간'
        ) {
            return Number(stat_value).toLocaleString() + '%';
        } else if (stat_name === '재사용 대기시간 감소 (초)') {
            return Number(stat_value).toLocaleString() + '초';
        }
        return Number(stat_value).toLocaleString();
    };

    if (statLoading || infoLoading) {
        return <div>Loading...</div>;
    }

    if (statError) {
        return <div>{'오류가 발생했습니다. ' + staterror}</div>;
    }

    if (infoError) {
        return <div>{'오류가 발생했습니다. ' + infoerror}</div>;
    }

    console.log(ability);

    return (
        <Background>
            <img src={info.character_image} alt={info.character_name} />
            <Info>
                {infoarray.map((item: any, index: number) => (
                    <Target key={index}>
                        <div style={{ fontWeight: 'bold' }}>{name[item]}</div>
                        <div>
                            {Object.keys(info).map(
                                (item1: any, index1: number) => (
                                    <div key={index1}>
                                        {item === item1 && info[item]}
                                    </div>
                                )
                            )}
                        </div>
                    </Target>
                ))}
                {statarray.map((item: any, index: number) => (
                    <Target key={index}>
                        <div style={{ fontWeight: 'bold' }}>
                            {item === '최대 스탯공격력' ? '스탯공격력' : item}
                        </div>
                        <div>
                            {stat.map((item1: any, index1: number) => (
                                <div key={index1}>
                                    {item === item1.stat_name &&
                                        formatting(
                                            item1.stat_name,
                                            item1.stat_value
                                        )}
                                </div>
                            ))}
                        </div>
                    </Target>
                ))}
                <Target>
                    <div style={{ fontWeight: 'bold' }}>어빌리티</div>
                    <Ability>
                        {ability &&
                            ability?.ability_info?.map(
                                (item: any, index: number) => (
                                    <AbilityInner
                                        key={index}
                                        $grade={item.ability_grade}
                                    >
                                        {item.ability_value}
                                    </AbilityInner>
                                )
                            )}
                    </Ability>
                </Target>
            </Info>
        </Background>
    );
};

export default React.memo(CharacterInfo);
