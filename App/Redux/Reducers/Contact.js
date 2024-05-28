/* eslint-disable prettier/prettier */
import * as actionTypes from '../Constants/Types'

const initialState = {
    contactList: [],
    contactSpinner: false,
    errorModal: false
}

export const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============= GET_ALL_CONTACT ===================
    case actionTypes.GET_ALL_CONTACT_REQUEST:
        return {
            ...state,
            contactSpinner: true,
        };
    case actionTypes.GET_ALL_CONTACT_SUCCESS:
        return {
            ...state,
            contactList: action.payload,
            contactSpinner: false,
            errorModal: false
        };
    case actionTypes.GET_ALL_CONTACT_FAILED:
        return {
            ...state,
            contactSpinner: false,
            errorModal: true
        };
    default:
      return state;
  }
};