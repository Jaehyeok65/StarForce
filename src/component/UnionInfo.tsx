import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUnionData, getUnionRaiderData } from 'api/Maple';
import styled from 'styled-components';

const Title = styled.div`
    display: flex;
    justify-content: center;
    margin: 5% 0% 5% 0%;
    font-weight: bold;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    font-size: 12px;
`;

const Outer = styled.div`
    display: flex;
`;

const UnionInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const {
        data: union,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['union', ocid, date],
        queryFn: () => getUnionData(ocid, date),
        enabled: !!ocid,
    });

    const { data: unionRaider } = useQuery({
        queryKey: ['unionraider', ocid],
        queryFn: () => getUnionRaiderData(ocid, date),
        enabled: !!ocid,
    });

    const [unionStatArray, setUnionStatArray] = useState<Array<any>>([]);
    const [blockArray, setBlockArray] = useState(
        new Array(20).fill(null).map(() => new Array(22).fill(false))
    );

    //console.log(blockArray);

    const setTrueAtPosition = (x: number, y: number, booleanArray: any) => {
        const numRows = 22;
        const numCols = 20;
        const xOffset = Math.floor(numRows / 2); // 배열 가로 중앙 위치
        const yOffset = Math.floor(numCols / 2); // 배열 세로 중앙 위치

        const adjustedX = x + xOffset;
        const adjustedY = y + yOffset;

        if (
            adjustedX >= 0 &&
            adjustedX < numRows &&
            adjustedY >= 0 &&
            adjustedY < numCols
        ) {
            booleanArray[adjustedY][adjustedX] = true;
        }
    };

    const getUnionBlockData = (block: any[], blockArray: any[][]) => {
        if (!block) {
            return;
        }
        const start = {
            x: 11,
            y: 10,
        }; //시작좌표;

        block.forEach((item: any) => {
            setTrueAtPosition(
                Number(item.block_control_point.x),
                Number(item.block_control_point.y),
                blockArray
            );
        });

        return blockArray;
    };

    const setsBlockArray = (
        y: any,
        x: any,
        position: any[],
        blockArray: any[][],
        start: any
    ) => {
        //console.log(y + " " + x + position);
        position.forEach((item: any) => {
            const itemX = Number(y) + Number(item.x) + Number(start.x);
            const itemY = Number(x) + Number(item.y) + Number(start.y);
            //console.log(itemX + " " + itemY);
            if (itemY > 19 || itemY < 0 || itemX > 21 || itemX < 0) {
                return;
            }
            blockArray[itemY][itemX] = true;
        });
    };

    useEffect(() => {
        const getUnionRaiderStat = (data: any[]) => {
            let arrays: any = [];
            let STR = 0;
            let DEX = 0;
            let INT = 0;
            let LUK = 0;
            data?.forEach((item: any) => {
                if (item.split(',').length > 1) {
                    STR += +item.split(' ')[3];
                    DEX += +item.split(' ')[3];
                    LUK += +item.split(' ')[3];
                } else if (item.split(' ')[0] === 'STR') {
                    STR += +item.split(' ')[1];
                } else if (item.split(' ')[0] === 'DEX') {
                    DEX += +item.split(' ')[1];
                } else if (item.split(' ')[0] === 'INT') {
                    INT += +item.split(' ')[1];
                } else if (item.split(' ')[0] === 'LUK') {
                    LUK += +item.split(' ')[1];
                } else {
                    arrays.push(item);
                }
            });
            arrays.push(`LUK ${LUK} 증가`);
            arrays.push(`INT ${INT} 증가`);
            arrays.push(`DEX ${DEX} 증가`);
            arrays.push(`STR ${STR} 증가`);

            return arrays.reverse();
        };

        setUnionStatArray(getUnionRaiderStat(unionRaider?.union_raider_stat));
    }, [unionRaider]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{'오류가 발생했습니다.' + error}</div>;
    }

    return (
        <React.Fragment>
            {union && (
                <Title>
                    {union.union_grade + ' (' + union.union_level + ')'}
                </Title>
            )}
            {unionRaider && <Title>공격대 점령 효과</Title>}
            {unionRaider && (
                <Grid>
                    {unionRaider?.union_occupied_stat.map(
                        (item: any, index: number) => (
                            <div key={index}>{item}</div>
                        )
                    )}
                </Grid>
            )}
            {unionRaider && <Title>공격대원 효과</Title>}
            {unionStatArray && (
                <Grid>
                    {unionStatArray?.map((item: any, index: number) => (
                        <div key={index}>{item}</div>
                    ))}
                </Grid>
            )}
        </React.Fragment>
    );
};

export default React.memo(UnionInfo);
