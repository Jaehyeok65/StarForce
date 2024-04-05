import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import styled from 'styled-components';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import EquipmentOption from './EquipmentOption';

const StarForce = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 15px;
    row-gap: 5px;
    justify-content: center; /* 가운데 정렬 */
    margin: 3% 20% 1% 20%;

    > div:nth-child(4),
    div:nth-child(5) {
        margin-left: 40%;
    }
`;

const LeastStarForce = styled.div`
    display: flex;
    justify-content: center; /* 가운데 정렬 */
    margin: 3% 20% 1% 20%;
`;

const SoulName = styled.div`
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #80e12a;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    margin-bottom: 1%;
`;

const ItemName = styled.div<{ $scroll_upgrade: any; $starforce: any }>`
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: ${(props) => (props.$scroll_upgrade === '0' ? 'black' : 'red')};
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    margin-bottom: 1%;
    margin-top: ${(props) => (props.$starforce === '0' ? '5%' : '1%')};
`;

const PotentialName = styled.div`
    display: flex;
    justify-content: center;
    grid-template-columns: 1fr;
    font-size: 12px;
`;

const ItemOption = styled.div`
    display: grid;
    font-size: 13px;
    margin-left: 5%;
`;

const DottedLine = styled.div`
    border-top: 2px dotted lightgray; /* 점선 스타일 설정 */
    margin: 10px 0; /* 원하는 간격 설정 */
    margin-left: 5%;
    margin-right: 5%;
`;

const PotentialGrid = styled.div`
    margin: 1% 5% 1% 5%;
    font-size: 13px;
`;

const AdditionalGrid = styled.div`
    margin: 1% 5% 1% 5%;
    font-size: 13px;
`;

const SoulGrid = styled.div`
    margin: 1% 5% 1% 5%;
    font-size: 13px;
`;

const SoulSpan = styled.span`
    color: #dcad67;
`;

const PotentialSpan = styled.div<{ $potential_option_grade: string }>`
    color: ${(props) =>
        props.$potential_option_grade === '레전드리'
            ? '#228B22'
            : props.$potential_option_grade === '유니크'
            ? '#FF9100'
            : props.$potential_option_grade === '에픽'
            ? '#C71585'
            : '#46BEFF'};
`;

const IconBox = styled.img<{ $potential_option_grade: string }>`
    border: 2px solid
        ${(props) =>
            props.$potential_option_grade === '레전드리'
                ? '#228B22'
                : props.$potential_option_grade === '유니크'
                ? '#FFDC3C'
                : props.$potential_option_grade === '에픽'
                ? '#C71585'
                : props.$potential_option_grade === '레어'
                ? '#46BEFF'
                : 'lightgray'};
    margin-left: 5%;
    padding: 12px;
    border-radius: 8px;
`;

const BasicShame = styled.div`
    color: black;
`;

const Inner = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
`;

const IconWrapper = styled.span`
    font-size: 16px; /* 아이콘 크기 조정 */
`;

interface ModalEquipmentProps {
    toggle: boolean;
    option?: any;
    setToggle?: any;
}

