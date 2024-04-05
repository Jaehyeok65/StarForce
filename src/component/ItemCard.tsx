import React from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa6';

const Card = styled.div`
    box-sizing: border-box;
    border: 1px solid gray;
    border-radius: 8px;
    overflow: hidden; /* 글자가 넘치는 부분을 숨김 */
    height: 100%;
    width: 100%;
    text-align: left;
    font-size: 13px;

    &:hover {
        transform: translateY(-4px);
        cursor: pointer;
    }
`;

const GridColumns = styled.div`
    display: grid;
    grid-template-columns: 19% 19% 65%;
`;

const GridRows = styled.div<{ $potential_option_grade: string | null }>`
    display: grid;
    grid-template-rows: ${(props) =>
        props.$potential_option_grade ? '1fr 1fr 1fr' : '1fr 1fr'};
    row-gap: 5px;
    margin: 5% 5% 5% 5%;
`;

const Potential = styled.div<{ $potential_option_grade: string }>`
    display: grid;
    grid-template-columns: 19% 19% 65%;
    color: ${(props) =>
        props.$potential_option_grade === '레전드리'
            ? '#228B22'
            : props.$potential_option_grade === '유니크'
            ? '#FF9100'
            : props.$potential_option_grade === '에픽'
            ? '#C71585'
            : '#46BEFF'};
`;

const Additional = styled.div<{ $potential_option_grade: string }>`
    display: grid;
    grid-template-columns: 19% 19% 65%;
    color: ${(props) =>
        props.$potential_option_grade === '레전드리'
            ? '#228B22'
            : props.$potential_option_grade === '유니크'
            ? '#FF9100'
            : props.$potential_option_grade === '에픽'
            ? '#C71585'
            : '#46BEFF'};
`;

const ItemCard = ({
    item,
    character_class,
    onClick,
}: {
    item: any;
    character_class: string;
    onClick: any;
}) => {
    const getAdditionaloptions = (
        part: string,
        item_add_option: any,
        character_class: string
    ) => {
        const parts = [
            '모자',
            '상의',
            '하의',
            '망토',
            '장갑',
            '신발',
            '펜던트',
            '얼굴장식',
            '눈장식',
            '귀고리',
            '벨트',
            '포켓 아이템',
        ];

        if (parts.includes(part)) {
            return getAddOption(item_add_option, character_class);
        }
    };

    const getAddOption = (item_add_option: any, character_class: any) => {
        const character: any = {
            히어로: 'str',
            팔라딘: 'str',
            다크나이트: 'str',
            소울마스터: 'str',
            미하일: 'str',
            블래스터: 'str',
            데몬슬레이어: 'str',
            데몬어벤져: 'max_hp',
            아란: 'str',
            카이저: 'str',
            아델: 'str',
            제로: 'str',
            '아크메이지(불,독)': 'int',
            '아크메이지(썬,콜)': 'int',
            비숍: 'int',
            플레임위자드: 'int',
            배틀메이지: 'int',
            에반: 'int',
            루미너스: 'int',
            일리움: 'int',
            라라: 'int',
            키네시스: 'int',
            보우마스터: 'dex',
            신궁: 'dex',
            패스파인더: 'dex',
            윈드브레이커: 'dex',
            와일드헌터: 'dex',
            메르세데스: 'dex',
            카인: 'dex',
            나이트로드: 'luk',
            섀도어: 'luk',
            듀얼블레이드: 'luk',
            나이트워커: 'luk',
            팬텀: 'luk',
            카데나: 'luk',
            칼리: 'luk',
            호영: 'luk',
            바이퍼: 'str',
            캐논슈터: 'str',
            스트라이커: 'str',
            캡틴: 'dex',
            메카닉: 'dex',
            은월: 'str',
            아크: 'str',
            엔젤릭버스터: 'dex',
            제논: 'all_stat',
        };

        if (character_class === '제논') {
            return (Number(item_add_option['str']) +
                Number(item_add_option['dex']) +
                Number(item_add_option['luk']) +
                Number(item_add_option['all_stat']) * 20 +
                Number(item_add_option['attack_power']) * 4) *
                0.6
                ? Math.round(
                      (Number(item_add_option['str']) +
                          Number(item_add_option['dex']) +
                          Number(item_add_option['luk']) +
                          Number(item_add_option['all_stat']) * 20 +
                          Number(item_add_option['attack_power']) * 4) *
                          0.6
                  ) + '급'
                : null;
        } else if (character_class === '데몬어벤져') {
            return Math.round(
                Number(item_add_option[character[character_class]]) / 25 +
                    Number(item_add_option['attack_power']) * 4
            )
                ? Math.round(
                      Number(item_add_option[character[character_class]]) / 25 +
                          Number(item_add_option['attack_power']) * 4
                  ) + '급'
                : null;
        }

        return Number(item_add_option[character[character_class]]) +
            Number(item_add_option['all_stat']) * 10 +
            Number(item_add_option['attack_power']) * 4 >
            0
            ? Number(item_add_option[character[character_class]]) +
                  Number(item_add_option['all_stat']) * 10 +
                  Number(item_add_option['attack_power']) * 4 +
                  '급'
            : null;
    };
    return (
        <React.Fragment>
            {item && (
                <Card onClick={onClick}>
                    <GridRows
                        $potential_option_grade={
                            item.additional_potential_option_grade
                        }
                    >
                        <GridColumns>
                            <img src={item.item_icon} alt={item.item_name} />
                            <div style={{ color: '#DAA520' }}>
                                {item.starforce > 0 && (
                                    <span>
                                        <FaStar />
                                        {item.starforce}
                                    </span>
                                )}
                            </div>
                            <div>
                                {item.item_name}
                                {item.special_ring_level ? (
                                    <span>
                                        &nbsp;
                                        {item.special_ring_level + '레벨'}
                                    </span>
                                ) : null}
                                &nbsp;
                                <span style={{ color: 'gray' }}>
                                    {getAdditionaloptions(
                                        item.item_equipment_part,
                                        item.item_add_option,
                                        character_class
                                    )}
                                </span>
                            </div>
                        </GridColumns>
                        {item.potential_option_grade && (
                            <Potential
                                $potential_option_grade={
                                    item.potential_option_grade
                                }
                            >
                                <div>잠재능력</div>
                                <div>{item.potential_option_grade}</div>
                                <div>
                                    <div>{item.potential_option_1}</div>
                                    <div>{item.potential_option_2}</div>
                                    <div>{item.potential_option_3}</div>
                                </div>
                            </Potential>
                        )}
                        {item.additional_potential_option_grade && (
                            <Additional
                                $potential_option_grade={
                                    item.additional_potential_option_grade
                                }
                            >
                                <div>에디셔널</div>
                                <div>
                                    {item.additional_potential_option_grade}
                                </div>
                                <div>
                                    <div>
                                        {item.additional_potential_option_1}
                                    </div>
                                    <div>
                                        {item.additional_potential_option_2}
                                    </div>
                                    <div>
                                        {item.additional_potential_option_3}
                                    </div>
                                </div>
                            </Additional>
                        )}
                    </GridRows>
                </Card>
            )}
        </React.Fragment>
    );
};

export default React.memo(ItemCard);
