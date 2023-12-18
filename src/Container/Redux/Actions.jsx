export const ADD_FORM_DATA = "ADD_FORM_DATA";
export const EDIT_FORM_DATA = "EDIT_FORM_DATA";
export const UPDATE_FORM_DATA = "UPDATE_FORM_DATA";
export const DELETE_FORM_DATA = "DELETE_FORM_DATA";
export const SET_USER_DATA = "SET_USER_DATA";

export const setUserData = (data) => ({
  type: SET_USER_DATA,
  payload: data,
});
export const addFormData = (data) => ({
  type: ADD_FORM_DATA,
  payload: data,
});

export const editFormData = (index) => ({
  type: EDIT_FORM_DATA,
  payload: index,
});

export const updateFormData = (index, newData) => ({
  type: UPDATE_FORM_DATA,
  payload: { index, newData },
});

export const deleteFormData = (index) => ({
  type: DELETE_FORM_DATA,
  payload: index,
});
