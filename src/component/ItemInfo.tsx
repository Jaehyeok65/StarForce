import React, { useState } from 'react';
import styled from 'styled-components';
import ItemCard from './ItemCard';
import { useQuery } from '@tanstack/react-query';
import { getItemData } from 'api/Maple';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    padding-top: 5%;
    gap: 20px;

    @media screen and (max-width: 567px) {
        grid-template-columns: repeat(1, 1fr);
    }
`;

const Preset = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-top: 5%;
    gap: 20px;
`;

const Button = styled.button<{ $mode: boolean }>`
    border-radius: 8px;
    border: 1px solid gray;
    background-color: ${(props) => (props.$mode ? 'black' : 'white')};
    height: 33px;
    color: ${(props) => props.$mode && 'white'};
`;

const presetButton = [
    { name: '1번 프리셋', index: 1 },
    { name: '2번 프리셋', index: 2 },
    { name: '3번 프리셋', index: 3 },
];

const ItemInfo = ({
    ocid,
    setEquipment,
    setEquipmentToggle,
    date,
}: {
    ocid: string;
    setEquipment: React.Dispatch<React.SetStateAction<any>>;
    setEquipmentToggle: React.Dispatch<React.SetStateAction<boolean>>;
    date: string;
}) => {
    const {
        data: item,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['item', ocid, date],
        queryFn: () => getItemData(ocid, date),
        enabled: !!ocid,
    });

    const [itemPreset, setItemPreset] = useState<number>(1);

    console.log(item && item[`item_equipment_preset_${itemPreset}`]);

    const customSort = (a: any, b: any) => {
        const order: any = {
            무기: 1,
            보조무기: 2,
            엠블렘: 3,
            모자: 4,
            상의: 5,
            하의: 6,
            망토: 7,
            신발: 8,
            장갑: 9,
            어깨장식: 10,
            얼굴장식: 11,
            눈장식: 12,
            귀고리: 13,
            벨트: 14,
            펜던트: 15,
            펜던트2: 16,
            반지4: 17,
            반지3: 18,
            반지2: 19,
            반지1: 20,
            '포켓 아이템': 21,
            뱃지: 22,
            훈장: 23,
            '기계 심장': 24,
        };

        const partA = order[a.item_equipment_slot];
        const partB = order[b.item_equipment_slot];

        return partA - partB;
    };

    const onItemCardClick = (equipment: any) => {
        setEquipment(() => equipment);
        setEquipmentToggle((prev) => !prev);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{'오류가 발생했습니다. ' + error}</div>;
    }

    return (
        <div>
            <Preset>
                {presetButton.map((preset: any) => (
                    <Button
                        key={preset.index}
                        $mode={preset.index === itemPreset}
                        onClick={() => setItemPreset(preset.index)}
                    >
                        {preset.name}
                    </Button>
                ))}
            </Preset>
            <Grid>
                {item &&
                    item[`item_equipment_preset_${itemPreset}`]
                        .sort(customSort)
                        .map((equipment: any, index: number) => (
                            <ItemCard
                                key={index}
                                item={equipment}
                                character_class={item.character_class}
                                onClick={() => onItemCardClick(equipment)}
                            />
                        ))}
            </Grid>
        </div>
    );
};

export default React.memo(ItemInfo);