const ModalEquipment: React.FC<ModalEquipmentProps> = ({
    toggle,
    option,
    setToggle,
}) => {
    const [star, setStar] = useState<boolean[][]>([]);

    useEffect(() => {
        const setMaxStarForce = () => {
            let tmp: any;

            const level = option?.item_base_option?.base_equipment_level;

            if (level >= 138) {
                tmp = Array.from({ length: 25 }).fill(false);
            } else if (level >= 128) {
                tmp = Array.from({ length: 20 }).fill(false);
            } else if (level >= 118) {
                tmp = Array.from({ length: 15 }).fill(false);
            } else if (level >= 108) {
                tmp = Array.from({ length: 10 }).fill(false);
            } else if (level >= 95) {
                tmp = Array.from({ length: 8 }).fill(false);
            } else {
                tmp = Array.from({ length: 5 }).fill(false);
            }

            return tmp;
        };
        const setStarForceArray = () => {
            const maxstar = setMaxStarForce();
            const updatedStar = maxstar.map((item: any, index: number) => {
                // index가 option.starforce보다 작은 경우 true로 변경
                return index < option.starforce;
            });

            const chunkSize = 5;
            const result = Array.from({ length: chunkSize }, (_, index) =>
                updatedStar.slice(index * chunkSize, (index + 1) * chunkSize)
            );
            setStar(result);
        };

        setStarForceArray();
    }, [option?.item_base_option?.base_equipment_level, option.starforce]);

    useEffect(() => {
        const body: any = document.querySelector('body');
        if (toggle) {
            body.style.overflow = 'hidden'; // 모달 열릴 때 스크롤 막기
        } else {
            body.style.overflow = 'auto'; // 모달 닫힐 때 스크롤 재활성화
        }
        return () => {
            body.style.overflow = 'auto'; // 컴포넌트 언마운트 시 스크롤 재활성화
        };
    }, [toggle]);

    return (
        <Modal toggle={toggle} setToggle={setToggle}>
            <div>
                {option.starforce > 0 &&
                option?.item_base_option?.base_equipment_level >= 128 ? (
                    <StarForce>
                        {star.map((item: boolean[], index: number) => (
                            <Inner key={index}>
                                {item.map(
                                    (isStarFilled: boolean, index1: number) => (
                                        <IconWrapper key={index1}>
                                            {isStarFilled ? (
                                                <AiFillStar color="#FFD700" />
                                            ) : (
                                                <AiOutlineStar color="#FFD700" />
                                            )}
                                        </IconWrapper>
                                    )
                                )}
                            </Inner>
                        ))}
                    </StarForce>
                ) : (
                    <div>
                        {option.starforce > 0 && (
                            <LeastStarForce>
                                {star.map((item: boolean[], index: number) => (
                                    <Inner key={index}>
                                        {item.map(
                                            (
                                                isStarFilled: boolean,
                                                index1: number
                                            ) => (
                                                <IconWrapper key={index1}>
                                                    {isStarFilled ? (
                                                        <AiFillStar color="#FFD700" />
                                                    ) : (
                                                        <AiOutlineStar color="#FFD700" />
                                                    )}
                                                </IconWrapper>
                                            )
                                        )}
                                    </Inner>
                                ))}
                            </LeastStarForce>
                        )}
                    </div>
                )}
                {option.soul_name && (
                    <SoulName>
                        {option.soul_name.slice(
                            0,
                            option.soul_name.indexOf('의') + 1
                        )}
                    </SoulName>
                )}
                {option.item_name && (
                    <ItemName
                        $scroll_upgrade={option.scroll_upgrade}
                        $starforce={option.starforce}
                    >
                        {option.item_name}
                        {option.scroll_upgrade > 0 && (
                            <span>
                                &nbsp;{'(+' + option.scroll_upgrade + ')'}
                            </span>
                        )}
                    </ItemName>
                )}
                {option.potential_option_grade && (
                    <PotentialName>
                        {'(' + option.potential_option_grade + ' 아이템)'}
                    </PotentialName>
                )}
                <DottedLine />
                {option.item_icon && (
                    <IconBox
                        src={option.item_icon}
                        alt={option.item_name}
                        width="50px"
                        $potential_option_grade={option.potential_option_grade}
                    />
                )}
                <DottedLine />
                <ItemOption>
                    <BasicShame>
                        장비분류 : {option.item_equipment_part}
                    </BasicShame>
                    <EquipmentOption option={option} part="str" />
                    <EquipmentOption option={option} part="dex" />
                    <EquipmentOption option={option} part="int" />
                    <EquipmentOption option={option} part="luk" />
                    <EquipmentOption option={option} part="max_hp" />
                    <EquipmentOption option={option} part="attack_power" />
                    <EquipmentOption option={option} part="magic_power" />
                    <EquipmentOption option={option} part="boss_damage" />
                    <EquipmentOption
                        option={option}
                        part="ignore_monster_armor"
                    />
                    <EquipmentOption option={option} part="damage" />
                    <EquipmentOption option={option} part="all_stat" />
                    {option?.cuttable_count !== '255' && <div style={{ color : '#DAA520'}}>가위 사용 가능 횟수 : {option?.cuttable_count}회</div>}
                </ItemOption>
                <DottedLine />
                {option.potential_option_grade && (
                    <PotentialGrid>
                        <div>
                            <PotentialSpan
                                $potential_option_grade={
                                    option.potential_option_grade
                                }
                            >
                                잠재옵션
                            </PotentialSpan>
                        </div>
                        <div>{option.potential_option_1}</div>
                        <div>{option.potential_option_2}</div>
                        <div>{option.potential_option_3}</div>
                    </PotentialGrid>
                )}
                {option.potential_option_grade && <DottedLine />}
                {option.additional_potential_option_grade && (
                    <AdditionalGrid>
                        <div>
                            <PotentialSpan
                                $potential_option_grade={
                                    option.additional_potential_option_grade
                                }
                            >
                                에디셔널 잠재옵션
                            </PotentialSpan>
                        </div>
                        <div>{option.additional_potential_option_1}</div>
                        <div>{option.additional_potential_option_2}</div>
                        <div>{option.additional_potential_option_3}</div>
                    </AdditionalGrid>
                )}
                {option.additional_potential_option_grade && <DottedLine />}
                {option.soul_name && (
                    <div>
                        <SoulGrid>
                            <div>
                                <SoulSpan>{option.soul_name}</SoulSpan>
                            </div>
                            <div>{option.soul_option}</div>
                        </SoulGrid>
                        <DottedLine />
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default React.memo(ModalEquipment);
