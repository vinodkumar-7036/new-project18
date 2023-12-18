import {
  ADD_FORM_DATA,
  EDIT_FORM_DATA,
  UPDATE_FORM_DATA,
  DELETE_FORM_DATA,
  SET_USER_DATA,
} from "./Actions";

const initialState = {
  formData: [
    // {
    //   firstName: "santhosh",
    //   lastName: "Tumala",
    //   phone: 46546546,
    // },
    // {
    //   firstName: "Vinod",
    //   lastName: "G",
    //   phone: 7979979,
    // },
  ],
  editingIndex: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FORM_DATA:
      return {
        ...state,
        formData: [...state.formData, action.payload],
      };
    case SET_USER_DATA:
      return {
        ...state,
        formData: [...state.formData, ...action.payload],
      };

    case EDIT_FORM_DATA:
      return {
        ...state,
        editingIndex: action.payload,
      };

    case UPDATE_FORM_DATA:
      const updatedFormData = [...state.formData];
      updatedFormData[action.payload.index] = action.payload.newData;
      return {
        ...state,
        formData: updatedFormData,
        editingIndex: null,
      };

    case DELETE_FORM_DATA:
      return {
        ...state,
        formData: state.formData.filter((_, index) => index !== action.payload),
        editingIndex: null,
      };

    default:
      return state;
  }
};

export default reducer;
