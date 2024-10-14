import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQueries } from '@tanstack/react-query';
import { getOcidData, getCharacterData } from 'api/Maple';
import moment from 'moment';
import BossCharacterInfo from 'component/BossCharacterInfo';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { showAlert } from '../redux/action/index';
import { DateToThursDay, storeArrayToLocalStorage } from 'component/Storage';
import { array } from 'util/BossArray';
import ModalBossProfit from 'component/ModalBossProfit';

const Background = styled.div`
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 767px) {
        width: 100%;
        margin: 0 auto;
    }
`;

const ImageContainer = styled.div`
    margin-right: 10px;
`;

const LienHeightContainer = styled.div`
    line-height: 30px;
`;

const LienHeightContainer2 = styled.div`
    line-height: 60px;
`;

const LienHeightContainer3 = styled.div`
    line-height: 22px;
`;
const Back = styled.div`
    margin: 5% 5% 5% 5%;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 2% 5% 2% 5%;

    @media screen and (max-width: 500px) {
        padding: 2%;
    }
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Nav = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    place-items: right;
    justify-items: end;
    row-gap: 10px;
    font-size: 12px;
`;

const NavInner = styled.div`
    margin-left: 12px;
    display: grid;
    grid-template-columns: 1fr;
    max-height: 50px;
    row-gap: 20px;
`;

const Inner = styled.div`
    display: flex;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
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

const Message = styled.div`
    color: gray;
    display: flex;
    justify-content: center;
    margin-top: 10%;
    margin-bottom: 10%;
