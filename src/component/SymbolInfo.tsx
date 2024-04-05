import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getSymbolData } from 'api/Maple';
import styled from 'styled-components';

const Inner = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-content: center;
    font-size: 12px;
`;

const Outer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 7% 5% 7% 5%;
    gap: 20px;

    @media screen and (max-width: 567px) {
        margin: 10% 10% 10% 10%;
        grid-template-columns: 1fr;
    }
`;

const SymbolInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['simbol', ocid, date],
        queryFn: () => getSymbolData(ocid, date),
        enabled: !!ocid,
    });

    const getSymbolStat = (item: any) => {
        if (item.symbol_str > 0) {
            return item.symbol_str;
        } else if (item.symbol_dex > 0) {
            return item.symbol_dex;
        } else if (item.symbol_int > 0) {
            return item.symbol_int;
        } else if (item.symbol_luk > 0) {
            return item.symbol_luk;
        }
    };

    const getSymbolGrowth = (item: any) => {
        if (item.symbol_name.split(':')[0].trim() === '아케인심볼') {
            return item.symbol_level === 20
                ? 'MAX'
                : item.symbol_growth_count +
                      ' / ' +
                      item.symbol_require_growth_count;
        } else if (item.symbol_name.split(':')[0].trim() === '어센틱심볼') {
            //어센틱심볼
            return item.symbol_level === 11
                ? 'MAX'
                : item.symbol_growth_count +
                      ' / ' +
                      item.symbol_require_growth_count;
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{'오류가 발생했습니다.' + error}</div>;
    }

    return (
        <Outer>
            {data &&
                data?.symbol.map((item: any, index: number) => (
                    <Inner key={index}>
                        <div>
                            <img
                                src={item.symbol_icon}
                                alt={item.symbol_name}
                            />
                        </div>
                        <div>{item.symbol_name}</div>
                        <div>레벨 : {item.symbol_level}</div>
                        <div>포스 : {item.symbol_force}</div>
                        <div>스텟 : {getSymbolStat(item)}</div>
                        <div>성장 : {getSymbolGrowth(item)}</div>
                    </Inner>
                ))}
        </Outer>
    );
};

export default React.memo(SymbolInfo);
