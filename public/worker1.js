self.onmessage = (e) => {
    const {
        starcatch,
        event,
        simulateguard,
        spare,
        discount,
        level,
        start,
        goal,
        result,
        num,
    } = e.data;
    let array = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];

    const rate = (current) => {
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

    const discountmeso = (meso, current) => {
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

    const eventmeso = (meso) => {
        if (event['30%'] || event['샤이닝 스타포스']) {
            return meso - meso * 0.3;
        } else {
            return meso;
        }
    };

    const onDestroyGuard = (meso, current, tmpsimulateguard) => {
        if ((current === 15 || current === 16) && tmpsimulateguard) {
            return meso * 2;
        }

        return meso;
    };

    const destroypercent = (current) => {
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

    const enforce = (per, destroy, starcatch) => {
        const tmp = (Math.random() * 100).toFixed(1); // 난수 생성
        const num = Number(tmp);
        if (starcatch) {
            //스타캐치 한다면 강화확률 * 0.05 증가
            per += per * 0.05;
        }

        if (num <= per) {
            // 난수가 성공확률 이하 일 경우 성공 리턴 === num은 1 ~ 30중 하나일 것
            return 0;
        } else if (num <= per + destroy) {
            //성공이 아닐 경우 파괴 리턴 === 이 경우 num은 31 ~ 100중 하나 일 것
            return 2;
        } else {
            //성공과 파괴 둘 다 아닐 경우 실패 리턴
            return 1;
        }
    };

    const starforcemeso = (current, level, denominater) => {
        return (
            1000 +
            (Math.pow(level, 3) * Math.pow(current + 1, 2.7)) / denominater
        );
    };

    const consume = (current, level) => {
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

    const enforceMeso = (current, tmpsimulateguard) => {
        return Math.floor(
            eventmeso(
                discountmeso(
                    onDestroyGuard(
                        consume(current, level),
                        current,
                        tmpsimulateguard
                    ),
                    current
                )
            )
        );
    };

    const renewalDestoryGuard = (current, simulateguard) => {
        //강화 성공, 실패에 따라 파괴방지 여부를 리턴함
        if (!simulateguard) {
            //파괴방지를 체크하지 않았다면 무조건 false리턴
            return false;
        }
        //파괴방지를 체크했다는 것
        if (current === 15 || current === 16) {
            return true;
        } else {
            return false;
        }
    };

    const simulate = (currents, goal) => {
        // 목표 스타포스까지 시뮬레이터
        let count = 0;
        let success = 0;
        let fail = 0;
        let destroy = destroypercent(currents);
        let destroynum = 0;
        let meso = 0;
        let per = rate(currents);
        let i = 0;
        let chance = 0; //찬스타임 선언
        let tmpsimulateguard = false;
        //한번에 계산 후 setState 호출하기 위한 지역변수 선언

        while (currents < goal) {
            //여기서 찬스타임과 파괴방지 자동화를 포함해야함
            tmpsimulateguard = renewalDestoryGuard(currents, simulateguard);
            if (
                (event['15-16'] || event['샤이닝 스타포스']) &&
                (currents === 5 || currents === 10 || currents === 15)
            ) {
                i = 0; //1516일 경우 무조건 성공
            } else if (chance === 2) {
                //찬스가 2라면 찬스타임이므로 반드시 성공
                i = 0;
            } else {
                i =
                    tmpsimulateguard && (currents === 15 || currents === 16)
                        ? enforce(per, 0, starcatch)
                        : enforce(per, destroy, starcatch); //파괴방지 염두에 둠
            }
            if (i === 0) {
                //성공
                meso = meso + enforceMeso(currents, tmpsimulateguard);
                success = success + 1;
                currents = currents + 1;
                chance = 0; //성공했다면 찬스를 초기화
            } else if (i === 1) {
                //실패
                meso = meso + enforceMeso(currents, tmpsimulateguard);
                fail = fail + 1;
                if (currents > 15 && currents !== 20) {
                    //current
                    currents = currents - 1;
                    chance = chance + 1;
                }
            } else {
                //파괴
                meso = meso + enforceMeso(currents, tmpsimulateguard);
                destroynum = destroynum + 1;
                currents = 12;
                meso = meso + spare; //파괴시 스페어 메소 추가
                chance = 0; //파괴되었을 경우도 찬스를 초기화
            }
            count = count + 1;
            per = rate(currents); //current가 바뀌었으므로 확률 재갱신
            destroy = destroypercent(currents);
        }

        return {
            success: success,
            currentmeso: meso,
            fail: fail,
            destorynum: destroynum,
            reinforcenum: count,
            current: currents,
        };
    };

    const onSimulating = (result, num) => {
        for (let i = 0; i < num; i++) {
            const progress = onProgress(i, num);
            onRetrunProgress(progress, array);
            const next = simulate(start, goal);
            result = onSimulateResultAdd(result, next);
        }

        return result;
    };

    const onProgress = (i, num) => {
        return Math.floor((i / num) * 100);
    };

    const onRetrunProgress = (progress, array) => {
        const index = Math.floor(progress / 10) - 1;
        if (array[index] === false) {
            array[index] = true;
            postMessage(progress);
        }
    };

    const onSimulateResultAdd = (prev, next) => {
        const tmp = { ...prev };

        tmp.currentmeso += next.currentmeso;
        tmp.destorynum += next.destorynum;
        tmp.fail += next.fail;
        tmp.reinforcenum += next.reinforcenum;
        tmp.success += next.success;

        return tmp;
    };

    const simulresult = onSimulating(result, num);
    self.postMessage(simulresult);
};
