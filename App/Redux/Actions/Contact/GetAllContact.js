import { URL_CONTACT } from "../../../Configs/GlobalUrl"
import * as ActionTypes from '../../Constants/Types'

export const GetAllContact = () => {
    return dispatch => {
       dispatch({
           type: ActionTypes.GET_ALL_CONTACT_REQUEST
       })
       fetch(`${URL_CONTACT}`, {
           method: "GET",
           redirect: "follow"
       }).then(response => {
           return response.json()
       }).then(data => {
           console.log("GET_ALL_CONTACT: ", data);
           dispatch({
               type: ActionTypes.GET_ALL_CONTACT_SUCCESS,
               payload: data
           })
       }).catch(data => {
           console.log("ERROR", data.message)
           dispatch({
               type: ActionTypes.GET_ALL_CONTACT_FAILED,
               error: data.message,
           })
       })
   }
}