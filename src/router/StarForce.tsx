import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'component/Modal';

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
    gap: 20px;
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
`;

const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5%;
    margin-bottom: 5%;
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
    const [chance, setChance] = useState<0 | 1 | 2>(0);
    const [reinforcenum, setReinforcenum] = useState<number>(0);
    const [destroy, setDestroy] = useState<number>(0); //파괴확률
    const [destoryguard, setDestroyGuard] = useState<boolean>(false);
    const [destorynum, setDestroynum] = useState<number>(0); //현재까지 터진 횟수
    const [success, setSuccess] = useState<number>(0); //성공 횟수
    const [fail, setFail] = useState<number>(0); //실패 횟수
    const [goal, setGoal] = useState<number>(0); //목표 스타포스 수치


    const enforce = (per: number, destroy: number): 0 | 1 | 2 => {
        const num = Math.floor(Math.random() * 100) + 1; // 1 ~ 100까지 난수 생성
        if (starcatch) {
            //스타캐치 한다면 강화확률 * 0.05 증가
            per += per * 0.05;
        }
        if (num <= destroy) {
            return 2;
        } else if (num <= per) {
            return 0;
        } else {
            return 1;
        }
    };

    const enforceTry = (per: number) => {
        if (event['15-16'] || event['샤이닝 스타포스']) {
            //이벤트라면
            if (current === 5 || current === 10 || current === 15) {
                if (
                    window.confirm(
                        `${current} -> ${
                            current + 1
                        } 강화 소모메소는 ${meso}메소이며 강화 확률은 100%입니다. 강화하시겠습니까?`
                    )
                ) {
                    window.alert('강화에 성공하셨습니다.');
                    enforceResult(current, 0);
                    return;
                }
            }
        }
        if (chance === 2) {
            if (
                window.confirm(
                    `찬스타임! ${current} -> ${
                        current + 1
                    } 강화 소모메소는 ${meso}메소이며 강화 확률은 100%입니다. 강화하시겠습니까?`
                )
            ) {
                window.alert('강화에 성공하셨습니다.');
                enforceResult(current, 0);
            }
        } else {
            if (
                window.confirm(
                    `${current} -> ${
                        current + 1
                    } 강화 소모메소는 ${meso}메소이며 강화 확률은 ${percentage}%입니다. 강화하시겠습니까?`
                )
            ) {
                const success = enforce(per, destroy);
                if (success === 0) {
                    window.alert('강화에 성공하셨습니다.');
                } else if (success === 1) {
                    window.alert('강화에 실패하셨습니다.');
                } else {
                    window.alert(`장비가 파괴되었습니다.`);
                }
                enforceResult(current, success);
            }
        }
    };

    const enforceResult = (current: number, success: 0 | 1 | 2) => {
        if (success === 0) {
            //성공했을때
            setCurrent((prev) => prev + 1);
            setChance(0);
            setSuccess((prev) => prev + 1);
        } else if (success === 1) {
            //실패했을 때
            if (current > 15 && current !== 20) {
                //15성 이상이며 20성이 아니라면 하락하지 않음
                setCurrent((prev) => prev - 1);
                if (chance === 0) {
                    setChance(1);
                } else if (chance === 1) {
                    setChance(2);
                }
            }
            setFail((prev) => prev + 1);
        } else {
            //파괴됐을때 === 자동복구
            setCurrent(12);
            setChance(0);
            setCurrentmeso((prev) => prev + spare);
            setDestroynum((prev) => prev + 1);
        }
        setCurrentmeso((prev) => prev + meso);
        setReinforcenum((prev) => prev + 1);
        renewalDestoryGuard(current, success);
    };

    const renewal = (current: number, level: number) => {
        //레벨과 강화수치에 따라 소모 메소, 강화 확률, 파괴 확률 초기화
        setPercentage(rate(current));
        setMeso(Math.floor(eventmeso(discountmeso(consume(current, level)))));
        setDestroy(destroypercent(current));
    };

    const renewalDestoryGuard = (current: number, success: 0 | 1 | 2) => {
        //강화 성공, 실패에 따라 파괴방지 초기화
        if (success === 0 && current === 16) {
            //성공했으며 17성을 갔을 경우 == current 갱신 전이므로 16이어야함
            setDestroyGuard(false); //파괴방지 off
        } else if (success === 1 && current === 17) {
            //실패했으며 16성을 갔을 경우 마찬가지로 갱신전이므로 17이어야함
            setDestroyGuard(true);
        } else if (success === 2) {
            //파괴되었을 경우 off
            setDestroyGuard(false);
        }
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
            return 1000 + (Math.pow(level, 3) * (current + 1)) / 25;
        } else if (current === 10) {
            return starforcemeso(current, level, 400);
        } else if (current === 11) {
            return starforcemeso(current, level, 270);
        } else if (current === 12) {
            return starforcemeso(current, level, 150);
        } else if (current === 13) {
            return starforcemeso(current, level, 110);
        } else if (current === 14) {
            return starforcemeso(current, level, 75);
        } else {
            return destoryguard
                ? starforcemeso(current, level, 200) * 2
                : starforcemeso(current, level, 200);
        }
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

    const discountmeso = (meso: number): number => {
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
        if (event['15-16'] || event['샤이닝 스타포스']) {
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

    const simulate = (current: number, goal: number) => {
        // 목표 스타포스까지 시뮬레이터
        let count = 0;
        let success = 0;
        let fail = 0;
        let destroy = 0;
        let destroynum = 0;
        let meso = 0;
        let per = rate(current);
        let i = 0;
        current = current === 22 ? 0 : current;
        //한번에 계산 후 setState 호출하기 위한 지역변수 선언

        while (current < goal) {
            if (
                (event['15-16'] || event['샤이닝 스타포스']) &&
                (current === 5 || current === 10 || current === 15)
            ) {
                i = 0; //1516일 경우 무조건 성공
            } else {
                i = enforce(per, destroy);
            }
            if (i === 0) {
                //성공
                success = success + 1;
                current = current + 1;
            } else if (i === 1) {
                //실패
                fail = fail + 1;
                if (current > 15 && current !== 20) {
                    //current
                    current = current - 1;
                }
            } else {
                //파괴
                destroynum = destroynum + 1;
                current = 12;
                meso = meso + spare; //파괴시 스페어 메소 추가
            }
            count = count + 1;
            per = rate(current); //current가 바뀌었으므로 확률 재갱신
            meso =
                meso +
                Math.floor(eventmeso(discountmeso(consume(current, level))));
            destroy = destroypercent(current);
        }

        setSuccess(success);
        setCurrentmeso(meso);
        setFail(fail);
        setDestroynum(destroynum);
        setReinforcenum(count);
        setCurrent(current);
    };

    const formatting = (param: number): string => {
        return `${Math.floor(param / 100000000)}억 ${comma(param % 100000000)}`;
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

    const onStarCatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStarcatch((prev) => !prev);
    };

    const onDestoryGuardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDestroyGuard((prev) => !prev);
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

    const onSimulate = () => {
        simulate(current, goal);
    };

    useEffect(() => {
        renewal(current, level);
    }, []);

    useEffect(() => {
        renewal(current, level);
    }, [current, level, destoryguard, discount, event]);

    return (
        <StarBack>
            <Star $row={11}>
                <div>장비 레벨 선택</div>
                <div>
                    <select onChange={onSelectChange}>
                        {selectlevel.map((item) => (
                            <option value={item} key={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                </div>
                <div>스페어 가격 입력 : </div>
                <div>
                    <input type="text" value={spare} onChange={onSpareChange} />
                </div>
                <div>현재 강화 수치 : {current}</div>
                <div>현재 강화 확률 : {percentage}%</div>
                <div>누적 성공 횟수 : {success}번</div>
                <div>누적 실패 횟수 : {fail}번</div>
                <div>현재 파괴 확률 : {destroy}%</div>
                <div>누적 파괴 횟수 : {destorynum}번</div>
                <div>할인 체크</div>
                <div>
                    {Object.keys(discount).map((item, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name={item}
                                onChange={onCheckChange}
                            />
                            {item}
                        </label>
                    ))}
                </div>
                <div>스타포스 이벤트</div>
                <div>
                    {Object.keys(event).map((item, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name={item}
                                onChange={onEventChange}
                            />
                            {item}
                        </label>
                    ))}
                </div>
                <div>스타캐치 : </div>
                <div>
                    <label>
                        <input type="checkbox" onChange={onStarCatchChange} />
                    </label>
                </div>
                <div>파괴방지 : </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            onChange={onDestoryGuardChange}
                            disabled={current !== 15 && current !== 16}
                        />
                    </label>
                </div>
                <div>소모 메소 : {comma(meso)}메소</div>
                <div>
                    누적 소모 메소 :{' '}
                    {currentmeso >= 100000000
                        ? formatting(currentmeso)
                        : comma(currentmeso)}
                    메소
                </div>
                <div>누적 강화 횟수 : {reinforcenum}번</div>
                <StarContent>
                    <StarBtn onClick={() => enforceTry(percentage)}>
                        강화하기
                    </StarBtn>
                </StarContent>
                <div>강화 시뮬레이터</div>
                <StarContent>
                    <StarBtn onClick={onSimulate}>시뮬레이팅하기</StarBtn>
                </StarContent>
                <div>목표 스타포스 수치 : </div>
                        <input
                            type="number"
                            value={goal}
                            onChange={onGoalChange}
                        />
            </Star>
        </StarBack>
    );
};

export default React.memo(StarForce);
