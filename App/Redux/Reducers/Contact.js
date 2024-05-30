/* eslint-disable prettier/prettier */
import * as actionTypes from '../Constants/Types'

const initialState = {
    contactList: [],
    contactSpinner: false,
    addContactSpinner: false,
    editContactSpinner: false,
    deleteContactSpinner: false,
    errorModal: false
}

export const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    // ============= GET_ALL_CONTACT ===================
    case actionTypes.GET_ALL_CONTACT_REQUEST:
        return {
            ...state,
            contactSpinner: true,
            errorModal: false
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
    // ============= ADD_CONTACT ===================
    case actionTypes.ADD_CONTACT_REQUEST:
        return {
            ...state,
            addContactSpinner: true,
            errorModal: false
        };
    case actionTypes.ADD_CONTACT_SUCCESS:
        return {
            ...state,
            addContactSpinner: false,
            errorModal: false
        };
    case actionTypes.ADD_CONTACT_FAILED:
        return {
            ...state,
            addContactSpinner: false,
            errorModal: true
        };
    // ============= EDIT_CONTACT ===================
    case actionTypes.EDIT_CONTACT_REQUEST:
        return {
            ...state,
            editContactSpinner: true,
            errorModal: false
        };
    case actionTypes.EDIT_CONTACT_SUCCESS:
        return {
            ...state,
            editContactSpinner: false,
            errorModal: false
        };
    case actionTypes.EDIT_CONTACT_FAILED:
        return {
            ...state,
            editContactSpinner: false,
            errorModal: true
        };
    // ============= DELETE_CONTACT ===================
    case actionTypes.DELETE_CONTACT_REQUEST:
        return {
            ...state,
            deleteContactSpinner: true,
            errorModal: false
        };
    case actionTypes.DELETE_CONTACT_SUCCESS:
        return {
            ...state,
            deleteContactSpinner: false,
            errorModal: false
        };
    case actionTypes.DELETE_CONTACT_FAILED:
        return {
            ...state,
            deleteContactSpinner: false,
            errorModal: true
        };
    default:
      return state;
  }
};