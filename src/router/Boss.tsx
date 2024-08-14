import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getOcidData } from 'api/Maple';
import BossCharacterInfo from 'component/BossCharacterInfo';

const Back = styled.div`
    margin: 5% 5% 5% 5%;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 2% 5% 2% 5%;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    gap: 20px;

     @media screen and (max-width: 1200px) {
      grid-template-columns: repeat(6, 1fr);
    }

    @media screen and (max-width: 1000px) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media screen and (max-width: 600px) {
       grid-template-columns: repeat(3, 1fr);
    }
`;

const Button = styled.button`
    border: 1px solid gray;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
`;

const array: any[] = [
    {
        check: false,
        name: '이지 시그너스',
        meso: 5059464,
    },
    {
        check: false,
        name: '하드 힐라',
        meso: 6392127,
    },
    {
        check: false,
        name: '카오스 핑크빈',
        meso: 7305607,
    },
    {
        check: false,
        name: '노말 시그너스',
        meso: 8334633,
    },
    {
        check: false,
        name: '카오스 자쿰',
        meso: 8983579,
    },
    {
        check: false,
        name: '카오스 피에르',
        meso: 9082212,
    },
    {
        check: false,
        name: '카오스 반반',
        meso: 9055409,
    },
    {
        check: false,
        name: '카오스 블러디퀸',
        meso: 9044348,
    },
    {
        check: false,
        name: '카오스 벨룸',
        meso: 11625317,
    },
    {
        check: false,
        name: '하드 매그너스',
        meso: 10688302,
    },
    {
        check: false,
        name: '카오스 파풀라투스',
        meso: 24692607,
    },
    {
        check: false,
        name: '노말 스우',
        meso: 31397803,
    },
    {
        check: false,
        name: '노말 데미안',
        meso: 32856018,
    },
    {
        check: false,
        name: '노말 가디언 엔젤 슬라임',
        meso: 43430893,
    },
    {
        check: false,
        name: '이지 루시드',
        meso: 44480040,
    },
    {
        check: false,
        name: '이지 윌',
        meso: 48271991,
    },
    {
        check: false,
        name: '노말 루시드',
        meso: 53238340,
    },
    {
        check: false,
        name: '노말 윌',
        meso: 61407942,
    },
    {
        check: false,
        name: '노말 더스크',
        meso: 65802229,
    },
    {
        check: false,
        name: '노말 듄켈',
        meso: 70960004,
    },
    {
        check: false,
        name: '하드 데미안',
        meso: 107165492,
    },
    {
        check: false,
        name: '하드 스우',
        meso: 112707970,
    },
    {
        check: false,
        name: '하드 루시드',
        meso: 128478755,
    },
    {
        check: false,
        name: '하드 윌',
        meso: 142163005,
    },
    {
        check: false,
        name: '노말 진 힐라',
        meso: 145210130,
    },
    {
        check: false,
        name: '카오스 가디언 엔젤 슬라임',
        meso: 152450582,
    },
    {
        check: false,
        name: '카오스 더스크',
        meso: 157064123,
    },
    {
        check: false,
        name: '하드 듄켈',
        meso: 168568855,
    },
    {
        check: false,
        name: '하드 진 힐라',
        meso: 190205043,
    },
    {
        check: false,
        name: '노말 선택받은 세렌',
        meso: 219903983,
    },
    {
        check: false,
        name: '하드 선택받은 세렌',
        meso: 304012024,
    },
];

const Boss = () => {
    const [name, setName] = useState<string>('');
    const [BossArray, setBossArray] = useState<any[]>([]);
    const {
        data: ocid,
        refetch,
        isError,
        error,
    } = useQuery({
        queryKey: ['bossocid'], //쿼리키에 변수 종속성을 추가하면 Input창이 변경될 때 마다 자동으로 가져오므로 종속성 추가X
        queryFn: () => getOcidData(name),
        enabled: false,
    });

    useEffect(() => {
        if (ocid) {
            setBossArray((prev) => {
                // ocid 값이 배열 내에 이미 존재하는지 확인
                const isOcidExists = prev.some((item) => item.ocid === ocid);
                if (!isOcidExists) {
                    return [
                        ...prev,
                        {
                            ocid: ocid,
                            bosstoggle: false,
                            meso: 0,
                            boss: array,
                        },
                    ];
                }

                return prev;
            });
        }
    }, [ocid]);

    const setBossToggle = (ocid: string, meso?: number) => {
        //어느 캐릭터를 클릭했는지를 알아야하기 때문에 ocid를 매개변수로 받음
        const newBossArray = [...BossArray]; //불변성을 유지하며 state를 변경하기 위해 복사
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        const next = meso ? {
            ...prev,
            bosstoggle : !prev.bosstoggle,
            meso : meso
        } : {
            ...prev,
            bosstoggle: !prev.bosstoggle,
        };
        newBossArray[index] = next;
        setBossArray(newBossArray);
    };

    const onCancle = (setBossToggle: any) => {
        setBossToggle();
    };

    const onClick = () => {
        refetch();
    };

    const onBossCheckChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        ocid: string
    ) => {
        const { name } = e.target;
        const newBossArray = [...BossArray];
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        const next = {
            ...prev,
            boss: prev?.boss.map((item: any) => {
                if (item.name === name) {
                    //체크한 name과 일치하는 경우 check 상태를 바꿈
                    return {
                        ...item,
                        check: !item.check,
                    };
                } else {
                    return item;
                }
            }),
        };
        newBossArray[index] = next;
        setBossArray(newBossArray);
    };

    const onBossMesoPlus = (
        e: React.MouseEvent<HTMLButtonElement>,
        ocid: string
    ) => {
        const newBossArray = [...BossArray];
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        const mesoarray: number[] = [];
        const count = 12; //결정석 개수는 12개가 한계
        let meso = 0;
        prev?.boss?.forEach((item: any) => {
            if (item.check) {
                mesoarray.push(item.meso);
            }
        });
        mesoarray
            .sort((a, b) => b - a)
            .slice(0, count)
            .forEach((item: any) => {
                meso += item;
            });

        const next = {
            ...prev,
            meso: meso,
        };
        newBossArray[index] = next;
        setBossArray(newBossArray);
        setBossToggle(ocid,meso);
    };

    return (
        <React.Fragment>
            <Back>
                <Head>
                    <input
                        name="character"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    &nbsp;
                    <Button onClick={onClick}>캐릭터 추가</Button>
                </Head>
                <Section>
                    {BossArray.length > 0 &&
                        BossArray.map((info: any) => (
                            <BossCharacterInfo
                                key={info.ocid}
                                ocid={info.ocid}
                                boss={info.boss}
                                done={info.check}
                                bossToggle={info.bosstoggle}
                                meso={info.meso}
                                setBossToggle={setBossToggle}
                                onCancle={onCancle}
                                onCheckChange={onBossCheckChange}
                                onBossMesoPlus={onBossMesoPlus}
                            />
                        ))}
                </Section>
            </Back>
        </React.Fragment>
    );
};

export default React.memo(Boss);
