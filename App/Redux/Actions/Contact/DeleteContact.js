import { URL_CONTACT } from "../../../Configs/GlobalUrl";
import * as ActionTypes from '../../Constants/Types';

export const DeleteContact = (contactId) => {
    return async (dispatch) => {
        dispatch({
            type: ActionTypes.DELETE_CONTACT_REQUEST
        });
        const controller = new AbortController();
        const { signal } = controller;
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, 10000);
        try {
            const response = await fetch(`${URL_CONTACT}/${contactId}`, {
                method: "DELETE",
                headers: {
                    Accept: '*/*'
                },
                redirect: "follow",
                signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(`Server responded with status ${response.status}: ${JSON.stringify(errorData)}`);
            }

            const responseData = await response.text();
            console.log("DELETE_CONTACT: ", responseData);
            
            if (responseData.statuscode === 400) {
                dispatch({
                    type: ActionTypes.DELETE_CONTACT_FAILED,
                    payload: responseData
                });
                throw new Error("Bad Request");
            }

            dispatch({
                type: ActionTypes.DELETE_CONTACT_SUCCESS,
                payload: responseData
            });
        } catch (error) {
            console.error("ERROR", error.message);
            dispatch({
                type: ActionTypes.DELETE_CONTACT_FAILED,
                error: error.message,
            });
        }
    };
};
