import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MainImage = styled.div`
    display : flex;
    justify-content : center;
`;

const MainContent = styled.div`
    display : flex;
    justify-content : center;
    margin-top : 4%;

    > div {
        font-size : 13px;
    }
`;
const BlockContainer = styled.div`
    display : flex;
`;

const Block = styled.div<{ $color : boolean}>`
    width : 80px;
    height : 30px;
    background-color : ${props => props.$color ? 'blue' : 'none'};
`;

const MainDisplay = styled.div`
    display : grid;
    grid-template-columns : 80% 10% 10%; 
    margin-top : 4%;
    margin-bottom : 4%:
`;

const Level = styled.div`
    border : 1px solid gray;
    border-radius : 12px;
    margin-left : 12%;
    text-align : center;
`;

const Button = styled.button`
    font-size: 12px;
    border: 1px solid gray;
    border-radius: 8px;
    width: 100px;
    height: 20px;
    backgroud-color: white;
`;



const SolErda = () => {

    const [main,setMain] = useState<Array<boolean>>([false,false,false,false,false,false,false,false,false,false]);
    const [sub1, setSub1] = useState<Array<boolean>>([false,false,false,false,false,false,false,false,false,false]);
    const [sub2, setSub2] = useState<Array<boolean>>([false,false,false,false,false,false,false,false,false,false]);
    const [mainlevel, setMainlevel] = useState<number>(0);
    const [sub1level, setSub1level] = useState<number>(0);
    const [sub2level, setSub2level] = useState<number>(0);
    const [mainpercent, setMainpercent] = useState<number>(0);
    const [sub1percent, setSub1percent] = useState<number>(0);
    const [sub2percent, setSub2percent] = useState<number>(0);
    const [consume, setConsume] = useState<number>(0); //조각 소모개수
    const [accumalte, setAccumalte] = useState<number>(0); //누적 소모 개수
    const [init, setInit] = useState<number>(0);
    const [toggle, setToggle] = useState<boolean>(false);
    const [piece, setPiece] = useState<number>();
    const [meso, setMeso] = useState<number>(0);

    const imgsrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuVCDD1LSRF16xcdNcurB3C3IKllcBvpewaw&usqp=CAU";

    const onSetMainPercent = (current : number) : number => { //현재 레벨에 따라 확률 반환
        if(current < 0 || current > 10) {
            return -1;
        }
        else if(current <= 2) {
            return 35;
        }
        else if(current <= 6) {
            return 20;
        }
        else if(current === 7) {
            return 15;
        }
        else if(current === 8) {
            return 10;
        }
        else if(current === 9){
            return 5;
        }
        else {
            return 0;
        }
    };

    const onSetSubPercent = (mainpercent : number) : number => { 
        return (100-mainpercent) / 2;
    };

    const onSetConsume = (current : number) : number => {
        if(current < 0 || current >= 10) { //0보다 작거나 10보다 크거나 같은 수가 들어오면 잘못 들어온 것이므로 -1리턴
            return -1;
        }
        else if(current <= 2) {
            return 10;
        }
        else if(current <= 6) {
            return 20;
        }
        else if(current <= 8) {
            return 30;
        }
        else {
            return 50;
        }
    };

    const onSetArray = (current : number) : Array<boolean> => {
        let tmp = [false,false,false,false,false,false,false,false,false,false];
        
        for(let i in tmp) {
            if(Number(i) < current) {
                tmp[i] = true;
            }
        }

        return tmp;
    };

    const onInitialize = () => {
        setMainlevel(0);
        setSub1level(0);
        setSub2level(0);
        setInit(prev => prev + 1);
        setMeso(prev => prev + 100000000);
    };

    const onSetAccumalate = (consume : number) => {
        if(mainlevel === 0 && sub1level === 0 && sub2level === 0) { //초기화시 조각 소모되는 것을 방지
            return;
        }
        setAccumalte(prev => prev + consume);
    };


    const enforce = (mainpercent : number): 0 | 1 | 2 => { //강화시도에 현재 강화 정보도 가져와야함 === 10레벨 이후에는 못하므로
        const num = Math.floor(Math.random() * 100) + 1; // 1 ~ 100까지 난수 생성

        if(num <= mainpercent) {
            return 0;
        }
        else if(num <= (mainpercent + onSetSubPercent(mainpercent))) {
            return 1;
        }
        else {
            return 2;
        }
    };

    const MainMaxEnforce = (mainpercent : number) : 0 | 1 | 2 => { //메인스탯이 맥스일경우
        const num = Math.floor(Math.random() * 100) + 1; // 1 ~ 100까지 난수 생성
        
        if(num <= onSetSubPercent(mainpercent)) {
            return 1;
        }
        else {
            return 2;
        }
    }

    const Sub1MaxEnforce = (mainpercent : number) : 0 | 1 | 2 => {
        const num = Math.floor(Math.random() * 100) + 1; // 1 ~ 100까지 난수 생성

        if(num <= mainpercent) {
            return 0;
        }
        else {
            return 2;
        }
    }

    const Sub2MaxEnforce = (mainpercent : number) : 0 | 1 | 2 => {
        const num = Math.floor(Math.random() * 100) + 1; // 1 ~ 100까지 난수 생성

        if(num <= mainpercent) {
            return 0;
        }
        else {
            return 1;
        }
    }

    const enforceTry = (main : number, sub1 : number, sub2 : number) =>  {
        if(main + sub1 + sub2 >= 20) {
            window.alert("최대 20번까지 강화할 수 있습니다.");
            return;
        }
        const mainpercent = onSetMainPercent(main);
        let result;
        if(main === 10) {
            result = MainMaxEnforce(mainpercent)
        }
        else if(sub1 === 10) {
            result = Sub1MaxEnforce(mainpercent);
        }
        else if(sub2 === 10) {
            result = Sub2MaxEnforce(mainpercent);
        }
        else { //아무것도 최대치를 못찍었을 경우
            result = enforce(mainpercent);
        }
        if(result === 0) { //메인 스탯 강화 성공
            setMainlevel(prev => prev + 1);
        }
        else if(result === 1) { //서브1 강화 성공
            setSub1level(prev => prev + 1);
        }
        else { //서브2 강화 성공
            setSub2level(prev => prev + 1);
        }
    };

    const comma = (param: number): string => {
        return param.toLocaleString();
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

    const onSetMeso = () => {
        if(piece) {
            setMeso(piece * accumalte);
        }
    }

    const onPieceChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setPiece(Number(value));
    };

    useEffect(() => {
        setMainpercent(onSetMainPercent(mainlevel));
        setSub1percent(onSetSubPercent(onSetMainPercent(mainlevel)));
        setSub2percent(onSetSubPercent(onSetMainPercent(mainlevel)));
        setConsume(onSetConsume(mainlevel));
        setMain(onSetArray(mainlevel));
        setSub1(onSetArray(sub1level));
        setSub2(onSetArray(sub2level));
        onSetAccumalate(consume);
    },[mainlevel,sub1level,sub2level]); //메인 레벨이 바뀜에 따라 확률과 조각 개수 재설정 필요

    useEffect(() => {
        onSetMeso();
    },[accumalte, piece])


    return (
        <React.Fragment>
            <MainImage>
            <img src={imgsrc} alt='솔 에르다 조각'/>
            </MainImage>
            <MainDisplay>
            <BlockContainer>
            { main.map((item, index) => (
                <Block key ={index} $color={item} />
            ))}
            </BlockContainer>
            <Level>{mainpercent}%</Level>
            <Level>{mainlevel}</Level>
            </MainDisplay>
            <MainDisplay>
            <BlockContainer>
            { sub1.map((item, index) => (
                <Block key={index} $color={item} />
            ))}
            </BlockContainer>
            <Level>{sub1percent}%</Level>
            <Level>{sub1level}</Level>
            </MainDisplay>
            <MainDisplay>
            <BlockContainer>
            { sub2.map((item, index) => (
                <Block key={index} $color={item} />
            ))}
            </BlockContainer>
            <Level>{sub2percent}%</Level>
            <Level>{sub2level}</Level>
            </MainDisplay>
            <MainContent>
                <div>소모되는 조각 개수 : {consume}개</div>
            </MainContent>
            <MainContent>
                <div>누적 소모 개수 : {accumalte}개</div>
            </MainContent>
            <MainContent>
                <div>누적 초기화 횟수 : {init}번</div>
            </MainContent>
            <MainContent>
                <Button onClick={() => enforceTry(mainlevel, sub1level, sub2level)}>강화하기</Button>&nbsp;&nbsp;
                <Button onClick={onInitialize}>초기화하기</Button>&nbsp;&nbsp;
                <Button onClick={() => setToggle(prev => !prev)}>누적 소모 메소</Button>
            </MainContent>
            { toggle && <div><MainContent><div>조각 값 입력 : &nbsp;&nbsp;</div>
             <input type='number' value={piece} onChange={onPieceChange}/>&nbsp;&nbsp;메소
            </MainContent>
            <MainContent>
                <div>누적 소모 메소 : {formatting(meso)} 메소</div>
            </MainContent>
            </div>}
        </React.Fragment>
    )
}


export default React.memo(SolErda);