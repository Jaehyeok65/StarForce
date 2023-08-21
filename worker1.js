self.onmessage = e => {
    const { starcatch, event, simulateguard, spare, destoryguard, discount, level, start, goal, result, num } = e.data;
    let array = [false,false,false,false,false,false,false,false,false,false];

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

    const onDestroyGuard = (
      meso,
      current,
      simulate
    ) => {
      if (simulate) {
        if ((current === 15 || current === 16) && simulateguard) {
          return meso * 2;
        }
      } else {
        if ((current === 15 || current === 16) && destoryguard) {
          return meso * 2;
        }
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
      const num = Math.floor(Math.random() * 100) + 1; // 1 ~ 100까지 난수 생성
      if (starcatch) {
        //스타캐치 한다면 강화확률 * 0.05 증가
        per += per * 0.05;
      }

      if (destroy < per) {
        //파괴 확률이 성공 확률보다 적을 때
        if (num <= destroy) {
          return 2;
        } else if (num <= per) {
          return 0;
        } else {
          return 1;
        }
      } else {
        //성공 확률이 파괴 확률보다 적을 때
        if (num <= per) {
          return 0;
        } else if (num <= destroy) {
          return 2;
        } else {
          return 1;
        }
      }
    };

    const starforcemeso = (
      current,
      level,
      denominater
    ) => {
      return (
        1000 +
        (Math.pow(level, 3) * Math.pow(current + 1, 2.7)) / denominater
      );
    };

    const consume = (current, level) => {
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
        return starforcemeso(current, level, 200);
      }
    };

    const enforceMeso = (current, simulate) => {
      return Math.floor(
        eventmeso(
          discountmeso(
            onDestroyGuard(consume(current, level), current, simulate),
            current
          )
        )
      );
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
      //currents = currents === start ? 0 : currents;
      //한번에 계산 후 setState 호출하기 위한 지역변수 선언

      while (currents < goal) {
        if (
          (event['15-16'] || event['샤이닝 스타포스']) &&
          (currents === 5 || currents === 10 || currents === 15)
        ) {
          i = 0; //1516일 경우 무조건 성공
        } else {
          i =
            simulateguard && (currents === 15 || currents === 16)
              ? enforce(per, 0, starcatch)
              : enforce(per, destroy, starcatch); //파괴방지 염두에 둠
        }
        if (i === 0) {
          //성공
          success = success + 1;
          currents = currents + 1;
        } else if (i === 1) {
          //실패
          fail = fail + 1;
          if (currents > 15 && currents !== 20) {
            //current
            currents = currents - 1;
          }
        } else {
          //파괴
          destroynum = destroynum + 1;
          currents = 12;
          meso = meso + spare; //파괴시 스페어 메소 추가
        }
        count = count + 1;
        per = rate(currents); //current가 바뀌었으므로 확률 재갱신
        meso = meso + enforceMeso(currents, true);
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
        const progress = onProgress(i,num);
        onRetrunProgress(progress, array);
        const next = simulate(start, goal);
        result = onSimulateResultAdd(result, next);
      }

      return result;
    };

    const onProgress = (i, num) => {
      return Math.floor(((i / num) * 100));
    };

    const onRetrunProgress = (progress, array) => {
      const index = Math.floor((progress / 10)) - 1;
      if(array[index] === false) {
        array[index] = true;
        postMessage(progress);
      }
    }


    const onSimulateResultAdd = (
      prev,
      next
    ) => {
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