`;

const Boss = () => {
    const [name, setName] = useState<string>('');
    const [BossArray, setBossArray] = useState<any[]>([]);
    const [day, setDay] = useState<any>(
        DateToThursDay(moment().format('YYYY-MM-DD'))
    );
    const [bossProfitToggle, setBossProfitToggle] = useState<boolean>(false);

    const navigate = useNavigate();

    const dispatch = useDispatch();

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
    const [WeeklyDoneCharacter, setWeeklyDoneCharacter] = useState<number>(0);

    const getBossFromLocalStorageToDate = (day: string) => {
        const prev = localStorage.getItem('bossmeso');
        if (prev) {
            const next = JSON.parse(prev);

            // 주어진 day로부터 일주일 전의 날짜 계산
            const givenDate = new Date(day);
            const previousWeekDate = new Date(givenDate);
            previousWeekDate.setDate(givenDate.getDate() - 7); // 7일 전으로 설정

            // 가장 많은 캐릭터가 저장된 데이터 찾기
            const largestDataSet = next.reduce((prevMax: any, current: any) => {
                if (
                    Array.isArray(current.data) &&
                    current.data.length > prevMax.length
                ) {
                    return current.data;
                }
                return prevMax;
            }, []);

            const previousWeekDateString = previousWeekDate
                .toISOString()
                .split('T')[0];

            // 주어진 날짜에 해당하는 데이터 가져오기
            const todayData = next.find((item: any) => item.date === day);

            // 이전 주 날짜에 해당하는 데이터 가져오기
            const previousWeekData = next.find(
                (item: any) => item.date === previousWeekDateString
            );

            if (
                todayData &&
                Array.isArray(todayData?.data) &&
                todayData?.data?.length > 0
            ) {
                //날짜에 맞는 데이터가 있다면 해당 데이터를 리턴
                return todayData.data;
            } else if (
                previousWeekData &&
                Array.isArray(previousWeekData.data) &&
                previousWeekData.data.length > 0
            ) {
                //bossmeso 데이터는 있으나 날짜에 맞는 데이터가 없다면
                const isPrevWeek = window.confirm(
                    '이전 주의 데이터가 존재합니다. 데이터를 가져오시겠습니까?'
                );
                if (isPrevWeek) {
                    const currentWeekData = previousWeekData.data.map(
                        (char: any) => ({
                            ...char,
                            done: false, // 새로운 날짜에 맞춰 초기화
                        })
                    );
                    setBossToLocalStorageToDate(currentWeekData, day);
                    return currentWeekData;
                } else {
                    return [];
                }
            } else if (
                largestDataSet &&
                Array.isArray(largestDataSet) &&
                largestDataSet.length > 0
            ) {
                // 오늘 날짜와 이전 주 모두 데이터가 없는 경우, 사용자에게 선택권 제공
                const usePreviousData = window.confirm(
                    '가장 많은 캐릭터가 저장된 데이터를 불러오시겠습니까?'
                );

                if (usePreviousData) {
                    // 가장 많은 캐릭터 데이터를 불러옴
                    const currentWeekData = largestDataSet.map((char: any) => ({
                        ...char,
                        done: false, // 새로운 날짜에 맞춰 초기화
                    }));
                    setBossToLocalStorageToDate(currentWeekData, day);
                    return currentWeekData;
                } else {
                    // 빈 배열을 반환하여 새로 등록할 수 있게 함
                    return [];
                }
            } else {
                return [];
            }
        } else {
            return [];
        }
    };

    const setBossToLocalStorageToDate = (bossarray: any[], day: string) => {
        if (bossarray) {
            storeArrayToLocalStorage('bossmeso', day, bossarray);
            dispatch(showAlert('데이터가 최신화 되었습니다!', uuidv4(), 4000));
        }
    };

    // useEffect에서 localStorage에서 BossArray로 렌더링하기 때문에 BossArray가 렌더링되었을때만 쿼리 실행
    const queryResults: any = useQueries({
        queries:
            BossArray.length > 0
                ? BossArray.map((item: any) => ({
                      queryKey: ['characterData', item.ocid],
                      queryFn: () =>
                          getCharacterData(
                              item.ocid,
                              moment().format('YYYY-MM-DD')
                          ),
                      staleTime: 1000 * 60 * 5,
                      cacheTime: 1000 * 60 * 10,
                      retry: 1,
                      refetchOnWindowFocus: false,
                  }))
                : [], // 빈 배열일 경우 쿼리도 빈 배열
    });

    const allQueriesSuccessful = queryResults.every(
        (query: any) => query.isSuccess
    );

    useEffect(() => {
        //로컬스토리지에서 데이터를 업데이트 하는 용도 == 의존성에 allQueriesSuccesful만을 둠
        if (
            allQueriesSuccessful &&
            BossArray &&
            Array.isArray(BossArray) &&
            BossArray.length > 0
        ) {
            const updatedState = onCharacterStateUpdate(
                queryResults,
                BossArray
            );
            setBossArray(updatedState);
            setBossToLocalStorageToDate(updatedState, day);
        }
    }, [allQueriesSuccessful]); // queryResults 대신 allQueriesSuccessful 사용

    const onCharacterStateUpdate = (queryResults: any, BossArray: any[]) => {
        //목요일에 최신화를 할 때 캐릭터의 상태를 업데이트함 (레벨 정보, 등등)
        const prevState = BossArray;
        //console.log(queryResults);
        const nextState = prevState.map((item: any, index: number) => {
            return {
                ...item,
                characterData: queryResults[index]?.data,
            };
        });

        return nextState;
    };

    useEffect(() => {
        const newBossArray = getBossFromLocalStorageToDate(day); //LocalStorage에 저장된 배열을 가져옴
        if (newBossArray && Array.isArray(newBossArray)) {
            //배열이라면
            setBossArray(newBossArray);
            onWeeklyMesoChange(newBossArray);
            onWeeklyCountChange(newBossArray);
            onWeeklyDoneCharacterChange(newBossArray);
        }
    }, [day]);

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

            if (isOcidExists) {
                //캐릭터가 존재하는 경우 알림창을 띄우고 검색창을 초기화
                dispatch(
                    showAlert('이미 등록된 캐릭터입니다!', uuidv4(), 4000)
                );
                setName('');
                return;
            } else if (!isOcidExists) {
                //캐릭터가 추가된 경우에는 어떤 캐릭터를 입력했는지 보여주기 위해 검색창 초기화 생략
                updatedBossArray.push({
                    ocid: ocid,
                    bosstoggle: false,
                    copytoggle: false,
                    meso: 0,
                    boss: array,
                    done: false,
                    characterData,
                });
                dispatch(showAlert('캐릭터를 등록했습니다!', uuidv4(), 4000));
            }

            //기존의 배열을 메소, 레벨 내림차순으로 정렬
            const SortedArray = onSortBossArray(updatedBossArray);
            // 로컬 스토리지에 저장
            //setBossToLocalStorageToDate(SortedArray, day); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장

            // 상태 업데이트
            setBossArray(SortedArray);
        } else {
            dispatch(
                showAlert('유효하지 않은 캐릭터 데이터입니다!', uuidv4(), 4000)
            );
            console.error('유효하지 않은 캐릭터 데이터입니다!');
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

    const onBossClickChange = (ocid: string, clickedBoss: string) => {
        const newBossArray = [...BossArray];
        const index = BossArray.findIndex((item) => item.ocid === ocid);
        const prev = BossArray[index];
        if (onBossOverLapCheck(prev?.boss, clickedBoss)) {
            //true라면 중복 체크
            window.alert('이미 처치한 보스입니다');
            return;
        }
        const next = {
            ...prev,
            boss: prev?.boss.map((item: any) => {
                if (item.name === clickedBoss) {
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

    const onBossOverLapCheck = (bossarray: any[], clickedBoss: string) => {
        //하드보스와 노말보스를 중복으로 처치할 수 없으므로 중복체크를 해야함
        const clickedBossDiffiCulty = clickedBoss?.split(' ')[0]; //클릭된 보스의 난이도
        const clckedBossName = clickedBoss?.split(' ')[1]; //클릭된 보스의 이름
        const newBossArray = bossarray.filter(
            (item: any) => item.check === true
        );
        let flag = false;
        newBossArray.forEach((boss: any) => {
            const BossDiffiCulty = boss?.name?.split(' ')[0];
            const BossName = boss?.name?.split(' ')[1];
            if (
                clckedBossName === BossName &&
                clickedBossDiffiCulty !== BossDiffiCulty
            ) {
                //클릭된 보스와 이미 처치된 보스의 이름이 같으며 난이도가 다르면 true 리턴
                flag = true;
            }
        });
        return flag;
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
        setBossToLocalStorageToDate(SortedArray, day); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        onWeeklyMesoChange(SortedArray);
        onWeeklyCountChange(SortedArray);
        setBossArray(SortedArray);
    };

    const onWeeklyMesoChange = (newBossArray: any[]) => {
        if (newBossArray) {
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
        setBossToLocalStorageToDate(newBossArray, day); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        onWeeklyMesoChange(newBossArray);
        onWeeklyCountChange(newBossArray);
        onWeeklyDoneCharacterChange(newBossArray);
        setBossArray(newBossArray);
    };

    const onWeeklyCountChange = (newBossArray: any[]) => {
        if (newBossArray) {
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

    const onWeeklyDoneCharacterChange = (newBossArray: any[]) => {
        if (newBossArray) {
            let count = 0;
            newBossArray.forEach((item: any) => {
                count += item.done;
            });
            setWeeklyDoneCharacter(count);
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
        setBossToLocalStorageToDate(SortedArray, day); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
        onWeeklyMesoChange(SortedArray);
        onWeeklyCountChange(SortedArray);
        setBossArray(SortedArray);
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
            onWeeklyMesoChange(newBossArray);
            onWeeklyCountChange(newBossArray);
            onWeeklyDoneCharacterChange(newBossArray);
            setBossToLocalStorageToDate(newBossArray, day); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
            setBossArray(newBossArray);
        }
    };

    const onClickCharacterInfo = (characterName: string) => {
        navigate(`/info/${characterName}`);
    };

    const onCharacterDelete = (ocid: string) => {
        const confirm = window.confirm('데이터를 삭제하시겠습니까?');
        if (confirm) {
            const newBossArray = BossArray.filter(
                (item: any) => item.ocid !== ocid
            );
            const SortedArray = onSortBossArray(newBossArray);
            onWeeklyMesoChange(SortedArray);
            onWeeklyCountChange(SortedArray);
            onWeeklyDoneCharacterChange(SortedArray);
            setBossToLocalStorageToDate(SortedArray, day); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
            setBossArray(SortedArray);
        }
    };

    const onDateChange = (e: any) => {
        const { value } = e.target;
        if (value) {
            const newDay = DateToThursDay(value);
            setDay(newDay);
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
                    <NavContainer>
                        <NavInner>
                        <input
                                type="date"
                                value={day}
                                onChange={onDateChange}
                            />
                            <Button onClick={() => setBossProfitToggle((prev : any) => !prev)}>수익 조회</Button>
                            <Button
                                onClick={() =>
                                    onWeeklyBossInitialize(BossArray)
                                }
                            >
                                보스 처치 기록 초기화
                            </Button>
                        </NavInner>
                        <Nav>
                            <Inner>
                                <ImageContainer>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgysFgGzGq2i8Nz1-4JSOCttyUHcQjdZ30ig&usqp=CAU"
                                        width="20px"
                                        alt="결정석"
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                </ImageContainer>
                                <LienHeightContainer>{`${WeeklyCount} / 180 개`}</LienHeightContainer>
                            </Inner>
                            <Inner>
                                <ImageContainer>
                                    <img
                                        src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                                        width="20px"
                                        alt="메소"
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                </ImageContainer>
                                <LienHeightContainer3>
                                    {WeeklyMeso.toLocaleString() + ' 메소'}
                                </LienHeightContainer3>
                            </Inner>
                            <Inner>
                                <ImageContainer>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOkOwhHWNKJYNC60_ErXLGfIHfv-9GjwmRyg&s"
                                        alt="캐릭터"
                                        width="50px"
                                        height="50px"
                                    />
                                </ImageContainer>
                                <LienHeightContainer2>
                                    {BossArray &&
                                        Array.isArray(BossArray) &&
                                        `${WeeklyDoneCharacter} / ${BossArray.length} 캐릭터`}
                                </LienHeightContainer2>
                            </Inner>
                        </Nav>
                    </NavContainer>
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
                                    onBossMesoPlus={onBossMesoPlus}
                                    onBossDoneChange={onBossDoneChange}
                                    data={info?.characterData}
                                    onCharacterDelete={onCharacterDelete}
                                    BossArray={BossArray}
                                    onBossCopy={onBossCopy}
                                    copyToggle={info?.copytoggle}
                                    setCopyToggle={setCopyToggle}
                                    onBossClick={onBossClickChange}
                                    onClickCharacterInfo={onClickCharacterInfo}
                                />
                            ))}
                    </Section>
                    {(!BossArray || BossArray.length) === 0 && (
                        <Message>아직 등록된 캐릭터가 없습니다.</Message>
                    )}
                    <ModalBossProfit toggle={bossProfitToggle} setToggle={setBossProfitToggle}/>
                </Back>
            </Background>
        </React.Fragment>
    );
};

export default React.memo(Boss);
