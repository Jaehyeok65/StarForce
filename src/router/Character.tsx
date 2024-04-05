import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getOcidData } from 'api/Maple';
import { useQuery } from '@tanstack/react-query';
import CharacterResult from 'component/CharacterResult';
import { FaSistrix } from 'react-icons/fa6';
import ModalEquipment from 'component/ModalEquipment';
import moment from 'moment';

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

const Header = styled.div`
    text-align: center;
    padding: 5% 0% 5% 0%;
`;

const Input = styled.input`
    border-radius: 8px;
    border: 1px solid gray;
    width: 30%;
    height: 30px;
`;

const InputDate = styled.input`
    border-radius: 8px;
    border: 1px solid gray;
    width: 100px;
    height: 30px;
`;

const Button = styled.button`
    border-radius: 8px;
    border: 1px solid gray;
    background-color: white;
    height: 33px;
    width: 33px;
`;

export type mode =
    | '정보'
    | '장비'
    | '캐시장비'
    | '5차강화'
    | '6차강화'
    | '심볼'
    | '유니온'
    | '링크스킬';

const Character = () => {
    const [name, setName] = useState<string>('');
    const [mode, setMode] = useState<mode>('정보');
    const [equipmenttoggle, setEquipmentToggle] = useState<boolean>(false);
    const [equipment, setEquipment] = useState<any>({});
    const [date, setDate] = useState<string>(moment().format('YYYY-MM-DD'));
    const {
        data: ocid,
        refetch,
        isError,
        error,
    } = useQuery({
        queryKey: ['ocid'], //쿼리키에 변수 종속성을 추가하면 Input창이 변경될 때 마다 자동으로 가져오므로 종속성 추가X
        queryFn: () => getOcidData(name),
        enabled: false,
    });

    useEffect(() => {
        setMode(() => '정보');
    }, [ocid]);

    const onClick = () => {
        refetch();
    };

    const onEnterClick = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    return (
        <React.Fragment>
            <Background>
                <Back>
                    <Header>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={onEnterClick}
                        />
                        &nbsp;
                        <Button onClick={onClick}>
                            <FaSistrix />
                        </Button>
                        &nbsp;
                        <InputDate
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={'2023-12-21'}
                            max={moment().format('YYYY-MM-DD')}
                        />
                    </Header>
                    {ocid && (
                        <CharacterResult
                            mode={mode}
                            setMode={setMode}
                            ocid={ocid}
                            setEquipment={setEquipment}
                            setEquipmentToggle={setEquipmentToggle}
                            isError={isError}
                            error={error}
                            date={date}
                        />
                    )}
                </Back>
            </Background>
            <ModalEquipment
                toggle={equipmenttoggle}
                option={equipment}
                setToggle={() => setEquipmentToggle((prev) => !prev)}
            />
        </React.Fragment>
    );
};

export default React.memo(Character);
