import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalProperty from 'component/ModalProperty';
import MesoView from 'component/MesoView';
import ModalBoss from 'component/ModalBoss';
import ModalErda from 'component/ModalErda';
import ModalStorage from 'component/ModalStorage';
import Modal from 'component/Modal';

const Head = styled.div`
    display: flex;
    justify-content: center;
`;

const Nav = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 3%;
`;

const Background = styled.div`
    width: 40%;
    margin: 0 auto;

    @media screen and (max-width: 1067px) {
        width: 60%;
        margin: 0 auto;
    }

    @media screen and (max-width: 867px) {
        width: 80%;
        margin: 0 auto;
    }

    @media screen and (max-width: 667px) {
        width: 100%;
        margin: 0 auto;
    }
`;

const Back = styled.div`
    margin: 5% 5% 5% 5%;
    border: 1px solid gray;
    border-radius: 12px;
    padding: 5% 5% 5% 5%;

    @media screen and (max-width: 767px) {
        padding: 5% 3% 5% 3%;
    }
`;

const DivBtn = styled.div`
    border: 1px solid gray;
    border-radius: 12px;
    padding: 6px;
    cursor: pointer;
    margin-right: 6px;
    font-size: 12px;
`;

const Content = styled.div`
    display: flex;
    justify-content: center;
    margin: 10% 5% 7% 5%;

    > div {
        font-size: 12px;
        display: flex;
        align-items: center;
    }

    @media screen and (max-width: 767px) {
        margin: 7% 2% 7% 2%;
    }
