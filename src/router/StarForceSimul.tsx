import Modal from 'component/Modal';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Loading from 'component/Loading';
import ModalSimul from 'component/ModalSimul';

const StarBack = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const Star = styled.div<{ $row: number }>`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(${(props) => props.$row}, 30px);
    gap: 12px;
    padding-top: 5%;
    font-size: 15px;
`;

const StarBtn = styled.button`
    font-size: 12px;
    border: 1px solid gray;
    border-radius: 8px;
    width: 100px;
    height: 20px;
    backgroud-color: white;
`;

const StarContent = styled.div`
    display: flex;
    justify-content: space-aroud;
    > div {
        font-size: 13px;
    }
`;

const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 5%;
`;

const Progress = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 5%;
    font-size: 19px;
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
    padding: 5% 5% 5% 5%;
`;

const selectlevel = [110, 120, 130, 135, 140, 145, 150, 160, 200, 250];

interface discount {
    [key: string]: boolean;
}

interface event {
    [key: string]: boolean;
}

type simulateresult = {
    success: number;
    currentmeso: number;
    fail: number;
    destorynum: number;
    reinforcenum: number;
    current: number;
};

type simul = {
    done: boolean;
    needmeso: number;
    name: string;
    consumemeso: number;
    key: number;
};

const StarForce = () => {
    const [percentage, setPercentage] = useState<number>(30); //현재 강화 확률
    const [current, setCurrent] = useState<number>(0); //현재 강화수치
    const [meso, setMeso] = useState<number>(0); //소모 메소
    const [currentmeso, setCurrentmeso] = useState<number>(0); //누적 소모 메소
    const [level, setLevel] = useState<number>(110);
    const [starcatch, setStarcatch] = useState<boolean>(false);
    const [discount, setDiscount] = useState<discount>({
        PC방: false,
        MVP실버: false,
        MVP골드: false,
        MVP다이아: false,
    });
    const [event, setEvent] = useState<event>({
        '15-16': false,
        '30%': false,
        '샤이닝 스타포스': false,
    });
    const [spare, setSpare] = useState<number>(0);
    const [reinforcenum, setReinforcenum] = useState<number>(0);
    const [destroy, setDestroy] = useState<number>(0); //파괴확률
    const [destorynum, setDestroynum] = useState<number>(0); //현재까지 터진 횟수
    const [success, setSuccess] = useState<number>(0); //성공 횟수
    const [fail, setFail] = useState<number>(0); //실패 횟수
    const [start, setStart] = useState<number>(0); //시작 스타포스 수치
    const [goal, setGoal] = useState<number>(0); //목표 스타포스 수치
    const [simulateguard, setSimulateGuard] = useState<boolean>(false);
    const [simulatenum, setSimulatenum] = useState<number>(100000);
    const [totalsimulate, setTotalSimulate] = useState<number>(0);
    const [simulatemeso, setSimulatemeso] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(false);
    const [calculating, setCalculating] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [simulstore, setSimulStore] = useState<simul[]>([]); //로컬스토리지 저장소와 관련된 상태
    const [simulstoretoggle, setSimulStoreToggle] = useState<boolean>(false);

    const enforceMeso = (current: number): number => {
        return Math.floor(
            eventmeso(
                discountmeso(
                    onDestroyGuard(consume(current, level), current),
                    current
                )
            )
        );
    };

    const renewal = (current: number, level: number) => {
        //레벨과 강화수치에 따라 소모 메소, 강화 확률, 파괴 확률 초기화
        setPercentage(rate(current));
        setMeso(enforceMeso(current));
        setDestroy(destroypercent(current));
    };

    const rate = (current: number): number => {
        //현재 강화수치에 따라 강화확률 반환
        if (current < 3) {
            return 95 - 5 * current;
        } else if (current < 15) {
            return 100 - 5 * current;
        } else if (current === 22) {
            return 3;
        } else if (current === 23) {
            return 2;
        } else if (current === 24) {
            return 1;
        } else {
            return 30;
        }
    };

    const consume = (current: number, level: number): number => {
        //현재 강화수치와 아이템 레벨에 따라 소모 메소 반환
        if (current < 10) {
            return (1000 + (Math.pow(level, 3) * (current + 1)) / 25) * 0.7;
        } else if (current === 10) {
            return starforcemeso(current, level, 400) * 0.7;
        } else if (current === 11) {
            return starforcemeso(current, level, 270) * 0.7;
        } else if (current === 12) {
            return starforcemeso(current, level, 150) * 0.7;
        } else if (current === 13) {
            return starforcemeso(current, level, 110) * 0.7;
        } else if (current === 14) {
            return starforcemeso(current, level, 75) * 0.7;
        } else {
            return starforcemeso(current, level, 200);
        }
    };

    const onDestroyGuard = (meso: number, current: number): number => {
        if ((current === 15 || current === 16) && simulateguard) {
            return meso * 2;
        }
        return meso;
    };

    const destroypercent = (current: number): number => {
        if (current >= 15 && current <= 17) {
            return 2.1;
        } else if (current >= 18 && current <= 19) {
            return 2.8;
        } else if (current >= 20 && current <= 21) {
            return 7.0;
        } else if (current === 22) {
            return 19.4;
        } else if (current === 23) {
            return 29.4;
        } else if (current === 24) {
            return 39.6;
        } else {
            return 0;
        }
    };

    const discountmeso = (meso: number, current: number): number => {
        if (current > 17) {
            return meso;
        }
        if (discount.MVP다이아) {
            if (discount.PC방) {
                return meso - meso * 0.15;
            } else {
                return meso - meso * 0.1;
            }
        } else if (discount.MVP골드) {
            if (discount.PC방) {
                return meso - meso * 0.1;
            } else {
                return meso - meso * 0.05;
            }
        } else if (discount.MVP실버) {
            if (discount.PC방) {
                return meso - meso * 0.08;
            } else {
                return meso - meso * 0.03;
            }
        } else {
            if (discount.PC방) {
                return meso - meso * 0.05;
            } else {
                return meso;
            }
        }
    };

    const eventmeso = (meso: number): number => {
        if (event['30%'] || event['샤이닝 스타포스']) {
            return meso - meso * 0.3;
        } else {
            return meso;
        }
    };

    const starforcemeso = (
        current: number,
        level: number,
        denominater: number
    ): number => {
        return (
            1000 +
            (Math.pow(level, 3) * Math.pow(current + 1, 2.7)) / denominater
        );
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

    const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        setLevel(+value);
    };

    const onSpareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSpare(+value);
    };

    const onCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setDiscount({
            ...discount,
            [name]: !discount[name],
        });
    };

    const onEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setEvent({
            ...event,
            [name]: !event[name],
        });
    };

    const onGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (Number(value) > 25) {
            window.alert('25이하의 수치를 입력하세요');
            setGoal(0);
            return;
        }
        setGoal(Number(value));
    };

    const onStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setStart(Number(value));
    };

    const onSimulateNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (Number(value) > 100000) {
            window.alert('최대 10만회까지 가능합니다!');
            setSimulatenum(100000);
            return;
        }
        setSimulatenum(Number(value));
    };

    const onSimulate = (num: number) => {
        if (start >= goal) {
            window.alert(
                '목표 강화 수치가 현재 강화 수치보다 낮거나 같습니다. 다시 입력해주세요.'
            );
            setToggle((prev) => !prev);
            return;
        }
        let result: simulateresult = {
            success: 0,
            currentmeso: 0,
            fail: 0,
            destorynum: 0,
            reinforcenum: 0,
            current: goal,
        };

        setCalculating((prev) => !prev);

        const worker = new Worker(`${process.env.PUBLIC_URL}/worker1.js`);

        worker.postMessage({
            starcatch: starcatch,
            event: event,
            simulateguard: simulateguard,
            spare: spare,
            discount: discount,
            level: level,
            start: start,
            goal: goal,
            result: result,
            num: num,
        });

        worker.onmessage = (e) => {
            if (typeof e.data === 'number') {
                setProgress(e.data);
            } else if (typeof e.data === 'object') {
                onSetResult(e.data);
                setProgress(0); //완료되었기 때문에 진행상황 다시 0으로 초기화
                setTotalSimulate(num);
                setToggle((prev) => !prev);
                setCalculating((prev) => !prev);
            }
        };
    };

    const onSetResult = (result: simulateresult) => {
        setSuccess(result.success);
        setCurrentmeso(result.currentmeso);
        setFail(result.fail);
        setDestroynum(result.destorynum);
        setReinforcenum(result.reinforcenum);
        setCurrent(result.current);
    };

    const onAverageMeso = () => {
        //시뮬레이팅 메소 평균
        setSimulatemeso(
            currentmeso === 0 ? 0 : Math.floor(currentmeso / totalsimulate)
        );
    };

    const onInitialize = () => {
        setCurrent(0);
        setCurrentmeso(0);
        setSuccess(0);
        setFail(0);
        setDestroynum(0);
        setSimulatemeso(0);
        setTotalSimulate(0);
        setReinforcenum(0);
    };

    const onAddSimulResult = (data: simul) => {
        //시뮬레이터 결과를 저장함
        const tmp = window.localStorage.getItem('simul'); //스토리지에 저장된 결과를 가져옴
        const tmpkey = window.localStorage.getItem('simulkey');
        let key = 1;
        if (tmpkey) {
            key = Number(JSON.parse(tmpkey));
        }
        if (tmp) {
            //결과가 있다면 parse
            const prev = JSON.parse(tmp); //스토리지에서 가져온 시뮬레이터 결과 정보 === 배열
            if (Array.isArray(prev)) {
                //기존에 가져온 것이 배열이라면
                const newdata = { ...data, key: key };
                const next = [...prev, newdata]; //데이터를 추가한 후
                window.localStorage.setItem('simul', JSON.stringify(next)); //배열 데이터 갱신
                setSimulStore(next);
            }
        } else {
            //결과가 없다면 새로 추가해야함
            const newdata = { ...data, key: key };
            const next = [newdata];
            window.localStorage.setItem('simul', JSON.stringify(next)); //배열 데이터 갱신
            setSimulStore(next);
        }
        window.localStorage.setItem('simulkey', JSON.stringify(++key));
        window.alert('저장되었습니다.');
    };

    const onClickSimulStore = () => {
        const name = window.prompt('저장할 아이템의 이름을 입력해주세요.');
        if (name) {
            if (simulatemeso === 0) {
                window.alert('먼저 스타포스 시뮬레이터를 이용해주세요.');
                return;
            } else if (totalsimulate < 100000) {
                const confirm = window.confirm(
                    '시뮬레이팅 횟수가 10만회보다 작다면 결과가 부정확할 수 있습니다. 결과를 저장하시겠습니까?'
                );
                if (!confirm) {
                    //아니오를 선택한다면 return
                    return;
                }
            }
            const data: simul = {
                done: false,
                needmeso: simulatemeso,
                name: name,
                consumemeso: 0,
                key: 0,
            };
            onAddSimulResult(data);
        }
    };

    const onFetchSimulResult = () => {
        //초기에 스토리지에 저장된 결과를 가져옴
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const data = JSON.parse(tmp);
            if (Array.isArray(data)) {
                //스토리지에 데이터가 존재하며 배열이라면
                setSimulStore(data);
            }
        }
    };

    const onAddSimulateConsumeMeso = (num: number) => {
        const consume = window.prompt('소모 메소를 입력해주세요.');
        if (consume) {
            const check = /^[0-9]{1,100}$/g;
            if (check.test(consume)) {
                //정규식 테스트를 통과한다면 숫자만 입력한 것
                const consumemeso = Number(consume);
                onUpdateSimulateConumeMeso(num, consumemeso);
            } else {
                window.alert('숫자만 입력 가능합니다.');
                return;
            }
        }
    };

    const onNeedMeso = (): number => {
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                let need = 0;
                item.forEach((items) => (need = need + items.needmeso));
                return need;
            }
        }
        return 0;
    };

    const onConsumeMeso = (): number => {
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                let consume = 0;
                item.forEach((items) => {
                    consume = consume + items.consumemeso;
                });
                return consume;
            }
        }
        return 0;
    };

    const onCheckedItem = () : number => {
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                let checked = 0;
                item.forEach((items) => {
                    if(items.done) {
                        checked = checked + 1;
                    }
                });
                return checked;
            }
        }
        return 0;
    }

    const onUnCheckedItem = () : number => {
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                let checked = 0;
                item.forEach((items) => {
                    if(!items.done) {
                        checked = checked + 1;
                    }
                });
                return checked;
            }
        }
        return 0;
    }

    const onUpdateSimulateConumeMeso = (num: number, consumemeso: number) => {
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                const index = item.findIndex((data) => data.key === num);
                if (index !== -1) {
                    //index가 -1이 아니라는 것은 데이터가 있다는 것
                    const newdata = {
                        ...item[index],
                        consumemeso: consumemeso,
                    };
                    const array = item.map((items, indexs) =>
                        index === indexs ? newdata : items
                    );
                    window.localStorage.setItem('simul', JSON.stringify(array));
                    setSimulStore(array);
                }
            }
        }
    };

    const onCheckSimulResult = (num: number) => {
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                const index = item.findIndex((data) => data.key === num);
                if (index !== -1) {
                    //index가 -1이 아니라는 것은 데이터가 있다는 것
                    const newdata = {
                        ...item[index],
                        done: !item[index].done,
                    };
                    const array = item.map((items, indexs) =>
                        index === indexs ? newdata : items
                    );
                    window.localStorage.setItem('simul', JSON.stringify(array));
                    setSimulStore(array);
                }
            }
        }
    };

    const onDeleteSimulResult = (num: number) => {
        const confirm = window.confirm('저장된 정보를 삭제하시겠습니까?');
        if (!confirm) {
            //아니오를 누르면 리턴
            return;
        }
        const tmp = window.localStorage.getItem('simul');
        if (tmp) {
            const item = JSON.parse(tmp);
            if (Array.isArray(item)) {
                const index = item.findIndex((data) => data.key === num);
                if (index !== -1) {
                    const newarray = item.filter((data) => data.key !== num);
                    window.localStorage.setItem(
                        'simul',
                        JSON.stringify(newarray)
                    );
                    setSimulStore(newarray);
                }
            }
        }
    };

    const onClickSimulStoreToggle = () => {
        setSimulStoreToggle((prev) => !prev);
    };

    useEffect(() => {
        renewal(current, level);
        onFetchSimulResult();
    }, []);

    useEffect(() => {
        renewal(current, level);
    }, [current, level, discount, event]);

    useEffect(() => {
        onAverageMeso();
    }, [currentmeso]);

    return (
        <Background>
            <Back>
                {calculating ? (
                    <div>
                        <Loading
                            height="50px"
                            width="50px"
                            marginTop="5%"
                            marginBottom="5%"
                        />
                        <Progress>{progress}%...</Progress>
                    </div>
                ) : (
                    <StarBack>
                        <Star $row={14}>
                            <div>장비 레벨 선택</div>
                            <div>
                                <select value={level} onChange={onSelectChange}>
                                    {selectlevel.map((item) => (
                                        <option value={item} key={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>스페어 가격 입력 : </div>
                            <div>
                                <input
                                    type="text"
                                    value={spare}
                                    onChange={onSpareChange}
                                />
                            </div>
                            <div>현재 강화 수치 : {current}</div>
                            <div>현재 강화 확률 : {percentage}%</div>
                            <div>누적 성공 횟수 : {success}번</div>
                            <div>누적 실패 횟수 : {fail}번</div>
                            <div>현재 파괴 확률 : {destroy}%</div>
                            <div>누적 파괴 횟수 : {destorynum}번</div>
                            <div>할인 체크</div>
                            <div style={{ fontSize: '13px' }}>
                                {Object.keys(discount).map((item, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={discount[item]}
                                            name={item}
                                            onChange={onCheckChange}
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                            <div>스타포스 이벤트</div>
                            <div style={{ fontSize: '13px' }}>
                                {Object.keys(event).map((item, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            checked={event[item]}
                                            name={item}
                                            onChange={onEventChange}
                                        />
                                        {item}
                                    </label>
                                ))}
                            </div>
                            <div>소모 메소 : {comma(meso)}메소</div>
                            <div>
                                누적 소모 메소 : {formatting(currentmeso)}메소
                            </div>
                            <div>누적 강화 횟수 : {reinforcenum}번</div>
                            <StarContent>
                                <StarBtn onClick={onInitialize}>
                                    초기화하기
                                </StarBtn>
                            </StarContent>
                            <div>강화 시뮬레이터</div>
                            <StarContent>
                                <StarBtn
                                    onClick={() => setToggle((prev) => !prev)}
                                >
                                    시뮬레이팅하기
                                </StarBtn>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={starcatch}
                                            onChange={() =>
                                                setStarcatch((prev) => !prev)
                                            }
                                        />
                                    </label>
                                </div>
                                <div>모두 스타캐치</div>
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={simulateguard}
                                            onChange={() =>
                                                setSimulateGuard(
                                                    (prev) => !prev
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                                <div>모두 파괴방지</div>
                            </StarContent>
                            <div>시작 스타포스 수치 : </div>
                            <input
                                type="number"
                                value={start}
                                onChange={onStartChange}
                            />
                            <div>목표 스타포스 수치 : </div>
                            <input
                                type="number"
                                value={goal}
                                onChange={onGoalChange}
                            />
                            <div>누적 시뮬레이팅 횟수 : {totalsimulate}번</div>
                            <div>
                                시뮬레이팅 평균 메소 :{' '}
                                {formatting(simulatemeso)}
                                메소
                            </div>
                            <div>
                                <StarBtn onClick={onClickSimulStore}>
                                    저장하기
                                </StarBtn>
                            </div>
                            <div>
                                <StarBtn onClick={onClickSimulStoreToggle}>
                                    저장 목록 보기
                                </StarBtn>
                            </div>
                        </Star>
                        <Modal toggle={toggle}>
                            <ModalContent>
                                <div>스타포스 시뮬레이터</div>
                            </ModalContent>
                            <ModalContent>
                                <div>시뮬레이팅 횟수 입력 : </div>
                                &nbsp;
                                <input
                                    type="number"
                                    value={simulatenum}
                                    onChange={onSimulateNumChange}
                                />
                            </ModalContent>
                            <ModalContent>
                                <StarBtn
                                    onClick={() => onSimulate(simulatenum)}
                                >
                                    시뮬레이팅하기
                                </StarBtn>
                                &nbsp;
                                <StarBtn
                                    onClick={() => setToggle((prev) => !prev)}
                                >
                                    닫기
                                </StarBtn>
                            </ModalContent>
                        </Modal>
                        <ModalSimul
                            toggle={simulstoretoggle}
                            simulstore={simulstore}
                            onClickSimulStoreToggle={onClickSimulStoreToggle}
                            formatting={formatting}
                            onAddSimulateConsumeMeso={onAddSimulateConsumeMeso}
                            onDeleteSimulResult={onDeleteSimulResult}
                            onCheckSimulResult={onCheckSimulResult}
                            onNeedMeso={onNeedMeso}
                            onConsumeMeso={onConsumeMeso}
                            onCheckedItem={onCheckedItem}
                            onUnCheckedItem={onUnCheckedItem}
                        />
                    </StarBack>
                )}
            </Back>
        </Background>
    );
};

export default React.memo(StarForce);
