import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMutation, useQueries } from '@tanstack/react-query';
import { getOcidData, getCharacterData } from 'api/Maple';
import moment from 'moment';
import MesoCharacterInfo from 'component/MesoCharacterInfo';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { showAlert } from '../redux/action/index';
import { storeArrayToLocalStorage } from 'component/Storage';
import ModalProfit from 'component/ModalProfit';
import {
    Property,
    defaultProperty,
    PropertyProfit,
    defaultPropertyProfit,
} from 'type/Property';

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
`;

const Nav = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    place-items: right;
    justify-items: end;
    row-gap: 10px;
    font-size: 12px;
`;

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

    @media screen and (max-width: 500px) {
        padding: 2%;
    }
`;

const Input = styled.input`
    width: 100%;
    max-width: 200px;
    border-radius: 8px;

    @media screen and (max-width: 1000px) {
        max-width: 130px;
    }
`;

const Button = styled.button`
    border: 1px solid gray;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
`;

const Section = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media screen and (max-width: 1300px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Message = styled.div`
    color: gray;
    display: flex;
    justify-content: center;
    margin-top: 10%;
    margin-bottom: 10%;
`;

const Inner = styled.div`
    display: flex;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10%;
`;

const LienHeightContainer = styled.div`
    line-height: 30px;
`;

const LienHeightContainer3 = styled.div`
    line-height: 22px;
`;

const NavInner = styled.div`
    margin-left: 12px;
    display: grid;
    grid-template-columns: 1fr;
    max-height: 50px;
    row-gap: 20px;
`;

const ImageContainer = styled.div`
    margin-right: 10px;
