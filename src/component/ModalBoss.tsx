import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 30px;
    row-gap: 10px;
    margin: 7% 20% 7% 25%;
    position: relative;

    > div {
        font-size: 12px;
        display: flex;
        align-items: center;
    }
`;

const ModalHead = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7%;
`;

const ModalNav = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top : 5%;
    margin-right : 10%;
    font-size : 12px;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom : 10%;
`;

const NavGrid = styled.div`
    display : grid;
    grid-template-columns: 60% 40%;
`
const Checkbox = styled.input`
    width: 20px;
    height: 16px;
`;

const Button = styled.button<{ width: string }>`
    font-size: 12px;
    border: none;
    background-color: white;
    width: ${(props) => props.width};
    height: 10px;
    backgroud-color: white;
`;

interface ModalBossProps {
    toggle: boolean;
    total: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalBoss: React.FC<ModalBossProps> = ({ toggle, total, setToggle }) => {
    return (
        <Modal toggle={toggle}>
            <ModalHead>
                {total
                    ? '잡은 보스의 수를 입력하세요.'
                    : '잡은 보스를 체크하세요.'}
            </ModalHead>
            <ModalNav>
                <NavGrid>
                    <div>리부트</div>
                    <Checkbox type='checkbox' />
                </NavGrid>
            </ModalNav>
            <ModalContent>
                <div>이지 시그너스</div>
                <Checkbox type="checkbox" />
                <div>하드 힐라</div>
                <Checkbox type="checkbox" />
                <div>카오스 핑크빈</div>
                <Checkbox type="checkbox" />
                <div>노말 시그너스</div>
                <Checkbox type="checkbox" />
                <div>카오스 자쿰</div>
                <Checkbox type="checkbox" />
                <div>카오스 피에르</div>
                <Checkbox type="checkbox" />
                <div>카오스 반반</div>
                <Checkbox type="checkbox" />
                <div>카오스 블러디퀸</div>
                <Checkbox type="checkbox" />
                <div>하드 매그너스</div>
                <Checkbox type="checkbox" />
                <div>카오스 벨룸</div>
                <Checkbox type="checkbox" />
                <div>카오스 파풀라투스</div>
                <Checkbox type="checkbox" />
                <div>노말 스우</div>
                <Checkbox type="checkbox" />
                <div>노말 데미안</div>
                <Checkbox type="checkbox" />
                <div>노말 가디언 엔젤 슬라임</div>
                <Checkbox type="checkbox" />
                <div>이지 루시드</div>
                <Checkbox type="checkbox" />
                <div>이지 윌</div>
                <Checkbox type="checkbox" />
                <div>노말 루시드</div>
                <Checkbox type="checkbox" />
                <div>노말 윌</div>
                <Checkbox type="checkbox" />
                <div>노말 더스크</div>
                <Checkbox type="checkbox" />
                <div>노말 듄켈</div>
                <Checkbox type="checkbox" />
                <div>하드 스우</div>
                <Checkbox type="checkbox" />
                <div>하드 데미안</div>
                <Checkbox type="checkbox" />
                <div>하드 루시드</div>
                <Checkbox type="checkbox" />
                <div>하드 윌</div>
                <Checkbox type="checkbox" />
                <div>노말 진힐라</div>
                <Checkbox type="checkbox" />
                <div>카오스 더스크</div>
                <Checkbox type="checkbox" />
                <div>카오스 가디언 엔젤 슬라임</div>
                <Checkbox type="checkbox" />
                <div>하드 듄켈</div>
                <Checkbox type="checkbox" />
                <div>하드 진힐라</div>
                <Checkbox type="checkbox" />
                <div>하드 검은 마법사</div>
                <Checkbox type="checkbox" />
            </ModalContent>
            <Head>
                    <Button
                        width="100px"
                    >
                        적용하기
                    </Button>
                
                <Button
                    width="100px"
                    onClick={() => setToggle(prev => !prev)}
                >
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalBoss);
