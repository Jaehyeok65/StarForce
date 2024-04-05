import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getVCoreData } from 'api/Maple';
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    gap: 20px;
    font-size: 12px;
    margin: 7% 5% 7% 5%;

    @media screen and (max-width: 567px) {
        margin: 10% 10% 10% 10%;
        grid-template-columns: 1fr;
        text-align: left;
    }
`;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 85% 15%;
`;

const VCoreInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['vcore', ocid, date],
        queryFn: () => getVCoreData(ocid, date),
        enabled: !!ocid,
    });

    const [corearray, setCoreArray] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        const getCoreArray = (corearray: any) => {
            data?.character_v_core_equipment.forEach((item: any) => {
                if (item.v_core_type === '강화코어') {
                    //강화코어라면 1,2,3,번을 맵에 담음
                    setMasteryCore(
                        item.v_core_skill_1,
                        item.v_core_level,
                        item.slot_level,
                        corearray
                    );
                    setMasteryCore(
                        item.v_core_skill_2,
                        item.v_core_level,
                        item.slot_level,
                        corearray
                    );
                    setMasteryCore(
                        item.v_core_skill_3,
                        item.v_core_level,
                        item.slot_level,
                        corearray
                    );
                } else if (item.v_core_type === '스킬코어') {
                    //강화코어가 아니라면
                    corearray.set(
                        item.v_core_name,
                        item.v_core_level + item.slot_level
                    );
                } else {
                    //특수코어
                    corearray.set(
                        item.v_core_name,
                        item.v_core_level + item.slot_level
                    );
                }
            });

            return corearray;
        };

        if (data && corearray.size === 0) {
            setCoreArray((prevCoreArray) => {
                const newCoreArray = new Map(prevCoreArray);
                return getCoreArray(newCoreArray);
            });
        }
    }, [data]);

    const setMasteryCore = (
        skill: string,
        corelevel: number,
        slotlevel: number,
        corearray: any
    ) => {
        if (corearray.has(skill)) {
            corearray.set(skill, corearray.get(skill) + corelevel + slotlevel);
        } else {
            corearray.set(skill, corelevel + slotlevel);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{'오류가 발생했습니다.' + error}</div>;
    }

    return (
        <Grid>
            {corearray &&
                Array.from(corearray).map(
                    ([key, value]: any, index: number) => (
                        <Inner key={index}>
                            <div>{key && key}</div>
                            <div>{value > 0 && Math.min(value, 60) + 'LV'}</div>
                        </Inner>
                    )
                )}
        </Grid>
    );
};

export default React.memo(VCoreInfo);
