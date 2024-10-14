import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
    font-size: 12px;
    margin-bottom: 5%;
    margin-left: 10%;
    margin-right: 10%;
`;

const ModalHead = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
    font-size: 15px;
`;

const ModalNav = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10%;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
`;

const ModalInner = styled.div`
    margin-bottom: 5%;
`;

const Button = styled.button`
    border: 1px solid gray;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
`;

interface ModalPropertyProps {
    toggle: boolean;
    setToggle : any;
}

const ModalProfit: React.FC<ModalPropertyProps> = ({ toggle, setToggle }) => {
    const [beforeDate, setBeforeDate] = useState<any>();
    const [afterDate, setAfterDate] = useState<any>();
    const [profit, setProfit] = useState<any>(null);

    useEffect(() => {
        if (beforeDate && afterDate) {
            const message = getProfitFromLocalStorage(beforeDate, afterDate);
            setProfit(message);
            console.log(message);
        }
    }, [beforeDate, afterDate]);

    const getProfitFromLocalStorage = (beforeDate: any, afterDate: any) => {
        const prev = localStorage.getItem('mesoproperty');
        if (!prev) {
            //mesopropety 자체가 없다면 리턴
            window.alert('해당 기간 동안 저장된 데이터가 없습니다!');
            return null;
        } else {
            //mesoproperty가 있다면 저장된 데이터가 있다는 뜻
            const next = JSON.parse(prev);
            const data = next.filter((item: any) => {
                const itemDate = item.date;
                return itemDate >= beforeDate && itemDate <= afterDate;
            });
            if (data && Array.isArray(data) && data.length > 0) {
                //데이터가 있다면 기록을 조회해야함
                let meso = 0;
                let erda = 0;
                data.forEach((item: any) => {
                    item.data.forEach((inner: any) => {
                        meso += inner.meso;
                        erda += inner.erda;
                    });
                });

                return {
                    meso,
                    erda,
                };
            } else {
                window.alert('해당 기간 동안 저장된 데이터가 없습니다!');
                return null;
            }
        }
    };

    const onBeforeDateChange = (e: any) => {
        const { value } = e.target;
        if (value > afterDate) {
            return;
        }
        setBeforeDate(value);
    };

    const onAfterDateChange = (e: any) => {
        const { value } = e.target;
        if (value < beforeDate) {
            return;
        }
        setAfterDate(value);
    };

    const onCancle = () => {
        setBeforeDate(null);
        setAfterDate(null);
        setProfit(null);
        setToggle((prev: any) => !prev);
    };

    return (
        <Modal toggle={toggle}>
            <ModalHead>수익을 조회할 기간을 선택해주세요.</ModalHead>
            <ModalNav>
                <input
                    type="date"
                    value={beforeDate}
                    onChange={onBeforeDateChange}
                />
                &nbsp;~&nbsp;
                <input
                    type="date"
                    value={afterDate}
                    onChange={onAfterDateChange}
                />
            </ModalNav>
            <ModalContent>
                {profit ? (
                    <div>
                        <ModalInner>
                            해당 기간 동안 획득한 메소는{' '}
                            <img
                                src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                                width="20px"
                                alt="메소"
                                style={{ verticalAlign: 'middle' }}
                            />{' '}
                            {profit.meso.toLocaleString()} 메소이며
                        </ModalInner>
                        <ModalInner>
                            해당 기간 동안 획득한 조각은{' '}
                            <img
                                src="image/jogak.PNG"
                                width="20px"
                                alt="조각"
                                style={{ verticalAlign: 'middle' }}
                            />{' '}
                            {profit.erda.toLocaleString()} 조각입니다.
                        </ModalInner>
                    </div>
                ) : (
                    '기간을 선택해주세요.'
                )}
            </ModalContent>
            <ModalFooter>
                <Button onClick={onCancle}>닫기</Button>
            </ModalFooter>
        </Modal>
    );
};

export default React.memo(ModalProfit);