`;

interface Boss {
    check: boolean;
    meso: number;
    name: string;
    num: number;
}

const array: Boss[] = [
    {
        check: false,
        name: '이지 시그너스',
        meso: 5493394,
        num: 0,
    },
    {
        check: false,
        name: '하드 힐라',
        meso: 6936489,
        num: 0,
    },
    {
        check: false,
        name: '카오스 핑크빈',
        meso: 7923110,
        num: 0,
    },
    {
        check: false,
        name: '노말 시그너스',
        meso: 9039130,
        num: 0,
    },
    {
        check: false,
        name: '카오스 자쿰',
        meso: 9741285,
        num: 0,
    },
    {
        check: false,
        name: '카오스 피에르',
        meso: 9838932,
        num: 0,
    },
    {
        check: false,
        name: '카오스 반반',
        meso: 9818154,
        num: 0,
    },
    {
        check: false,
        name: '카오스 블러디퀸',
        meso: 9806780,
        num: 0,
    },
    {
        check: false,
        name: '카오스 벨룸',
        meso: 12590202,
        num: 0,
    },
    {
        check: false,
        name: '하드 매그너스',
        meso: 11579023,
        num: 0,
    },
    {
        check: false,
        name: '카오스 파풀라투스',
        meso: 26725937,
        num: 0,
    },
    {
        check: false,
        name: '노말 스우',
        meso: 33942566,
        num: 0,
    },
    {
        check: false,
        name: '노말 데미안',
        meso: 35517853,
        num: 0,
    },
    {
        check: false,
        name: '노말 가디언 엔젤 슬라임',
        meso: 46935874,
        num: 0,
    },
    {
        check: false,
        name: '이지 루시드',
        meso: 48058319,
        num: 0,
    },
    {
        check: false,
        name: '이지 윌',
        meso: 52139127,
        num: 0,
    },
    {
        check: false,
        name: '노말 루시드',
        meso: 57502626,
        num: 0,
    },
    {
        check: false,
        name: '노말 윌',
        meso: 66311463,
        num: 0,
    },
    {
        check: false,
        name: '노말 더스크',
        meso: 71054562,
        num: 0,
    },
    {
        check: false,
        name: '노말 듄켈',
        meso: 76601412,
        num: 0,
    },
    {
        check: false,
        name: '하드 데미안',
        meso: 112480613,
        num: 0,
    },
    {
        check: false,
        name: '하드 스우',
        meso: 118294192,
        num: 0,
    },
    {
        check: false,
        name: '하드 루시드',
        meso: 131095655,
        num: 0,
    },
    {
        check: false,
        name: '하드 윌',
        meso: 145038483,
        num: 0,
    },
    {
        check: false,
        name: '노말 진 힐라',
        meso: 148112376,
        num: 0,
    },
    {
        check: false,
        name: '카오스 가디언 엔젤 슬라임',
        meso: 155492141,
        num: 0,
    },
    {
        check: false,
        name: '카오스 더스크',
        meso: 160173752,
        num: 0,
    },
    {
        check: false,
        name: '하드 듄켈',
        meso: 168609280,
        num: 0,
    },
    {
        check: false,
        name: '하드 진 힐라',
        meso: 190159452,
        num: 0,
    },
    {
        check: false,
        name: '노말 선택받은 세렌',
        meso: 196904752,
        num: 0,
    },
    {
        check: false,
        name: '하드 선택받은 세렌',
        meso: 267825621,
        num: 0,
    },
];

const Meso = () => {
    const [day, setDay] = useState<Date>(new Date());
    const [property, setProperty] = useState<number>(0); //재획수익
    const [totalproperty, setTotalProperty] = useState<number>(0);
    const [propertynum, setPropertyNum] = useState<number>(0);
    const [propertytoggle, setPropertyToggle] = useState<boolean>(false);
    const [totalpropertytoggle, setTotalPropertyToggle] =
        useState<boolean>(false);
    const [totalbossmeso, setTotalBossMeso] = useState<number>(0);
    const [bossmesonum, setBossMesoNum] = useState<number>(0);
    const [bossmesotoggle, setBossMesoToggle] = useState<boolean>(false);
    const [totalbossmesotoggle, setTotalBossMesoToggle] =
        useState<boolean>(false);
    const [erda, setErda] = useState<number>(0);
    const [totalerda, setTotalErda] = useState<number>(0);
    const [gem, setGem] = useState<number>(0);
    const [totalgem, setTotalGem] = useState<number>(0);
    const [PropertyArray, setPropertyArray] = useState<Array<number>>([]);
    const [BossMesoArray, setBossMesoArray] = useState<Array<number>>([]);
    const [GemArray, setGemArray] = useState<Array<number>>([]);
    const [ErdaArray, setErdaArray] = useState<Array<number>>([]);
    const [reboot, setReboot] = useState<boolean>(false);
    const [boss, setBoss] = useState<Array<Boss>>(array);
    const [update, setUpdate] = useState<boolean>(false);
    const [tmppropertynum, setTmpPropertyNum] = useState<number>(0);
    const [tmpproperty, setTmpProperty] = useState<number>(0);
    const [tmpgem, setTmpGem] = useState<number>(0);
    const [tmperda, setTmpErda] = useState<number>(0);
    const [onload, setOnLoad] = useState<boolean>(false);
    const [erdatoggle, setErdaToggle] = useState<boolean>(false);
    const [erdameso, setErdaMeso] = useState<number>(8000000);
    const [gemmeso, setGemMeso] = useState<number>(1000000);
    const [storage, setStorage] = useState<number>(0);
    const [storagetoggle, setStorageToggle] = useState<boolean>(false);
    const [weeklymeso, setWeeklyMeso] = useState<number>(0);
    const [weeklytoggle, setWeeklyToggle] = useState<boolean>(false);

    useEffect(() => {
        //day가 바뀌면 그에 맞춰 로컬스토리지에서 해당 날짜 데이터를 가져옴
        getDayItem(day.toLocaleDateString('ko-kr'));
    }, [day]);

    useEffect(() => {
        if (!onload) return;
        onStoreProperty(
            day.toLocaleDateString('ko-kr'),
            PropertyArray,
            GemArray,
            ErdaArray,
            totalproperty,
            totalgem,
            totalerda,
            propertynum
        );
    }, [totalproperty]);

    useEffect(() => {
        if (!onload) return;
        onStoreBossMeso(
            day.toLocaleDateString('ko-kr'),
            BossMesoArray,
            bossmesonum,
            totalbossmeso
        );
    }, [totalbossmeso]);

    useEffect(() => {
        setOnLoad(true);

        return () => {
            setOnLoad(false);
        };
    }, []);

    const getDayItem = (day: string) => {
        const tmp = window.localStorage.getItem('meso');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                //배열이라면
                const index = item.findIndex(
                    (items) => Object.keys(items)[0] === day
                );
                if (index !== -1) {
                    //데이터가 있다면 스토리지에서 데이터를 가져옴
                    if (item[index] && item[index][day]) {
                        setBossMesoNum(item[index][day].bossmesonum);
                        setPropertyNum(item[index][day].propertynum);
                        setPropertyArray(item[index][day].propertyarray);
                        setBossMesoArray(item[index][day].bossmesoarray);
                        setTotalBossMeso(item[index][day].totalbossmeso);
                        setTotalProperty(item[index][day].totalproperty);
                        setGemArray(item[index][day].gemarray);
                        setErdaArray(item[index][day].erdaarray);
                        setTotalGem(item[index][day].totalgem);
                        setTotalErda(item[index][day].totalerda);
                        setStorage(item[index][day].storage);
                    }
                } else {
                    //데이터가 없다면 기본값으로 초기화함
                    setBossMesoNum(0);
                    setPropertyNum(0);
                    setPropertyArray([]);
                    setBossMesoArray([]);
                    setTotalBossMeso(0);
                    setTotalProperty(0);
                    setGemArray([]);
                    setErdaArray([]);
                    setTotalErda(0);
                    setTotalGem(0);
                    setStorage(0);
                }
            }
        }
    };

    const onStoreBossMeso = (
        day: string,
        BossMesoArray: number[],
        bossmesonum: number,
        totalbossmeso: number
    ) => {
        const tmp = window.localStorage.getItem('meso');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                const index = item.findIndex(
                    (items) => Object.keys(items)[0] === day
                );
                if (index !== -1) {
                    //해당 날짜에 데이터가 있다면 업데이트
                    const data = item[index][day];
                    const newdata = {
                        [day]: {
                            ...data,
                            bossmesoarray: BossMesoArray,
                            bossmesonum: bossmesonum,
                            totalbossmeso: totalbossmeso,
                        },
                    };
                    const array = item.map((items, indexs) =>
                        index === indexs ? newdata : items
                    );
                    window.localStorage.setItem('meso', JSON.stringify(array));
                } else {
                    //해당 날짜에 데이터가 없다면 추가
                    const data = {
                        [day]: {
                            totalbossmeso: totalbossmeso,
                            bossmesonum: bossmesonum,
                            bossmesoarray: BossMesoArray,
                            totalproperty: totalproperty,
                            propertynum: propertynum,
                            totalgem: totalgem,
                            totalerda: totalerda,
                            propertyarray: PropertyArray,
                            gemarray: GemArray,
                            erdaarray: ErdaArray,
                            storage: storage,
                        },
                    };
                    const array = [...item, data];
                    window.localStorage.setItem('meso', JSON.stringify(array));
                }
            }
        } else {
            //최초 추가
            const first = [
                {
                    [day]: {
                        totalbossmeso: totalbossmeso,
                        bossmesonum: bossmesonum,
                        bossmesoarray: BossMesoArray,
                        totalproperty: totalproperty,
                        propertynum: propertynum,
                        totalgem: totalgem,
                        totalerda: totalerda,
                        propertyarray: PropertyArray,
                        gemarray: GemArray,
                        erdaarray: ErdaArray,
                        storage: storage,
                    },
                },
            ];
            window.localStorage.setItem('meso', JSON.stringify(first));
        }
    };

    const onStoreProperty = (
        day: string,
        PropertyArray: number[],
        GemArray: number[],
        ErdaArray: number[],
        totalproperty: number,
        totalgem: number,
        totalerda: number,
        propertynum: number
    ) => {
        const tmp = window.localStorage.getItem('meso');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                const index = item.findIndex(
                    (items) => Object.keys(items)[0] === day
                );
                if (index !== -1) {
                    //해당 날짜에 데이터가 있다면 업데이트
                    const data = item[index][day];
                    const newdata = {
                        [day]: {
                            ...data,
                            totalproperty: totalproperty,
                            totalgem: totalgem,
                            totalerda: totalerda,
                            propertyarray: PropertyArray,
                            gemarray: GemArray,
                            erdaarray: ErdaArray,
                            propertynum: propertynum,
                            storage: storage,
                        },
                    };
                    const array = item.map((items, indexs) =>
                        index === indexs ? newdata : items
                    );
                    window.localStorage.setItem('meso', JSON.stringify(array));
                } else {
                    //해당 날짜에 데이터가 없다면 추가
                    const data = {
                        [day]: {
                            totalbossmeso: totalbossmeso,
                            bossmesonum: bossmesonum,
                            bossmesoarray: BossMesoArray,
                            totalproperty: totalproperty,
                            propertynum: propertynum,
                            totalgem: totalgem,
                            totalerda: totalerda,
                            propertyarray: PropertyArray,
                            gemarray: GemArray,
                            erdaarray: ErdaArray,
                            storage: storage,
                        },
                    };
                    const array = [...item, data];
                    window.localStorage.setItem('meso', JSON.stringify(array));
                }
            }
        } else {
            //최초 추가
            const first = [
                {
                    [day]: {
                        totalbossmeso: totalbossmeso,
                        bossmesonum: bossmesonum,
                        bossmesoarray: BossMesoArray,
                        totalproperty: totalproperty,
                        propertynum: propertynum,
                        totalgem: totalgem,
                        totalerda: totalerda,
                        propertyarray: PropertyArray,
                        gemarray: GemArray,
                        erdaarray: ErdaArray,
                        storage: storage,
                    },
                },
            ];
            window.localStorage.setItem('meso', JSON.stringify(first));
        }
    };

    const onStore = () => {
        const tmp = window.localStorage.getItem('meso');
        const days = day.toLocaleDateString('ko-kr');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                const index = item.findIndex(
                    (items) => Object.keys(items)[0] === days
                );
                if (index !== -1) {
                    //해당 날짜에 데이터가 있다면 업데이트
                    const data = item[index][days];
                    const newdata = {
                        [days]: {
                            ...data,
                            storage: storage,
                        },
                    };
                    const array = item.map((items, indexs) =>
                        index === indexs ? newdata : items
                    );
                    window.localStorage.setItem('meso', JSON.stringify(array));
                } else {
                    //해당 날짜에 데이터가 없다면 추가
                    const data = {
                        [days]: {
                            totalbossmeso: totalbossmeso,
                            bossmesonum: bossmesonum,
                            bossmesoarray: BossMesoArray,
                            totalproperty: totalproperty,
                            propertynum: propertynum,
                            totalgem: totalgem,
                            totalerda: totalerda,
                            propertyarray: PropertyArray,
                            gemarray: GemArray,
                            erdaarray: ErdaArray,
                            storage: storage,
                        },
                    };
                    const array = [...item, data];
                    window.localStorage.setItem('meso', JSON.stringify(array));
                }
            }
        } else {
            //최초 추가
            const first = [
                {
                    [days]: {
                        totalbossmeso: totalbossmeso,
                        bossmesonum: bossmesonum,
                        bossmesoarray: BossMesoArray,
                        totalproperty: totalproperty,
                        propertynum: propertynum,
                        totalgem: totalgem,
                        totalerda: totalerda,
                        propertyarray: PropertyArray,
                        gemarray: GemArray,
                        erdaarray: ErdaArray,
                        storage: storage,
                    },
                },
            ];
            window.localStorage.setItem('meso', JSON.stringify(first));
        }
        setStorageToggle((prev) => !prev);
    };

    const onPlus = (prev: number): number => {
        return prev + 1;
    };

    const onMinus = (prev: number): number => {
        if (prev - 1 < 0) {
            return 0;
        }
        return prev - 1;
    };

    const formatting = (param: number): string => {
        if (param >= 1000000000000) {
            return `${Math.floor(param / 1000000000000)}조 ${Math.floor(
                (param % 1000000000000) / 100000000
            )}억 ${comma((param % 1000000000000) % 100000000)}`;
        } else if (param >= 100000000) {
            return `${Math.floor(param / 100000000)}억 ${comma(
                param % 100000000
            )}`;
        } else {
            return `${comma(param)}`;
        }
    };

    const comma = (param: number): string => {
        return param.toLocaleString();
    };

    const src1 =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_YvmRV52YvU3lkRTBEfPSpqzDpMB9BShWoA&usqp=CAU';

    const src2 =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgysFgGzGq2i8Nz1-4JSOCttyUHcQjdZ30ig&usqp=CAU';

    const src3 =
        'data:image/jpeg;base64,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';

    const src4 =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVCDD1LSRF16xcdNcurB3C3IKllcBvpewaw&usqp=CAU';

    const src5 =
        'data:image/jpeg;base64,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';

    const src6 =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuo6kAXQaW8WBvl6WVxUJLiXlSICKu7sLx2A&usqp=CAU';

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setDay(new Date(value));
    };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setState: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const { value } = e.target;
        setState(Number(value));
    };

    const onArrayChange = (
        num: number,
        index: number,
        update: boolean,
        prev: number[]
    ): number[] => {
        if (!update) {
            //추가
            return [...prev, num];
        } else {
            return prev.map((item, index1) =>
                index1 === index - 1 ? num : item
            );
        }
    };

    const onPropertyPlus = () => {
        const newPropertyArray = onArrayChange(
            property,
            propertynum,
            update,
            PropertyArray
        );
        const newGemArray = onArrayChange(gem, propertynum, update, GemArray);
        const newErdaArray = onArrayChange(
            erda,
            propertynum,
            update,
            ErdaArray
        );
        setPropertyArray(newPropertyArray);
        setGemArray(newGemArray);
        setErdaArray(newErdaArray);
        setPropertyToggle((prev) => !prev);
        setProperty(0);
        setGem(0);
        setErda(0);
        if (!update) {
            setPropertyNum((prev) => prev + 1);
        }
        onSetTotalProperty(newPropertyArray, newGemArray, newErdaArray);
        setUpdate(false);
    };

    const onTotalPropertyPlus = () => {
        setTotalProperty(tmpproperty);
        setTotalErda(tmperda);
        setTotalGem(tmpgem);
        setPropertyNum(tmppropertynum);
        setPropertyArray([tmpproperty]);
        setErdaArray([tmperda]);
        setGemArray([tmpgem]);
        setUpdate(false);
        setTotalPropertyToggle((prev) => !prev);
        setTmpProperty(0);
        setTmpErda(0);
        setTmpGem(0);
        setTmpPropertyNum(0);
    };

    const onBossMesoPlus = () => {
        let tmp = 0;
        boss.forEach((item) => {
            if (item.check) {
                tmp += item.meso;
            }
        });
        if (reboot) {
            tmp = tmp * 5;
        }
        const newBossMesoArray = onArrayChange(
            tmp,
            bossmesonum,
            update,
            BossMesoArray
        );
        setBossMesoArray(newBossMesoArray);
        onSetBossProperty(newBossMesoArray);
        setBossMesoToggle((prev) => !prev);
        if (!update) {
            setBossMesoNum((prev) => prev + 1);
        }
        setUpdate(false);
    };

    const onTotalBossMesoPlus = () => {
        let tmp = 0;
        let max = 0;
        boss.forEach((item) => {
            if (item.num > 0) {
                tmp += item.meso * item.num;
                max = Math.max(max, item.num);
            }
        });
        if (reboot) {
            tmp = tmp * 5;
        }
        setBossMesoArray([tmp]);
        onSetBossProperty([tmp]);
        setBossMesoNum(max);
        setTotalBossMesoToggle((prev) => !prev);
    };

    const onWeeklyMeso = (day: Date) => {
        const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
        const current = WEEKDAY[day.getDay()];
        const prevday = new Date(day);
        const nextday = new Date(day);
        switch(current) {
            case "일" : {
                prevday.setDate(day.getDate()-3);
                nextday.setDate(day.getDate() + 3);
                break;
            }
            case "월" : {
                prevday.setDate(day.getDate()-4);
                nextday.setDate(day.getDate() + 2);
                break;
            }
            case "화" : {
                prevday.setDate(day.getDate()-5);
                nextday.setDate(day.getDate() + 1);
                break;
            }
            case "수" : {
                prevday.setDate(day.getDate()-6);
                nextday.setDate(day.getDate());
                break;
            }
            case "목" : {
                prevday.setDate(day.getDate());
                nextday.setDate(day.getDate() + 6);
                break;
            }
            case "금" : {
                prevday.setDate(day.getDate()-1);
                nextday.setDate(day.getDate() + 5);
                break;
            }
            case "토" : {
                prevday.setDate(day.getDate()-2);
                nextday.setDate(day.getDate() + 4);
                break;
            }
        }
        const tmp = onSelectMeso(prevday, nextday);
        if(typeof tmp === "number") {
            setWeeklyMeso(tmp);
        }
        setWeeklyToggle((prev) => !prev);
    };

    const onSelectMeso = (prevday: Date, nextday: Date) => {
        const days = new Date(prevday);
        const tmpdays = new Date(prevday); //중복으로 더해지는 것을 막기위한 변수 선언
        let meso = 0;
        const tmp = window.localStorage.getItem('meso');
        if (tmp) {
            //저장된 정보가 있는 경우
            const item = JSON.parse(tmp);
            if (item && Array.isArray(item)) {
                for (
                    let i = 1;
                    i <= nextday.getDate() - prevday.getDate() + 1;
                    i++
                ) {
                    //범위만큼 조회
                    const index = item.findIndex(
                        (items) =>
                            Object.keys(items)[0] === days.toLocaleDateString()
                    );
                    if (index !== -1) {
                        //index가 -1이 아니라면 데이터가 저장되어 있는 것
                        meso =
                            meso +
                            item[index][days.toLocaleDateString('ko-kr')]
                                .totalproperty +
                            item[index][days.toLocaleDateString('ko-kr')]
                                .totalbossmeso;
                    }
                    days.setDate(tmpdays.getDate() + i);
                }
                return meso;
            }
        } else {
            window.alert(
                '저장된 정보가 없습니다. 데이터를 저장한 후 다시 시도해주세요.'
            );
            return;
        }
    };

    const onBossInit = () => {
        const tmp = [...boss];
        tmp.forEach((item) => (item.check = false));
        setBoss(tmp);
    };

    const onSetTotalProperty = (
        PropertyArray: number[],
        GemArray: number[],
        ErdaArray: number[]
    ) => {
        let property = 0;
        let gem = 0;
        let erda = 0;
        PropertyArray.map((item) => (property += item));
        GemArray.map((item) => (gem += item));
        ErdaArray.map((item) => (erda += item));

        setTotalProperty(property + gem * gemmeso + erda * erdameso);
        setTotalGem(gem);
        setTotalErda(erda);
    };

    const onSetBossProperty = (BossMesoArray: number[]) => {
        let bossmeso = 0;
        BossMesoArray.forEach((item) => (bossmeso += item));
        setTotalBossMeso(bossmeso);
    };

    const onPlusClick = (
        setToggle: React.Dispatch<React.SetStateAction<boolean>>,
        onInit: () => void
    ) => {
        setToggle((prev) => !prev);
        onInit();
    };

    const onPropertyInit = () => {
        setProperty(0);
        setGem(0);
        setErda(0);
    };

    const onPropertyUpdate = () => {
        if (propertynum < 1) {
            window.alert('수정할 정보가 없습니다.');
            return;
        }
        setPropertyToggle((prev) => !prev);
        setUpdate((prev) => !prev);
        if (PropertyArray[propertynum - 1]) {
            setProperty(PropertyArray[propertynum - 1]);
            setGem(GemArray[propertynum - 1]);
            setErda(ErdaArray[propertynum - 1]);
        }
    };

    const onBossMesoUpdate = () => {
        if (bossmesonum < 1) {
            window.alert('수정할 정보가 없습니다.');
            return;
        }
        setBossMesoToggle((prev) => !prev);
        setUpdate((prev) => !prev);
    };

    const onCancle = (
        onToggle: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        onToggle((prev) => !prev);
        setUpdate(false);
    };

    const onMinusClick = (
        setNum: React.Dispatch<React.SetStateAction<number>>,
        onMinus: (prev: number) => number,
        setTotal: React.Dispatch<React.SetStateAction<number>>,
        setArray: React.Dispatch<React.SetStateAction<Array<number>>>,
        array: Array<number>,
        num: number
    ) => {
        if (num < 1) return;
        if (num === array.length) {
            setNum(onMinus(num));
            setTotal((prev) => prev - array[num - 1]);
            setArray((prev) =>
                prev.filter((value, index) => index !== num - 1)
            );
        } else {
            setNum(0);
            setTotal(0);
            setArray([]);
        }
    };

    const onPropertyMinusClick = (
        setNum: React.Dispatch<React.SetStateAction<number>>,
        onMinus: (prev: number) => number,
        setTotal: React.Dispatch<React.SetStateAction<number>>,
        setArray: React.Dispatch<React.SetStateAction<Array<number>>>,
        array: Array<number>,
        num: number
    ) => {
        if (num < 1) return;
        if (num === array.length) {
            //일괄입력을 안하고 차례차례 수정했을 경우
            setNum(onMinus(num));
            setTotal(
                (prev) =>
                    prev -
                    (array[num - 1] +
                        GemArray[num - 1] * gemmeso +
                        ErdaArray[num - 1] * erdameso)
            );
            setTotalGem((prev) => prev - GemArray[num - 1]);
            setTotalErda((prev) => prev - ErdaArray[num - 1]);
            setArray((prev) =>
                prev.filter((value, index) => index !== num - 1)
            );
            setGemArray((prev) =>
                prev.filter((value, index) => index !== num - 1)
            );
            setErdaArray((prev) =>
                prev.filter((value, index) => index !== num - 1)
            );
        } else {
            //일괄입력을 했을 경우는 propertynum과 Array의 개수가 일치하지 않음 즉 마이너스 클릭을 했을 경우 0으로 되어야함
            setNum(0);
            setTotal(0);
            setTotalGem(0);
            setTotalErda(0);
            setArray([]);
            setGemArray([]);
            setErdaArray([]);
        }
    };

    const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        const index = boss.findIndex((item) => item.name === name);
        const tmp = [...boss];
        tmp[index].check = !tmp[index].check;
        setBoss(tmp);
    };

    const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (Number(value) < 0) {
            return;
        }
        const index = boss.findIndex((item) => item.name === name);
        const tmp = [...boss];
        tmp[index].num = Number(value);
        setBoss(tmp);
    };

    const onRebootChange = () => {
        setReboot((prev) => !prev);
    };

    return (
        <React.Fragment>
            <Background>
                <Back>
                    <Head>
                        {day.toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </Head>
                    <Nav>
                        <DivBtn onClick={() => onWeeklyMeso(day)}>
                            금주 수익 조회
                        </DivBtn>
                        <input type="date" onChange={onChange} />
                    </Nav>
                    <MesoView
                        src={src1}
                        num={propertynum}
                        name="재물 획득의 비약"
                        total={totalproperty}
                        setNum={setPropertyNum}
                        setToggle={setPropertyToggle}
                        setTotalToggle={setTotalPropertyToggle}
                        onPlusClick={onPlusClick}
                        onMinusClick={onPropertyMinusClick}
                        formatting={formatting}
                        onPlus={onPlus}
                        onMinus={onMinus}
                        array={PropertyArray}
                        setArray={setPropertyArray}
                        setTotal={setTotalProperty}
                        onUpdate={onPropertyUpdate}
                        onInit={onPropertyInit}
                        property={true}
                        setPropertyToggle={setErdaToggle}
                    />
                    <MesoView
                        src={src2}
                        num={bossmesonum}
                        name="주간 보스"
                        total={totalbossmeso}
                        setNum={setBossMesoNum}
                        setToggle={setBossMesoToggle}
                        setTotalToggle={setTotalBossMesoToggle}
                        onPlusClick={onPlusClick}
                        onMinusClick={onMinusClick}
                        formatting={formatting}
                        onPlus={onPlus}
                        onMinus={onMinus}
                        array={BossMesoArray}
                        setArray={setBossMesoArray}
                        setTotal={setTotalBossMeso}
                        onUpdate={onBossMesoUpdate}
                        onInit={onBossInit}
                        property={false}
                        setPropertyToggle={setErdaToggle}
                    />
                    <Content>
                        <div>
                            <img src={src6} width="40px" alt="이미지" />
                            &nbsp; 보유 메소 &nbsp;: &nbsp;
                            {storage && formatting(storage)}{' '}
                            메소&nbsp;&nbsp;&nbsp;
                            <DivBtn
                                onClick={() =>
                                    setStorageToggle((prev) => !prev)
                                }
                            >
                                입력
                            </DivBtn>
                        </div>
                    </Content>
                </Back>
            </Background>
            <ModalProperty
                src1={src1}
                src3={src3}
                src4={src4}
                src5={src5}
                toggle={totalpropertytoggle}
                totalproperty={tmpproperty}
                propertynum={tmppropertynum}
                erda={erda}
                gem={gem}
                property={property}
                totalerda={tmperda}
                totalgem={tmpgem}
                onInputChange={onInputChange}
                setPropertyNum={setTmpPropertyNum}
                setErda={setTmpErda}
                setGem={setTmpGem}
                setProperty={setTmpProperty}
                setToggle={setTotalPropertyToggle}
                formatting={formatting}
                total={true}
                onPropertyPlus={onTotalPropertyPlus}
                onCancle={onCancle}
            />
            <ModalProperty
                src1={src1}
                src3={src3}
                src4={src4}
                src5={src5}
                toggle={propertytoggle}
                totalproperty={totalproperty}
                propertynum={propertynum}
                erda={erda}
                gem={gem}
                property={property}
                totalerda={totalerda}
                totalgem={totalgem}
                onInputChange={onInputChange}
                setPropertyNum={setPropertyNum}
                setErda={setErda}
                setGem={setGem}
                setProperty={setProperty}
                setToggle={setPropertyToggle}
                formatting={formatting}
                total={false}
                onPropertyPlus={onPropertyPlus}
                onCancle={onCancle}
            />
            <ModalBoss
                toggle={bossmesotoggle}
                total={false}
                setToggle={setBossMesoToggle}
                boss={boss}
                reboot={reboot}
                onCheckChange={onCheckChange}
                onRebootChange={onRebootChange}
                onBossMesoPlus={onBossMesoPlus}
                onCancle={onCancle}
            />
            <ModalBoss
                toggle={totalbossmesotoggle}
                total={true}
                setToggle={setTotalBossMesoToggle}
                boss={boss}
                reboot={reboot}
                onCheckChange={onNumberChange}
                onRebootChange={onRebootChange}
                onBossMesoPlus={onTotalBossMesoPlus}
                onCancle={onCancle}
            />
            <ModalErda
                toggle={erdatoggle}
                src4={src4}
                src5={src5}
                erdameso={erdameso}
                gemmeso={gemmeso}
                setErdaMeso={setErdaMeso}
                setGemMeso={setGemMeso}
                onInputChange={onInputChange}
                onCancle={() => setErdaToggle((prev) => !prev)}
                formatting={formatting}
            />
            <ModalStorage
                toggle={storagetoggle}
                src6={src6}
                storagemeso={storage}
                onInputChange={onInputChange}
                onCancle={() => setStorageToggle((prev) => !prev)}
                setStorageMeso={setStorage}
                formatting={formatting}
                onStore={onStore}
            />
            <Modal toggle={weeklytoggle}>
                <Content>
                    <Head>
                        금주의 수익은 {weeklymeso && formatting(weeklymeso)}&nbsp;메소 입니다.&nbsp;
                    </Head>
                    <DivBtn onClick={() => setWeeklyToggle((prev) => !prev)}>
                        닫기
                    </DivBtn>
                </Content>
            </Modal>
        </React.Fragment>
    );
};

export default React.memo(Meso);
