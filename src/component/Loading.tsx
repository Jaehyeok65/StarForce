import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const Spinner = styled.div<{ $marginTop : string, $marginBottom : string}>`
    display: flex;
    justify-content: center;
    margin-top: ${(props) => props.$marginTop};
    margin-bottom: ${(props) => props.$marginBottom};
`;

const Loading = ({ height, width, marginTop, marginBottom } : { height : string, width : string, marginTop : string, marginBottom : string}) => {
    return (
        <Spinner $marginTop={marginTop} $marginBottom={marginBottom}>
            <ReactLoading
                type="spin"
                color="black"
                height={height}
                width={width}
            />
        </Spinner>
    );
};

export default React.memo(Loading);