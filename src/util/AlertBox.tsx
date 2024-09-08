import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { hideAlert } from '../redux/action';

const NotificationBox = styled.div<{ height: number }>`
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 8px;
    border: 1px solid gray;
    padding: 15px;
    background-color: #787878;
    color: white;
    z-index: 1000;
    transition: opacity 0.3s ease-in-out;
    display: inline-block;
    text-align: center;
    white-space: nowrap;
    margin-bottom: ${(props) => `${props.height}px`};
`;

const AlertBox = ({
    message,
    duration,
    height,
    id,
}: {
    message: string;
    duration: number;
    height: number;
    id: string;
}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(hideAlert(id));
        }, duration || 4000);

        return () => clearTimeout(timer);
    }, [id, dispatch, duration]);

    return <NotificationBox height={height}>{message}</NotificationBox>;
};

export default React.memo(AlertBox);