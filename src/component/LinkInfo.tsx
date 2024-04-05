import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLinkData } from 'api/Maple';
import styled from 'styled-components';

const Inner = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 5px;
    justify-content: center;
    font-size: 12px;
    align-items: center;
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

const LinkInfo = ({ ocid, date }: { ocid: string; date: string }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['link', ocid, date],
        queryFn: () => getLinkData(ocid, date),
        enabled: !!ocid,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>{'오류가 발생했습니다.' + error}</div>;
    }

    return (
        <Outer>
            {data && (
                <Inner>
                    <div>
                        <img
                            src={data?.character_owned_link_skill?.skill_icon}
                            alt={data?.character_owned_link_skill?.skill_name}
                        />
                    </div>
                    <div>{data?.character_owned_link_skill?.skill_name}</div>
                    <div>{data?.character_owned_link_skill?.skill_level}</div>
                </Inner>
            )}
            {data &&
                data?.character_link_skill?.map((item: any, index: number) => (
                    <Inner key={index}>
                        <div>
                            <img src={item.skill_icon} alt={item.skill_name} />
                        </div>
                        <div>{item.skill_name}</div>
                        <div>{item.skill_level}</div>
                    </Inner>
                ))}
        </Outer>
    );
};

export default React.memo(LinkInfo);
