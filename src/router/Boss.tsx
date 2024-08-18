import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getOcidData, getCharacterData } from 'api/Maple';
import moment from 'moment';
import BossCharacterInfo from 'component/BossCharacterInfo';

const Background = styled.div`
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 767px) {
        width: 100%;
        margin: 0 auto;
    }
`;

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

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5%;
    font-size: 13px;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;

    @media screen and (max-width: 1000px) {
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

const Input = styled.input`
    width: 100%;
    max-width: 200px;
    border-radius: 8px;

    @media screen and (max-width: 1000px) {
        max-width: 130px;
    }
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
        meso: 6390000,
    },
    {
        check: false,
        name: '카오스 핑크빈',
        meso: 7310000,
    },
    {
        check: false,
        name: '노말 시그너스',
        meso: 8330000,
    },
    {
        check: false,
        name: '카오스 자쿰',
        meso: 8980000,
    },
    {
        check: false,
        name: '카오스 피에르',
        meso: 9080000,
    },
    {
        check: false,
        name: '카오스 반반',
        meso: 9060000,
    },
    {
        check: false,
        name: '카오스 블러디퀸',
        meso: 9040000,
    },
    {
        check: false,
        name: '카오스 벨룸',
        meso: 11600000,
    },
    {
        check: false,
        name: '하드 매그너스',
        meso: 10700000,
    },
    {
        check: false,
        name: '카오스 파풀라투스',
        meso: 24700000,
    },
    {
        check: false,
        name: '노말 스우',
        meso: 31400000,
    },
    {
        check: false,
        name: '노말 데미안',
        meso: 32900000,
    },
    {
        check: false,
        name: '노말 가디언 엔젤 슬라임',
        meso: 47800000,
    },
    {
        check: false,
        name: '이지 루시드',
        meso: 49000000,
    },
    {
        check: false,
        name: '이지 윌',
        meso: 53100000,
    },
    {
        check: false,
        name: '노말 루시드',
        meso: 58600000,
    },
    {
        check: false,
        name: '노말 윌',
        meso: 67600000,
    },
    {
        check: false,
        name: '노말 더스크',
        meso: 72400000,
    },
    {
        check: false,
        name: '노말 듄켈',
        meso: 78100000,
    },
    {
        check: false,
        name: '하드 데미안',
        meso: 113000000,
    },
    {
        check: false,
        name: '하드 스우',
        meso: 119000000,
    },
    {
        check: false,
        name: '하드 루시드',
        meso: 135000000,
    },
    {
        check: false,
        name: '하드 윌',
        meso: 165000000,
    },
    {
        check: false,
        name: '노말 진 힐라',
        meso: 153000000,
    },
    {
        check: false,
        name: '카오스 가디언 엔젤 슬라임',
        meso: 161000000,
    },
    {
        check: false,
        name: '카오스 더스크',
        meso: 150000000,
    },
    {
        check: false,
        name: '하드 듄켈',
        meso: 177000000,
    },
    {
        check: false,
        name: '하드 진 힐라',
        meso: 200000000,
    },
    {
        check: false,
        name: '노말 선택받은 세렌',
        meso: 220000000,
    },
    {
        check: false,
        name: '하드 선택받은 세렌',
        meso: 325000000,
    },
];

const Boss = () => {
    const [name, setName] = useState<string>('');
    const [BossArray, setBossArray] = useState<any[]>([]);

    const OcidMutation = useMutation({
        mutationFn: (name: string) => {
            return getOcidData(name);
        },
        onSuccess: (data: string) => {
            CharacterMutation.mutate(data);
        },
    });

    const CharacterMutation = useMutation({
        mutationFn: (ocid: string) => {
            return getCharacterData(ocid, moment().format('YYYY-MM-DD'));
        },
        onSuccess: (data: any) => {
            setBossArrayFromCharacterData(data, data?.ocid);
        },
    });

    const [WeeklyMeso, setWeeklyMeso] = useState<number>(0);
    const [WeeklyCount, setWeeklyCount] = useState<number>(0);

    useEffect(() => {
        const newBossArray = getBossFromLocalStorage(); //LocalStorage에 저장된 배열을 가져옴
        if (newBossArray && newBossArray.length > 0) {
            //배열이 있으며, 데이터가 있다면
            setBossArray(newBossArray);
            onWeeklyBossDateCheck(newBossArray);
        }
        onWeeklyMesoChange(newBossArray);
        onWeeklyCountChange(newBossArray);
    }, []);

    const setBossArrayFromCharacterData = (
        characterData: any,
        ocid: string
    ) => {
        // 캐릭터 데이터가 유효한 경우에만 BossArray에 추가
        if (characterData && characterData.character_name) {
            const updatedBossArray =
                BossArray && Array.isArray(BossArray) ? [...BossArray] : []; // 현재 BossArray 복사
            const isOcidExists = updatedBossArray.some(
                (item) => item.ocid === ocid
            );

            if (!isOcidExists) {
                updatedBossArray.push({
                    ocid: ocid,
                    bosstoggle: false,
                    copytoggle: false,
                    meso: 0,
                    boss: array,
                    done: false,
                    characterData,
                });
            }

            //기존의 배열을 메소, 레벨 내림차순으로 정렬
            const SortedArray = onSortBossArray(updatedBossArray);
            // 로컬 스토리지에 저장
            setBossToLocalStorage(SortedArray);

            // 상태 업데이트
            setBossArray(SortedArray);
        } else {
            window.alert('유효하지 않은 캐릭터 데이터입니다.');
            console.error('유효하지 않은 캐릭터 데이터입니다.');
        }
    };

    const setBossToggle = (ocid: string, meso?: number) => {
        //어느 캐릭터를 클릭했는지를 알아야하기 때문에 ocid를 매개변수로 받음
        const newBossArray = [...BossArray]; //불변성을 유지하며 state를 변경하기 위해 복사
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        const next = meso
            ? {
                  ...prev,
                  bosstoggle: !prev.bosstoggle,
                  meso: meso,
              }
            : {
                  ...prev,
                  bosstoggle: !prev.bosstoggle,
              };
        newBossArray[index] = next;
        setBossArray(newBossArray);
    };

    const setCopyToggle = (ocid: string) => {
        //어느 캐릭터를 클릭했는지를 알아야하기 때문에 ocid를 매개변수로 받음
        const newBossArray = [...BossArray]; //불변성을 유지하며 state를 변경하기 위해 복사
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        const next = {
            ...prev,
            copytoggle: !prev.copytoggle,
        };
        newBossArray[index] = next;
        setBossArray(newBossArray);
    };

    const onCancle = (setBossToggle: any) => {
        setBossToggle();
    };

    const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        OcidMutation.mutate(name);
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
        setBossToLocalStorage(newBossArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        setBossArray(newBossArray);
    };

    const setBossToLocalStorage = (bossarray: any[]) => {
        if (bossarray) {
            localStorage.setItem('bossarray', JSON.stringify(bossarray));
        }
    };

    const getBossFromLocalStorage = () => {
        const prev = localStorage.getItem('bossarray');
        if (prev) {
            const next = JSON.parse(prev);
            return next;
        }
    };

    const onSortBossArray = (bossArray: any[]) => {
        const SortedArray = [...bossArray];
        return SortedArray.sort((a, b) => {
            // meso를 내림차순으로 정렬
            if (b.meso !== a.meso) {
                return b.meso - a.meso;
            }

            // meso가 같을 경우, level을 내림차순으로 정렬
            return (
                (b.characterData?.character_level || 0) -
                (a.characterData?.character_level || 0)
            );
        });
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
            bosstoggle: false,
        };
        newBossArray[index] = next;
        const SortedArray = onSortBossArray(newBossArray); //meso가 변경되면 정렬을 해야함
        setBossToLocalStorage(SortedArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        onWeeklyMesoChange(SortedArray);
        onWeeklyCountChange(SortedArray);
        setBossArray(SortedArray);
    };

    const onWeeklyMesoChange = (newBossArray: any[]) => {
        if (newBossArray && newBossArray.length > 0) {
            let meso = 0;
            newBossArray.forEach((item: any) => {
                if (item.done) {
                    meso += item.meso;
                }
            });
            setWeeklyMeso(meso);
        }
    };

    const onBossDoneChange = (ocid: string) => {
        const newBossArray = [...BossArray];
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        const next = {
            ...prev,
            done: !prev.done,
        };
        newBossArray[index] = next;
        setBossToLocalStorage(newBossArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        onWeeklyMesoChange(newBossArray);
        onWeeklyCountChange(newBossArray);
        setBossArray(newBossArray);
    };

    const onWeeklyCountChange = (newBossArray: any[]) => {
        if (newBossArray && newBossArray.length > 0) {
            let count = 0; // 리턴할 총 개수
            newBossArray.forEach((item: any) => {
                if (item.done) {
                    let innercount = 0; //체크된 보스 카운트용
                    item?.boss?.forEach((bossitem: any) => {
                        if (bossitem.check) {
                            innercount++;
                        }
                    });
                    if (innercount > 12) {
                        count += 12;
                    } else {
                        count += innercount;
                    }
                }
            });
            setWeeklyCount(count);
        }
    };

    const onBossCopy = (copyocid: string, copyedocid: string) => {
        const newBossArray = [...BossArray];
        const copyindex = BossArray.findIndex((item) => item.ocid === copyocid); //복사할 캐릭터의 ocid를 선택
        const copyprev = BossArray[copyindex]; //복사할 캐릭터의 이전 상태

        const copyedindex = BossArray.findIndex(
            (item) => item.ocid === copyedocid
        ); //복사될 캐릭터의 ocid를 선택
        const copyedprev = BossArray[copyedindex]; //복사될 캐릭터의 이전 상태

        const copynext = {
            //이전 상태를 복사하며 meso와 boss만 변경
            ...copyprev,
            meso: copyedprev?.meso,
            boss: copyedprev?.boss,
            copytoggle: false,
        }; //복사할 캐릭터의 다음 상태

        newBossArray[copyindex] = copynext;
        const SortedArray = onSortBossArray(newBossArray); //meso가 변경되면 정렬을 해야함
        setBossToLocalStorage(SortedArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        onWeeklyMesoChange(SortedArray);
        onWeeklyCountChange(SortedArray);
        setBossArray(SortedArray);
    };

    const getStartOfWeek = (date: any) => {
        // 주의 시작일을 목요일로 설정
        const day = date.getDay();
        const diff = day >= 4 ? day - 4 : day + 3; // 목요일 기준으로 이동
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - diff);
        return startOfWeek;
    };

    const onWeeklyBossDateCheck = (BossArray: any[]) => {
        const prevDateString = localStorage.getItem('bossDate');
        const currentDate = new Date('2024-08-22T00:00:00Z');
        const currentStartOfWeek = getStartOfWeek(currentDate);

        if (!prevDateString) {
            // 이전 날짜가 없으면 현재 주의 목요일을 로컬 스토리지에 저장
            localStorage.setItem('bossDate', currentStartOfWeek.toISOString());
            return;
        }

        const prevDate = new Date(prevDateString);
        const prevStartOfWeek = getStartOfWeek(prevDate);

        // 현재 주와 이전 주의 목요일을 비교
        if (currentStartOfWeek > prevStartOfWeek) {
            // 새 주가 시작된 경우 주간 초기화 로직 호출
            onWeeklyBossInitialize(BossArray);

            // 초기화 후 현재 주의 목요일을 로컬 스토리지에 저장
            localStorage.setItem('bossDate', currentStartOfWeek.toISOString());
        }
    };
    const onWeeklyBossInitialize = (BossArray: any[]) => {
        //주간보스를 초기화해야하므로 boss의 check를 초기화 및 done을 초기화
        if (BossArray && BossArray.length > 0) {
            const newBossArray = BossArray.map((item: any) => {
                return {
                    ...item,
                    done: false,
                };
            });
            setBossToLocalStorage(newBossArray);
            setBossArray(newBossArray);
        }
    };

    const onCharacterDelete = (ocid: string) => {
        const confirm = window.confirm('데이터를 삭제하시겠습니까?');
        if (confirm) {
            const newBossArray = BossArray.filter(
                (item: any) => item.ocid !== ocid
            );
            const SortedArray = onSortBossArray(newBossArray);
            setBossToLocalStorage(SortedArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
            setBossArray(SortedArray);
            onWeeklyMesoChange(SortedArray);
            onWeeklyCountChange(SortedArray);
        }
    };

    return (
        <React.Fragment>
            <Background>
                <Back>
                    <form onSubmit={onClick}>
                        <Head>
                            <Input
                                name="character"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            &nbsp;
                            <Button>캐릭터 추가</Button>
                        </Head>
                    </form>
                    <Nav>
                        <div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgysFgGzGq2i8Nz1-4JSOCttyUHcQjdZ30ig&usqp=CAU"
                                width="20px"
                                alt="결정석"
                                style={{ verticalAlign: 'middle' }}
                            />
                            &nbsp;
                            {`${WeeklyCount} / 180개`}
                        </div>
                        <div>
                            <img
                                src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                                width="20px"
                                alt="메소"
                                style={{ verticalAlign: 'middle' }}
                            />
                            &nbsp;
                            {WeeklyMeso.toLocaleString() + ' 메소'}
                        </div>
                    </Nav>
                    <Section>
                        {BossArray &&
                            BossArray.length > 0 &&
                            BossArray.map((info: any) => (
                                <BossCharacterInfo
                                    key={info?.ocid}
                                    ocid={info?.ocid}
                                    boss={info?.boss}
                                    done={info?.done}
                                    bossToggle={info?.bosstoggle}
                                    meso={info?.meso}
                                    setBossToggle={setBossToggle}
                                    onCancle={onCancle}
                                    onCheckChange={onBossCheckChange}
                                    onBossMesoPlus={onBossMesoPlus}
                                    onBossDoneChange={onBossDoneChange}
                                    data={info?.characterData}
                                    onCharacterDelete={onCharacterDelete}
                                    BossArray={BossArray}
                                    onBossCopy={onBossCopy}
                                    copyToggle={info?.copytoggle}
                                    setCopyToggle={setCopyToggle}
                                />
                            ))}
                    </Section>
                </Back>
            </Background>
        </React.Fragment>
    );
};

export default React.memo(Boss);
