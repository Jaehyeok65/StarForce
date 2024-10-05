export const storeArrayToLocalStorage = (
    key: string,
    Date: string,
    value: any
) => {
    // 로컬 스토리지에서 기존 데이터를 가져옴
    const prev = localStorage.getItem(key);

    let nextArray = [];

    if (prev) {
        // 로컬 스토리지에 데이터가 이미 있는 경우
        const next = JSON.parse(prev); // next는 Date를 key로 하는 객체 배열
        const prevData = next.find((item: any) => item.date === Date);

        if (prevData) {
            // 만약 데이터가 이미 존재한다면 업데이트
            nextArray = next.map(
                (item: any) =>
                    item.date === Date
                        ? { ...item, data: value } // 데이터 업데이트
                        : item // 기존 데이터 유지
            );
        } else {
            // 데이터가 존재하지 않으면 새롭게 추가
            const newData = { date: Date, data: value };
            nextArray = [...next, newData];
        }
    } else {
        // 로컬 스토리지에 데이터가 없는 경우, 처음 저장
        nextArray = [{ date: Date, data: value }];
    }

    // 최종 배열을 로컬 스토리지에 저장
    localStorage.setItem(key, JSON.stringify(nextArray));
};

export const DateToThursDay = (day: string) => {
    const date = new Date(day);
    const dayOfWeek = date.getDay(); // 요일을 한 번만 가져옵니다.

    switch (dayOfWeek) {
        case 0: // 일요일
            date.setDate(date.getDate() - 3); // 삼일 전
            break;
        case 1: // 월요일
            date.setDate(date.getDate() - 4); // 사일 전
            break;
        case 2: // 화요일
            date.setDate(date.getDate() - 5); // 오일 전
            break;
        case 3: // 수요일
            date.setDate(date.getDate() - 6); // 육일 전
            break;
        case 4: // 목요일
            // 그대로 두기
            break;
        case 5: // 금요일
            date.setDate(date.getDate() - 1); // 하루 전
            break;
        case 6: // 토요일
            date.setDate(date.getDate() - 2); // 이틀 전
            break;
        default:
            break; // 기본적으로 아무것도 하지 않음
    }

    // 원하는 형식으로 반환 (YYYY-MM-DD)
    const formattedDate = date.toISOString().slice(0, 10);
    return formattedDate;
};
