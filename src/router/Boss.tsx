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

const array: any[] = [
    {
        check: false,
        name: '이지 시그너스',
        meso: 5059464,
        src: 'https://i.namu.wiki/i/xy1onLF2Eh3QsHM1hGbowtATA3XFLNDua8oGrIu1YQbrAQYAnNyycWVJymqpH9TNle09BNPJBBkNwaNXf1PSXQ.webp',
        hard: false,
        difficulty: 'EASY',
    },
    {
        check: false,
        name: '하드 힐라',
        meso: 6390000,
        src: 'https://i.namu.wiki/i/xkAv49nm21rPWT5mpuFDGBF2S0gc70tqMLTVyKj1qNNmaVPpjBOceuqlc9rsvQJFlh4mFGbPgaZqBun5vrOQtQ.webp',
        hard: false,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '카오스 핑크빈',
        meso: 7310000,
        src: 'https://i.namu.wiki/i/wqDvuAFvinyQZnJ5n9vwvsaT_ZWzUbVACT3jyExnO2aCnMpSvjoLQqad49NjfY85CCJXdpK1L53tqzAADsZRWw.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '노말 시그너스',
        meso: 8330000,
        src: 'https://i.namu.wiki/i/xy1onLF2Eh3QsHM1hGbowtATA3XFLNDua8oGrIu1YQbrAQYAnNyycWVJymqpH9TNle09BNPJBBkNwaNXf1PSXQ.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '카오스 자쿰',
        meso: 8980000,
        src: 'https://i.namu.wiki/i/KfsxkSC6DkvaKBQ22PHPc6pcMvObwSDp-mkwgSdL99Vw4OYHlfUKOGSQGKUJQoAo8ahSp3Kc9bO2RxcEkXtWUQ.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '카오스 피에르',
        meso: 9080000,
        src: 'https://i.namu.wiki/i/rRii1UpBFsO4y3MefnlY0QwuXeOpXK5dCV5h6Jq5pvb77SuF28VrsSMMSyFU6NWaQITnd6WWEETGKO8n8monIg.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '카오스 반반',
        meso: 9060000,
        src: 'https://i.namu.wiki/i/-VtxcgwbCe3C1hIr86TSKjjHDZfMquc8WG5sXQLJhGAzH_A6p_mml--2BLqK6v0aMS17F97JqIrhWxvWSjJx-g.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '카오스 블러디퀸',
        meso: 9040000,
        src: 'https://i.namu.wiki/i/zGHR27yvbeM4WJfRc1aRRTJD6t9G1Hs3Sr4U9p9P_mgbSBltqAAeydZwcogLq8XRHULHAz8uKfyyHaniucblOA.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '카오스 벨룸',
        meso: 11600000,
        src: 'https://i.namu.wiki/i/XWlfIMMZZSKby5FyBZ2UmL82I9Fl6iXpiP_CejECSHdwh3Abkflw2K9Pgp-M_TUJTTCS6EPeaO87iB6t5gXBeQ.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '하드 매그너스',
        meso: 10700000,
        src: 'https://i.namu.wiki/i/8IEIsgJYENvHw463fs7pTt8qwivTcj5kAF6LFH8FvtaHnqPQ1THyQjMqHs-nM4xogLApg-CTAbshZ9USFU3DyQ.webp',
        hard: false,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '카오스 파풀라투스',
        meso: 24700000,
        src: 'https://i.namu.wiki/i/-suBIbDeVJhzTkhXF8bNoVzCMcICvABpUmJ8DJcziBOJ2VLSaGy6DNDbMOIfsRYDsq1xinh7jJjoH2t1aS1l7Q.webp',
        hard: false,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '노말 스우',
        meso: 31400000,
        src: 'https://i.namu.wiki/i/ruflnxOS_pahmLa1F5ZGd0fGMayv2-2OeUsoE1f9amaqSvEabumApKDwKYiOtV1caYUhxrZ-glhPQ2cPC8ICPw.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '노말 데미안',
        meso: 32900000,
        src: 'https://i.namu.wiki/i/dKLZC6dsM7hb1BnKvHm_9hsL9C_tTp890DxsFrJ95CBu64wzhp7Bw_qY8kFvO-1cpoiAUiFuWKCmvlEUkoDMpg.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '노말 가디언 엔젤 슬라임',
        meso: 47800000,
        src: 'https://i.namu.wiki/i/NfyVXe5x1GSgN3ItCXYnMby76jSOjawGeKHZbCgkHLlx_0etsQmi-SBVPbfWaRxmnHZWio8z5XalVLb01O-jkg.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '이지 루시드',
        meso: 49000000,
        src: 'https://i.namu.wiki/i/EX4mog9TVN7S0SlVKzLnDqUu1w2ymmpdEkgU4seIKdcVtKBOqx31uIQ8-Dg1TPmpoV1uPGqyDPFEDuWiUEezKQ.webp',
        hard: false,
        difficulty: 'EASY',
    },
    {
        check: false,
        name: '이지 윌',
        meso: 53100000,
        src: 'https://i.namu.wiki/i/f1qnRIpp0_pOjczEjEZt2mauZ7XE8RUqD3AD14w3PFiPDc-QHlkE6qVpKdrgPtBzfImPw5cl1mp-y6Lu5Uw8MQ.webp',
        hard: false,
        difficulty: 'EASY',
    },
    {
        check: false,
        name: '노말 루시드',
        meso: 58600000,
        src: 'https://i.namu.wiki/i/EX4mog9TVN7S0SlVKzLnDqUu1w2ymmpdEkgU4seIKdcVtKBOqx31uIQ8-Dg1TPmpoV1uPGqyDPFEDuWiUEezKQ.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '노말 윌',
        meso: 67600000,
        src: 'https://i.namu.wiki/i/f1qnRIpp0_pOjczEjEZt2mauZ7XE8RUqD3AD14w3PFiPDc-QHlkE6qVpKdrgPtBzfImPw5cl1mp-y6Lu5Uw8MQ.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '노말 더스크',
        meso: 72400000,
        src: 'https://i.namu.wiki/i/4eyeZXwJ1wnQwpm47kvf3o8JklnpjeyJA_bKlqOjMTPP1IDDD-FlAcbhUO1zueTwmZWA0yKFV2nQPv1T24jbCQ.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '노말 듄켈',
        meso: 78100000,
        src: 'https://i.namu.wiki/i/Z2T13QUo0lfUtzcX5BH_0PQtp0Y7_jy8dFlzNyVLgReXrZRbtWjSssmEyi6-hrbN7XP5oJegXlmt7goyA5Jdzg.webp',
        hard: false,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '하드 데미안',
        meso: 113000000,
        src: 'https://i.namu.wiki/i/dKLZC6dsM7hb1BnKvHm_9hsL9C_tTp890DxsFrJ95CBu64wzhp7Bw_qY8kFvO-1cpoiAUiFuWKCmvlEUkoDMpg.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '하드 스우',
        meso: 119000000,
        src: 'https://i.namu.wiki/i/ruflnxOS_pahmLa1F5ZGd0fGMayv2-2OeUsoE1f9amaqSvEabumApKDwKYiOtV1caYUhxrZ-glhPQ2cPC8ICPw.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '하드 루시드',
        meso: 135000000,
        src: 'https://i.namu.wiki/i/EX4mog9TVN7S0SlVKzLnDqUu1w2ymmpdEkgU4seIKdcVtKBOqx31uIQ8-Dg1TPmpoV1uPGqyDPFEDuWiUEezKQ.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '하드 윌',
        meso: 165000000,
        src: 'https://i.namu.wiki/i/f1qnRIpp0_pOjczEjEZt2mauZ7XE8RUqD3AD14w3PFiPDc-QHlkE6qVpKdrgPtBzfImPw5cl1mp-y6Lu5Uw8MQ.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '노말 진 힐라',
        meso: 153000000,
        src: 'https://i.namu.wiki/i/tEUqjqEdPq18JmCb4wQqUp8_VSrf3XuvGNyyCqTH-LQQhjt-wQQXuib7SY-eERKUr8FfBCm58NW35gDN7Ra0dg.webp',
        hard: true,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '카오스 가디언 엔젤 슬라임',
        meso: 161000000,
        src: 'https://i.namu.wiki/i/NfyVXe5x1GSgN3ItCXYnMby76jSOjawGeKHZbCgkHLlx_0etsQmi-SBVPbfWaRxmnHZWio8z5XalVLb01O-jkg.webp',
        hard: true,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '카오스 더스크',
        meso: 150000000,
        src: 'https://i.namu.wiki/i/4eyeZXwJ1wnQwpm47kvf3o8JklnpjeyJA_bKlqOjMTPP1IDDD-FlAcbhUO1zueTwmZWA0yKFV2nQPv1T24jbCQ.webp',
        hard: true,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '하드 듄켈',
        meso: 177000000,
        src: 'https://i.namu.wiki/i/Z2T13QUo0lfUtzcX5BH_0PQtp0Y7_jy8dFlzNyVLgReXrZRbtWjSssmEyi6-hrbN7XP5oJegXlmt7goyA5Jdzg.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '하드 진 힐라',
        meso: 200000000,
        src: 'https://i.namu.wiki/i/tEUqjqEdPq18JmCb4wQqUp8_VSrf3XuvGNyyCqTH-LQQhjt-wQQXuib7SY-eERKUr8FfBCm58NW35gDN7Ra0dg.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '노말 선택받은 세렌',
        meso: 220000000,
        src: 'https://i.namu.wiki/i/DhzPskFnaHWVTfJk_Tb0GDDk7YWU8g-MS9IEau0kC03K7BKdFeZPheFglgLazh_9UuVj_jcaLdEH1L5dmM1jfQ.webp',
        hard: true,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '하드 선택받은 세렌',
        meso: 325000000,
        src: 'https://i.namu.wiki/i/DhzPskFnaHWVTfJk_Tb0GDDk7YWU8g-MS9IEau0kC03K7BKdFeZPheFglgLazh_9UuVj_jcaLdEH1L5dmM1jfQ.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '이지 감시자 칼로스',
        meso: 265000000,
        src: 'https://i.namu.wiki/i/XKVybiizrvprkaLQltvNf3XfqPB1BSn1ItKV6ijJsIliqxdZCKeqmSQNQKWwGCkM6ZwJDKe7luq9plx6gDpAzg.webp',
        hard: true,
        difficulty: 'EASY',
    },
    {
        check: false,
        name: '노말 감시자 칼로스',
        meso: 364000000,
        src: 'https://i.namu.wiki/i/XKVybiizrvprkaLQltvNf3XfqPB1BSn1ItKV6ijJsIliqxdZCKeqmSQNQKWwGCkM6ZwJDKe7luq9plx6gDpAzg.webp',
        hard: true,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '카오스 감시자 칼로스',
        meso: 746000000,
        src: 'https://i.namu.wiki/i/XKVybiizrvprkaLQltvNf3XfqPB1BSn1ItKV6ijJsIliqxdZCKeqmSQNQKWwGCkM6ZwJDKe7luq9plx6gDpAzg.webp',
        hard: true,
        difficulty: 'CHAOS',
    },
    {
        check: false,
        name: '익스트림 감시자 칼로스',
        meso: 1500000000,
        src: 'https://i.namu.wiki/i/XKVybiizrvprkaLQltvNf3XfqPB1BSn1ItKV6ijJsIliqxdZCKeqmSQNQKWwGCkM6ZwJDKe7luq9plx6gDpAzg.webp',
        hard: true,
        difficulty: 'EXTREME',
        extreme: true,
    },
    {
        check: false,
        name: '익스트림 선택받은 세렌',
        meso: 1340000000,
        src: 'https://i.namu.wiki/i/DhzPskFnaHWVTfJk_Tb0GDDk7YWU8g-MS9IEau0kC03K7BKdFeZPheFglgLazh_9UuVj_jcaLdEH1L5dmM1jfQ.webp',
        hard: true,
        difficulty: 'EXTREME',
        extreme: true,
    },
    {
        check: false,
        name: '이지 카링',
        meso: 293000000,
        src: 'https://i.namu.wiki/i/ex5ViuTKPKviftIb21RyUf36qfe6yCg5O1lyfmfNFFWpurlq54GpRRcI7KdOHcAgLgrRJDcpyoBvhdzuXNzGtQ.webp',
        hard: true,
        difficulty: 'EASY',
    },
    {
        check: false,
        name: '노말 카링',
        meso: 425000000,
        src: 'https://i.namu.wiki/i/ex5ViuTKPKviftIb21RyUf36qfe6yCg5O1lyfmfNFFWpurlq54GpRRcI7KdOHcAgLgrRJDcpyoBvhdzuXNzGtQ.webp',
        hard: true,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '하드 카링',
        meso: 870000000,
        src: 'https://i.namu.wiki/i/ex5ViuTKPKviftIb21RyUf36qfe6yCg5O1lyfmfNFFWpurlq54GpRRcI7KdOHcAgLgrRJDcpyoBvhdzuXNzGtQ.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '익스트림 카링',
        meso: 1750000000,
        src: 'https://i.namu.wiki/i/ex5ViuTKPKviftIb21RyUf36qfe6yCg5O1lyfmfNFFWpurlq54GpRRcI7KdOHcAgLgrRJDcpyoBvhdzuXNzGtQ.webp',
        hard: true,
        difficulty: 'EXTREME',
        extreme: true,
    },
    {
        check: false,
        name: '노말 림보',
        meso: 600000000,
        src: 'https://i.namu.wiki/i/7xXU2wR9QNoX1rCITJqb8qrxCCYeOVVt6fSGgxxlWAcWbxlfWCXlg3JG9IL5EldpZjdVgrAbFnbJ28zfu231fw.webp',
        hard: true,
        difficulty: 'NORMAL',
    },
    {
        check: false,
        name: '하드 림보',
        meso: 1070000000,
        src: 'https://i.namu.wiki/i/7xXU2wR9QNoX1rCITJqb8qrxCCYeOVVt6fSGgxxlWAcWbxlfWCXlg3JG9IL5EldpZjdVgrAbFnbJ28zfu231fw.webp',
        hard: true,
        difficulty: 'HARD',
    },
    {
        check: false,
        name: '익스트림 스우',
        meso: 392000000,
        src: 'https://i.namu.wiki/i/ruflnxOS_pahmLa1F5ZGd0fGMayv2-2OeUsoE1f9amaqSvEabumApKDwKYiOtV1caYUhxrZ-glhPQ2cPC8ICPw.webp',
        hard: true,
        difficulty: 'EXTREME',
        extreme: true,
    },
];

