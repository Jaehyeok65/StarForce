import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';

const ModalContent = styled.div`
    display: grid;
    gap: 30px;
    row-gap: 10px;
    margin: 7% 20% 7% 20%;
    position: relative;

    > div {
        font-size: 12px;
    }
`;

const ModalColumns = styled.div`
    display: grid;
    grid-template-columns: 60% 40% 10%;
`;

const ModalHead = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 7%;
`;

const ModalNav = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 5%;
    margin-right: 10%;
    font-size: 12px;
`;

const Head = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 10%;
`;

const NavGrid = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
`;
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
interface Boss {
    check: boolean;
    meso: number;
    name: string;
}

interface ModalBossProps {
    toggle: boolean;
    total: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    boss : Boss[];
    reboot : boolean;
    onCheckChange : (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRebootChange : () => void;
    onBossMesoPlus : () => void;
    onCancle : (onToggle: React.Dispatch<React.SetStateAction<boolean>>) => void;
};


const ModalBoss: React.FC<ModalBossProps> = ({ toggle, total, setToggle, boss, reboot, onRebootChange, onCheckChange, onBossMesoPlus, onCancle }) => {

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
                    <Checkbox type="checkbox" checked={reboot} onChange={onRebootChange} />
                </NavGrid>
            </ModalNav>
            <ModalContent>
                {boss.map((item) => (
                    <ModalColumns key={item.name}>
                        <div>{item.name}</div>
                        <div>{reboot ? (item.meso*5).toLocaleString() : item.meso.toLocaleString()}</div>
                        <Checkbox type="checkbox" checked={item.check} name={item.name} onChange={onCheckChange}/>
                    </ModalColumns>
                ))}
            </ModalContent>
            <Head>
                <Button width="100px" onClick={onBossMesoPlus}>적용하기</Button>

                <Button
                    width="100px"
                    onClick={() => onCancle(setToggle)}
                >
                    닫기
                </Button>
            </Head>
        </Modal>
    );
};

export default React.memo(ModalBoss);
