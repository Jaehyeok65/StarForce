import { SHOW_ALERT, HIDE_ALERT } from '../reducer/alertbox';

export const showAlert = (message: string, id: string, duration: number) => {
    return {
        type: SHOW_ALERT,
        payload: { message, id, duration },
    };
};

export const hideAlert = (id: string) => ({
    type: HIDE_ALERT,
    payload: id,
});