const Boss = () => {
    const [name, setName] = useState<string>('');
    const [BossArray, setBossArray] = useState<any[]>([]);

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

    const getBossFromLocalStorage = () => {
        // localStorage에서 데이터를 가져옴
        const prev = localStorage.getItem('bossarray');

        // 데이터가 있을 경우 JSON으로 파싱, 없으면 빈 배열 반환
        return prev ? JSON.parse(prev) : [];
    };

    const localStorageBossArray = getBossFromLocalStorage();

    const queryResults: any = useQueries({
        queries: localStorageBossArray.map((item: any) => ({
            queryKey: ['characterData', item.ocid],
            queryFn: () =>
                getCharacterData(item.ocid, moment().format('YYYY-MM-DD')),
            staleTime: 1000 * 60 * 5,
            cacheTime: 1000 * 60 * 10,
            retry: 1,
            refetchOnWindowFocus: false,
        })),
    });

    const allQueriesSuccessful = queryResults.every(
        (query: any) => query.isSuccess
    );

    useEffect(() => {
        if (allQueriesSuccessful) {
            const updatedState = onCharacterStateUpdate(queryResults);
            setBossArray(updatedState);
            setBossToLocalStorage(updatedState);
        }
    }, [allQueriesSuccessful]); // queryResults 대신 allQueriesSuccessful 사용

    const onCharacterStateUpdate = (queryResults: any) => {
        //목요일에 최신화를 할 때 캐릭터의 상태를 업데이트함 (레벨 정보, 등등)
        const prevState = getBossFromLocalStorage(); //
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
        const newBossArray = getBossFromLocalStorage(); //LocalStorage에 저장된 배열을 가져옴
        if (newBossArray && newBossArray.length > 0) {
            //배열이 있으며, 데이터가 있다면
            setBossArray(newBossArray);
            onWeeklyMesoChange(newBossArray);
            onWeeklyCountChange(newBossArray);
            onWeeklyDoneCharacterChange(newBossArray);
        }
    }, []);

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
            setBossToLocalStorage(SortedArray);

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
        setBossToLocalStorage(newBossArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
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

    const setBossToLocalStorage = (bossarray: any[]) => {
        if (bossarray) {
            localStorage.setItem('bossarray', JSON.stringify(bossarray));
        }
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
        setBossToLocalStorage(SortedArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
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
        setBossToLocalStorage(newBossArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
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
        setBossToLocalStorage(SortedArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
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
            setBossToLocalStorage(newBossArray);
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
            setBossToLocalStorage(SortedArray); //BossArray상태가 변경되기 때문에 로컬스토리지에도 저장
            onWeeklyMesoChange(SortedArray);
            onWeeklyCountChange(SortedArray);
            onWeeklyDoneCharacterChange(SortedArray);
            setBossArray(SortedArray);
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
                </Back>
            </Background>
        </React.Fragment>
    );
};

export default React.memo(Boss);
