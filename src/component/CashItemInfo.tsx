import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getCashItemData, getBeautyData, getCharacterData } from 'api/Maple';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    margin: 5% 40% 5% 40%;
    gap: 20px;

    @media screen and (max-width: 567px) {
        grid-template-columns: repeat(1, 1fr);
        margin: 10% 30% 5% 30%;
    }
`;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 20% 90%;
    text-align: left;
    gap: 10px;
    font-size: 12px;
    color: gray;
`;

const Header = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 5%;
    gap: 20px;
`;

const Button = styled.button`
    border-radius: 8px;
    border: 1px solid gray;
    background-color: white;
    height: 33px;
`;

const buttonObject: any = {
    '1번 프리셋': 1,
    '2번 프리셋': 2,
    '3번 프리셋': 3,
};

const beautyObject: any = {
    character_hair: '헤어',
    character_face: '성형',
    character_skin_name: '피부',
};

const CashItemInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const {
        data: cashitem,
        isLoading: cashLoading,
        isError: cashError,
        error: casherror,
    } = useQuery({
        queryKey: ['cashitem', ocid, date],
        queryFn: () => getCashItemData(ocid, date),
        enabled: !!ocid,
    });

    const {
        data: beautyitem,
        isLoading: beautyLoading,
        isError: beautyError,
        error: beautyerror,
    } = useQuery({
        queryKey: ['beautyitem', ocid, date],
        queryFn: () => getBeautyData(ocid, date),
        enabled: !!ocid,
    });

    const { data: info } = useQuery({
        queryKey: ['info', ocid, date],
        queryFn: () => getCharacterData(ocid, date),
        enabled: !!ocid,
    });
    const [preset, setPreset] = useState<1 | 2 | 3>(1);

    if (cashLoading || beautyLoading) {
        return <div>Loading...</div>;
    }

    if (cashError) {
        return <div>{'오류가 발생했습니다. ' + casherror}</div>;
    }

    if (beautyError) {
        return <div>{'오류가 발생했습니다. ' + beautyerror}</div>;
    }

    return (
        <>
            <img
                src={info?.character_image}
                alt={info?.character_name}
                style={{ marginTop: '5%', marginBottom: '1%' }}
            />
            <Header>
                {Object.keys(buttonObject).map((item: any, index: number) => (
                    <Button
                        key={index}
                        onClick={() => setPreset(() => buttonObject[item])}
                    >
                        {item}
                    </Button>
                ))}
            </Header>
            <Grid>
                {beautyitem &&
                    Object.keys(beautyObject).map(
                        (item: any, index: number) => (
                            <Inner key={index}>
                                <div>{beautyObject[item]}</div>
                                {item === 'character_hair' && (
                                    <div>{beautyitem[item].hair_name}</div>
                                )}
                                {item === 'character_face' && (
                                    <div>{beautyitem[item].face_name}</div>
                                )}
                                {item === 'character_skin_name' && (
                                    <div>{beautyitem[item]}</div>
                                )}
                            </Inner>
                        )
                    )}
                {preset === 1 &&
                    cashitem?.cash_item_equipment_preset_1?.map(
                        (item: any, index: number) => (
                            <Inner key={index}>
                                <img
                                    src={item.cash_item_icon}
                                    alt={item.cash_item_equipment_part}
                                />
                                &nbsp;{item.cash_item_name}
                            </Inner>
                        )
                    )}
                {preset === 2 &&
                    cashitem?.cash_item_equipment_preset_2?.map(
                        (item: any, index: number) => (
                            <Inner key={index}>
                                <img
                                    src={item.cash_item_icon}
                                    alt={item.cash_item_equipment_part}
                                />
                                &nbsp;{item.cash_item_name}
                            </Inner>
                        )
                    )}
                {preset === 3 &&
                    cashitem?.cash_item_equipment_preset_3?.map(
                        (item: any, index: number) => (
                            <Inner key={index}>
                                <img
                                    src={item.cash_item_icon}
                                    alt={item.cash_item_equipment_part}
                                />
                                &nbsp;{item.cash_item_name}
                            </Inner>
                        )
                    )}
            </Grid>
        </>
    );
};

export default React.memo(CashItemInfo);
