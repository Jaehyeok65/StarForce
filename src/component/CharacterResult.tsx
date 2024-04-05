import React from 'react';
import CharacterInfo from './CharacterInfo';
import styled from 'styled-components';
import ItemInfo from './ItemInfo';
import CashItemInfo from './CashItemInfo';
import VCoreInfo from './VCoreInfo';
import HexaCoreInfo from './HexaCoreInfo';
import SymbolInfo from './SymbolInfo';
import LinkInfo from './LinkInfo';
import UnionInfo from './UnionInfo';

const Background = styled.div`
    width: 100%;
    text-align: center;
`;

const Mode = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 10px;

    @media screen and (max-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
`;

export type mode =
    | '정보'
    | '장비'
    | '캐시장비'
    | '5차강화'
    | '6차강화'
    | '심볼'
    | '유니온'
    | '링크스킬';

const Button = styled.button<{ $mode : boolean}>`
    border-radius: 8px;
    border: 1px solid gray;
    background-color: ${(props) => props.$mode ? 'black' : 'white'};
    height: 33px;
    color : ${(props) => props.$mode && 'white'};
`;

const buttonmode: mode[] = [
    '정보',
    '장비',
    '캐시장비',
    '5차강화',
    '6차강화',
    '심볼',
    '유니온',
    '링크스킬',
];

const CharacterResult = ({
    mode,
    setMode,
    setEquipment,
    setEquipmentToggle,
    isError,
    error,
    ocid,
    date
}: {
    mode: mode;
    setMode: React.Dispatch<React.SetStateAction<mode>>;
    setEquipment: React.Dispatch<React.SetStateAction<any>>;
    setEquipmentToggle: React.Dispatch<React.SetStateAction<boolean>>;
    isError: any;
    error: any;
    ocid: string;
    date : string
}) => {
    if (isError) {
        return <div>{'오류가 발생했습니다.' + error}</div>;
    }
    return (
        <Background>
            <Mode>
                {buttonmode.map((item: mode, index: number) => (
                    <Button key={index} onClick={() => setMode(item)} $mode={item === mode}>
                        {item}
                    </Button>
                ))}
            </Mode>
            {mode === '정보' && <CharacterInfo ocid={ocid} date={date} />}
            {mode === '장비' && (
                <ItemInfo
                    ocid={ocid}
                    setEquipment={setEquipment}
                    setEquipmentToggle={setEquipmentToggle}
                    date={date}
                />
            )}
            {mode === '캐시장비' && <CashItemInfo ocid={ocid} date={date} />}
            {mode === '5차강화' && <VCoreInfo ocid={ocid} date={date} />}
            {mode === '6차강화' && <HexaCoreInfo ocid={ocid} date={date}/>}
            {mode === '심볼' && <SymbolInfo ocid={ocid} date={date}/>}
            {mode === '링크스킬' && <LinkInfo ocid={ocid} date={date} />}
            {mode === '유니온' && <UnionInfo ocid={ocid} date={date} />}
        </Background>
    );
};

export default React.memo(CharacterResult);
