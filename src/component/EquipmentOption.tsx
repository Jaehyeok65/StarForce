import React from 'react';
import styled from 'styled-components';

const StarForceShame = styled.span`
    color: #ffaf0a;
`;

const PlusShame = styled.span`
    color: #20b2aa;
`;

const AddOptionShame = styled.span`
    color: #94eb3e;
`;

const BasicShame = styled.span`
    color: black;
`;

const EtcShame = styled.span`
    color: #7b68ee;
`;

interface EquipmentOptionProps {
    option: any;
    part: string;
}

const EquipmentOption: React.FC<EquipmentOptionProps> = ({ option, part }) => {
    const getPlusOption = (option: any, part: any) => {
        // 기본옵션 외에 추가옵션이 붙는다면 컬러를 표시해야함
        if (
            option.item_add_option[part] &&
            option.item_add_option[part] !== '0'
        ) {
            return true;
        } else if (
            option.item_etc_option[part] &&
            option.item_etc_option[part] !== '0'
        ) {
            return true;
        } else if (
            option.item_starforce_option[part] &&
            option.item_starforce_option[part] !== '0'
        ) {
            return true;
        }
        return false;
    };

    const getStatName = (part: any) => {
        if (part === 'boss_damage') {
            return '보스 몬스터 공격 시 데미지';
        } else if (part === 'damage') {
            return '데미지';
        } else if (part === 'ignore_monster_armor') {
            return '몬스터 방어율 무시';
        } else if (part === 'max_hp') {
            return '최대 HP';
        } else if (part === 'all_stat') {
            return '올스탯';
        } else if (part === 'attack_power') {
            return '공격력';
        } else if (part === 'magic_power') {
            return '마력';
        } else {
            return part.toUpperCase();
        }
    };

    const getStatProperty = (stat: any, part: any) => {
        if (
            part === 'boss_damage' ||
            part === 'all_stat' ||
            part === 'ignore_monster_armor' ||
            part === 'damage'
        ) {
            return stat + '%';
        }
        return stat;
    };

    const getTotalStat = (option: any, part: any) => {
        return (
            <div>
                <PlusShame>
                    {getStatName(part) +
                        ' : +' +
                        getStatProperty(option.item_total_option[part], part)}
                </PlusShame>
                <BasicShame>{' ('}</BasicShame>
                {Number(option.item_base_option[part]) > 0 ? (
                    <BasicShame>
                        {getStatProperty(option.item_base_option[part], part)}
                    </BasicShame>
                ) : (
                    <BasicShame>{getStatProperty('0', part)}</BasicShame>
                )}
                {Number(option.item_add_option[part]) > 0 && (
                    <AddOptionShame>
                        {' +' +
                            getStatProperty(option.item_add_option[part], part)}
                    </AddOptionShame>
                )}
                {Number(option.item_etc_option[part]) > 0 && (
                    <EtcShame>
                        {' +' +
                            getStatProperty(option.item_etc_option[part], part)}
                    </EtcShame>
                )}
                {Number(option.item_starforce_option[part]) > 0 && (
                    <StarForceShame>
                        {' +' +
                            getStatProperty(
                                option.item_starforce_option[part],
                                part
                            )}
                    </StarForceShame>
                )}
                <BasicShame>{')'}</BasicShame>
            </div>
        );
    };

    const getBasicStat = (option: any, part: any) => {
        return (
            <BasicShame>
                {getStatName(part) +
                    ' : +' +
                    getStatProperty(option.item_base_option[part], part)}
            </BasicShame>
        );
    };

    return (
        <>
            {option.item_total_option[part] > 0 ? (
                getPlusOption(option, part) ? (
                    <div>{getTotalStat(option, part)}</div>
                ) : (
                    <div>{getBasicStat(option, part)}</div>
                )
            ) : null}
        </>
    );
};

export default React.memo(EquipmentOption);
