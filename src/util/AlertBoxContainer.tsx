import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AlertBox from './AlertBox';

const Container = styled.div``;

const AlertBoxContainer = () => {
    const alerts = useSelector((state: any) => state.alertbox.alerts);
    const interval = 60;

    return (
        <Container>
            {alerts?.map((alert: any, index: number) => (
                <AlertBox
                    key={alert.id}
                    message={alert.message}
                    duration={alert.duration}
                    height={index * interval}
                    id={alert.id}
                />
            ))}
        </Container>
    );
};

export default React.memo(AlertBoxContainer);
