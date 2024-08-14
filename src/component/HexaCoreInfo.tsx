import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getHexaCoreData, getHexaStatData } from 'api/Maple';
import styled from 'styled-components';

const Core = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    gap: 20px;
    font-size: 12px;
    margin: 5% 0% 5% 0%;

    @media screen and (max-width: 567px) {
        margin: 5% 10% 5% 10%;
        grid-template-columns: 1fr;
        text-align: left;
    }
`;

const Title = styled.div`
    font-weight: bold;
    margin-top: 5%;

    @media screen and (max-width: 567px) {
        margin-top: 10%;
    }
`;

const Stat = styled.div`
    text-align: center;
    grid-template-columns: 1fr;
    margin-top: 5%;

    > div {
        margin: 1% 1% 1% 1%;
    }
`;

const Total = styled.div`
    font-size: 12px;
    text-align: left;
    margin: 5% 5% 5% 5%;
`;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 85% 15%;
`;

const HexaCoreInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const {
        data: core,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['hexacore', ocid, date],
        queryFn: () => getHexaCoreData(ocid, date),
        enabled: !!ocid,
    });

    const { data: stat } = useQuery({
        queryKey: ['hexastat', ocid, date],
        queryFn: () => getHexaStatData(ocid, date),
        enabled: !!ocid,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{'오류가 발생했습니다.' + error}</div>;
    }

    return (
        <Total>
            <Title>헥사 코어</Title>
            <Core>
                {core &&
                    core?.character_hexa_core_equipment?.map(
                        (item: any, index: number) => (
                            <div key={index}>
                                {item.hexa_core_type === '마스터리 코어' ? (
                                    item.linked_skill.map(
                                        (item1: any, index1: number) => (
                                            <Inner key={index1}>
                                                <div>{item1.hexa_skill_id}</div>
                                                <div>
                                                    {item.hexa_core_level +
                                                        'LV'}
                                                </div>
                                            </Inner>
                                        )
                                    )
                                ) : (
                                    <Inner>
                                        <div>{item.hexa_core_name}</div>
                                        <div>{item.hexa_core_level + 'LV'}</div>
                                    </Inner>
                                )}
                            </div>
                        )
                    )}
            </Core>
            {Object.keys(stat)
                ?.filter((key) => key.startsWith('character_hexa_stat_core'))
                ?.map((hexastatKey) => {
                    // `_`로 나누어 마지막 부분을 추출
                    const parts = hexastatKey.split('_');
                    // 마지막 부분이 숫자인지 확인
                    const lastPart = parts[parts.length - 1];
                    const number = parseInt(lastPart, 10);
                    const displayNumber = !isNaN(number) ? number : 1;
                    const statinfo = stat[hexastatKey];
                    return (
                        <div key={hexastatKey}>
                            { statinfo && 
                                <Title>
                                    헥사 스탯
                                    {displayNumber}
                                </Title>
                            }
                            <div>
                                {statinfo?.map((item: any, index: number) => (
                                    <Stat key={index}>
                                        <div>
                                            {item.main_stat_name} :{' '}
                                            {item.main_stat_level}
                                        </div>
                                        <div>
                                            {item.sub_stat_name_1} :{' '}
                                            {item.sub_stat_level_1}
                                        </div>
                                        <div>
                                            {item.sub_stat_name_2} :{' '}
                                            {item.sub_stat_level_2}
                                        </div>
                                    </Stat>
                                ))}
                            </div>
                        </div>
                    );
                })}
        </Total>
    );
};

export default React.memo(HexaCoreInfo);
