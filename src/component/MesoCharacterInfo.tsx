import React from 'react';
import styled from 'styled-components';
import ModalProperty from './ModalProperty';
import { FaRegTrashCan } from 'react-icons/fa6';

const Info = styled.div`
    font-size: 11px;
    display: grid;
    place-items: center;
    gap: 8px;
`;

const ImageContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: start;
    align-items: end;
`;

const ImageInfo = styled.div`
    display: grid;
    row-gap: 5px;
    margin-left: 2.5px;

    @media screen and (max-width: 1300px) {
        margin-left: -2px;
    }
`;

const Checkbox = styled.input`
    width: 20px;
    height: 16px;
    border: 1px solid gray;
    border-radius: 4px;
`;

const Button = styled.button`
    border: 1px solid gray;
    background-color: white;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    white-space: nowrap;
`;

const Inner = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    place-items: center;
`;

// Styled Components 정의
const InputContainer = styled.div`
    font-size: 13px;
`;

interface mesoinfo {
    ocid: string; //캐릭터 ocid
    mesoArray: any[]; //meso 관련 배열
    done: boolean; //재획 완료 여부
    mesoToggle: boolean;
    setMesoToggle: any;
    data: any;
    onMesoDoneChange: any;
    onCharacterDelete: any;
    meso: any;
    erda: any;
    onClickCharacterInfo: any;
    onMesoPlus: any;
    onInputChange : any;
    setMeso : any;
    setErda : any;
}

const MesoCharacterInfo: React.FC<mesoinfo> = ({
    data,
    mesoArray,
    done,
    mesoToggle,
    setMesoToggle,
    ocid,
    onMesoDoneChange,
    onCharacterDelete,
    meso,
    erda,
    onClickCharacterInfo,
    onMesoPlus,
    onInputChange,
    setMeso,
    setErda
}) => {
    return (
        <React.Fragment>
            <Info>
                <ImageContainer>
                    <img
                        src={data?.character_image}
                        alt={data?.character_name}
                    />
                    <ImageInfo>
                        <div>{data?.character_name}</div>
                        <div>{data?.character_level + '레벨'}</div>
                        <div>{data?.character_class}</div>
                        <div>
                            <Button
                                onClick={() =>
                                    onClickCharacterInfo(data?.character_name)
                                }
                            >
                                상세보기
                            </Button>
                        </div>
                    </ImageInfo>
                </ImageContainer>
                <InputContainer>
                    <img
                        src="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                        width="13px"
                        alt="메소"
                    />
                    &nbsp;
                    {meso && meso.toLocaleString()}&nbsp;메소
                </InputContainer>
                <InputContainer>
                    <img
                        src="image/jogak.PNG"
                        width="15px"
                        alt="솔에르다조각"
                    />
                    &nbsp;
                    {erda && erda}&nbsp;개
                </InputContainer>
                <div>
                    <Button onClick={() => setMesoToggle(ocid)}>입력</Button>
                </div>
                <Inner>
                    <div>
                        {
                            <Checkbox
                                type="checkbox"
                                checked={done}
                                onChange={() => onMesoDoneChange(ocid)}
                            />
                        }
                    </div>
                    <div>
                        <Button onClick={() => onCharacterDelete(ocid)}>
                            <FaRegTrashCan />
                        </Button>
                    </div>
                </Inner>
            </Info>
            <ModalProperty
                ocid={ocid}
                mesoImage="https://blog.kakaocdn.net/dn/b0X6lJ/btsudNKFlPl/3juzbOo44XtqIJkXTwGPq1/img.png"
                erdaImage="image/jogak.PNG"
                toggle={mesoToggle}
                meso={meso}
                erda={erda}
                setToggle={setMesoToggle}
                onMesoPlus={onMesoPlus}
                onCancle={() => console.log('하이')}
                onInputChange={onInputChange}
                setMeso={setMeso}
                setErda={setErda}
            />
        </React.Fragment>
    );
};

export default React.memo(MesoCharacterInfo);