`;

interface meso {
    ocid: string; //캐릭터를 식별하기 위한 키
    characterData: any; //등록된 캐릭터의 데이터
    mesoToggle: boolean;
    property: Property;
    meso: number;
    erda: number;
}

const Meso = () => {
    const [day, setDay] = useState<any>(moment().format('YYYY-MM-DD'));
    const [name, setName] = useState<string>('');
    const [mesoArray, setMesoArray] = useState<meso[]>([]);
    const [property, setProperty] = useState<Property>(defaultProperty);
    const [propertyProfit, setPropertyProfit] = useState<PropertyProfit>(
        defaultPropertyProfit
    );
    const [WeeklyMeso, setWeeklyMeso] = useState<number>(0);
    const [WeeklyErda, setWeeklyErda] = useState<number>(0);
    const [profitToggle, setProfitToggle] = useState<boolean>(false);

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
            setMesoArrayFromCharacterData(data, data?.ocid);
        },
    });

    // useEffect에서 localStorage에서 BossArray로 렌더링하기 때문에 BossArray가 렌더링되었을때만 쿼리 실행
    const queryResults: any = useQueries({
        queries:
            mesoArray.length > 0
                ? mesoArray.map((item: any) => ({
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
            mesoArray &&
            Array.isArray(mesoArray) &&
            mesoArray.length > 0
        ) {
            const updatedState = onCharacterStateUpdate(
                queryResults,
                mesoArray
            );
            setMesoArray(updatedState);
            setMesoToLocalStorageToDate(updatedState, day);
        }
    }, [allQueriesSuccessful]); // queryResults 대신 allQueriesSuccessful 사용

    const onCharacterStateUpdate = (queryResults: any, mesoArray: any[]) => {
        //목요일에 최신화를 할 때 캐릭터의 상태를 업데이트함 (레벨 정보, 등등)
        const prevState = mesoArray;
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
        const newMesoArray = getMesoFromLocalStorageToDate(day); //LocalStorage에 저장된 배열을 가져옴

        if (newMesoArray && Array.isArray(newMesoArray)) {
            //배열이라면
            setMesoArray(newMesoArray);
            onWeeklyErdaChange(newMesoArray);
            onWeeklyMesoChange(newMesoArray);
        }
    }, [day]);

    const getMesoFromLocalStorageToDate = (day: string) => {
        const prev = localStorage.getItem('mesoproperty');
        if (prev) {
            const next = JSON.parse(prev);

            // 주어진 day로부터 일주일 전의 날짜 계산
            const givenDate = new Date(day);
            const yesterdayDate = new Date(givenDate);
            yesterdayDate.setDate(givenDate.getDate() - 1); // 하루 전으로 설정

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

            const yesterdayDateString = yesterdayDate
                .toISOString()
                .split('T')[0];

            // 주어진 날짜에 해당하는 데이터 가져오기
            const todayData = next.find((item: any) => item.date === day);

            // 하루 전 날짜에 해당하는 데이터 가져오기
            const yesterdayData = next.find(
                (item: any) => item.date === yesterdayDateString
            );

            if (
                todayData &&
                Array.isArray(todayData?.data) &&
                todayData?.data?.length > 0
            ) {
                //날짜에 맞는 데이터가 있다면 해당 데이터를 리턴
                return todayData.data;
            } else if (
                yesterdayData &&
                Array.isArray(yesterdayData.data) &&
                yesterdayData.data.length > 0
            ) {
                //bossmeso 데이터는 있으나 날짜에 맞는 데이터가 없다면
                const isPrevWeek = window.confirm(
                    '이전 날의 데이터가 존재합니다. 데이터를 가져오시겠습니까?'
                );
                if (isPrevWeek) {
                    const currentData = yesterdayData.data.map((char: any) => ({
                        ...char,
                        property: defaultProperty,
                        meso: 0,
                        erda: 0,
                    }));
                    console.log(currentData);
                    setMesoToLocalStorageToDate(currentData, day);
                    return currentData;
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
                    '이전 날의 데이터가 없습니다. 가장 많은 캐릭터가 저장된 데이터를 불러오시겠습니까?'
                );

                if (usePreviousData) {
                    // 가장 많은 캐릭터 데이터를 불러옴
                    const currentData = largestDataSet.map((char: any) => ({
                        ...char,
                        property: defaultProperty,
                        meso: 0,
                        erda: 0,
                    }));
                    setMesoToLocalStorageToDate(currentData, day);
                    return currentData;
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

    const setMesoArrayFromCharacterData = (
        characterData: any,
        ocid: string
    ) => {
        // 캐릭터 데이터가 유효한 경우에만 BossArray에 추가
        if (characterData && characterData.character_name) {
            const updatedMesoArray =
                mesoArray && Array.isArray(mesoArray) ? [...mesoArray] : []; // 현재 BossArray 복사
            const isOcidExists = updatedMesoArray.some(
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
                updatedMesoArray.push({
                    ocid: ocid,
                    characterData,
                    mesoToggle: false,
                    property: defaultProperty,
                    meso: 0,
                    erda: 0,
                });
                dispatch(showAlert('캐릭터를 등록했습니다!', uuidv4(), 4000));
            }

            const SortedArray = onSortMesoArray(updatedMesoArray);

            // 상태 업데이트
            setMesoArray(SortedArray);
            setMesoToLocalStorageToDate(SortedArray, day);
        } else {
            dispatch(
                showAlert('유효하지 않은 캐릭터 데이터입니다!', uuidv4(), 4000)
            );
            console.error('유효하지 않은 캐릭터 데이터입니다!');
        }
    };

    const setMesoToLocalStorageToDate = (mesoarray: any[], day: string) => {
        if (mesoarray) {
            storeArrayToLocalStorage('mesoproperty', day, mesoarray);
            dispatch(showAlert('데이터가 최신화 되었습니다!', uuidv4(), 4000));
        }
    };

    const onSortMesoArray = (mesoArray: any[]) => {
        const SortedArray = [...mesoArray];
        return SortedArray.sort((a, b) => {
            // level 내림차순으로 정렬
            return (
                (b.characterData?.character_level || 0) -
                (a.characterData?.character_level || 0)
            );
        });
    };

    const setMesoToggle = (ocid: string) => {
        //어느 캐릭터를 클릭했는지를 알아야하기 때문에 ocid를 매개변수로 받음
        const newMesoArray = [...mesoArray]; //불변성을 유지하며 state를 변경하기 위해 복사
        const index = mesoArray.findIndex((item) => item.ocid === ocid);
        const prev = mesoArray[index];
        const next = {
            ...prev,
            mesoToggle: !prev.mesoToggle,
        };
        newMesoArray[index] = next;
        setMesoArray(newMesoArray);
    };

    const onClickCharacterInfo = (characterName: string) => {
        navigate(`/info/${characterName}`);
    };

    const onClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        OcidMutation.mutate(name);
    };

    const onMesoPlus = (ocid: string, property: Property) => {
        const newMesoArray = [...mesoArray];
        const index = mesoArray.findIndex((item) => item.ocid === ocid);
        const prev = mesoArray[index]; //이전 캐릭터의 재화 정보를 가져옴
        const totalmeso = getTotalMeso(property, propertyProfit);
        const next = {
            ...prev,
            property,
            meso: totalmeso,
            erda: property?.erda,
            mesoToggle: !prev.mesoToggle,
        };
        newMesoArray[index] = next;
        setMesoArray(newMesoArray);
        onWeeklyErdaChange(newMesoArray);
        onWeeklyMesoChange(newMesoArray);
        setProperty(defaultProperty); //0으로 초기화
        setMesoToLocalStorageToDate(newMesoArray, day);
        localStorage.setItem('propertyProfit', JSON.stringify(propertyProfit)); //메소 가치를 입력해둔 것을 로컬스토리지에 저장
    };

    const getTotalMeso = (
        property: Property,
        propertyProfit: PropertyProfit
    ) => {
        let totalmeso = 0;

        Object.keys(propertyProfit).forEach((key: string) => {
            //propertyProfit을 기준으로 배열화를 하여 더함
            if (key !== 'erda') {
                //조각은 totalmeso 집계에서 제외함
                totalmeso = totalmeso + property[key] * propertyProfit[key];
            }
        });

        return totalmeso;
    };

    const onCharacterDelete = (ocid: string) => {
        const confirm = window.confirm('데이터를 삭제하시겠습니까?');
        if (confirm) {
            const newMesoArray = mesoArray.filter(
                (item: any) => item.ocid !== ocid
            );
            const SortedArray = onSortMesoArray(newMesoArray);
            setMesoArray(SortedArray);
            onWeeklyErdaChange(SortedArray);
            onWeeklyMesoChange(SortedArray);
            setMesoToLocalStorageToDate(SortedArray, day);
        }
    };

    const onCancle = (ocid: string) => {
        const newMesoArray = [...mesoArray];
        const index = mesoArray.findIndex((item) => item.ocid === ocid);
        const prev = mesoArray[index]; //이전 캐릭터의 재화 정보를 가져옴
        const next = {
            ...prev,
            mesoToggle: !prev.mesoToggle,
        };
        newMesoArray[index] = next;
        setProperty(defaultProperty);
        setMesoArray(newMesoArray);
    };

    const onWeeklyMesoChange = (newMesoArray: any[]) => {
        if (newMesoArray) {
            let meso = 0;
            newMesoArray.forEach((item: any) => {
                meso += item.meso;
            });
            setWeeklyMeso(meso);
        }
    };

    const onWeeklyErdaChange = (newMesoArray: any[]) => {
        if (newMesoArray) {
            let erda = 0;
            newMesoArray.forEach((item: any) => {
                erda += item.erda;
            });
            setWeeklyErda(erda);
        }
    };

    const formatKoreanNumber = (number: number) => {
        const oneEok = 100000000; // 1억
        const tenMillion = 10000000; // 1천만

        // 억 단위
        const eokPart = Math.floor(number / oneEok); // 억 부분
        let remainder = number % oneEok; // 남은 부분

        // 천만 단위
        const tenMillionPart = Math.floor(remainder / tenMillion); // 천만 부분
        remainder = remainder % tenMillion; // 천만 단위 이후 남은 부분

        // 결과 문자열 조합
        let result = '';
        if (eokPart > 0) {
            result += `${eokPart}억 `;
        }
        if (tenMillionPart > 0) {
            result += `${tenMillionPart}천만 `;
        }
        result += `${remainder}`;

        return result.trim(); // 마지막 공백 제거
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
                                onChange={(e: any) => setName(e.target.value)}
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
                                onChange={(e: any) => setDay(e.target.value)}
                            />
                            <Button
                                onClick={() =>
                                    setProfitToggle((prev: any) => !prev)
                                }
                            >
                                수익 조회
                            </Button>
                        </NavInner>
                        <Nav>
                            <Inner>
                                <ImageContainer>
                                    <img
                                        src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                                        width="20px"
                                        alt="메소"
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                </ImageContainer>
                                <LienHeightContainer>
                                    {WeeklyMeso.toLocaleString() + ' 메소'}
                                </LienHeightContainer>
                            </Inner>
                            <Inner>
                                <ImageContainer>
                                    <img
                                        src="image/jogak.PNG"
                                        width="20px"
                                        alt="조각"
                                        style={{ verticalAlign: 'middle' }}
                                    />
                                </ImageContainer>
                                <LienHeightContainer3>{`${WeeklyErda} 조각`}</LienHeightContainer3>
                            </Inner>
                        </Nav>
                    </NavContainer>
                    <Section>
                        {mesoArray &&
                            mesoArray.length > 0 &&
                            mesoArray.map((info: any) => (
                                <MesoCharacterInfo
                                    key={info?.ocid}
                                    ocid={info?.ocid}
                                    mesoArray={mesoArray}
                                    done={info?.done}
                                    mesoToggle={info?.mesoToggle}
                                    setMesoToggle={setMesoToggle}
                                    data={info?.characterData}
                                    onCharacterDelete={onCharacterDelete}
                                    meso={info?.meso}
                                    erda={info?.erda}
                                    onClickCharacterInfo={onClickCharacterInfo}
                                    onMesoPlus={onMesoPlus}
                                    onCancle={onCancle}
                                    formatting={formatKoreanNumber}
                                    property={property}
                                    setProperty={setProperty}
                                    characterProperty={info?.property}
                                    propertyProfit={propertyProfit}
                                    setPropertyProfit={setPropertyProfit}
                                />
                            ))}
                    </Section>
                    {(!mesoArray || mesoArray.length) === 0 && (
                        <Message>아직 등록된 캐릭터가 없습니다.</Message>
                    )}
                    <ModalProfit
                        toggle={profitToggle}
                        setToggle={setProfitToggle}
                    />
                </Back>
            </Background>
        </React.Fragment>
    );
};

export default React.memo(Meso);
