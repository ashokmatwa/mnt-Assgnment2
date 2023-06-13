// import {createSlice} from '@reduxjs/toolkit'

// const useSlice = createSlice({
    
// })
const initialState = {
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    gender: '',
    check: false,
  };
  
  const formDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FORM_DATA':
        return {
          ...state,
          // ...action.payload,
          formData: {
            ...state.formData,
            ...action.payload,
          },
        };
      default:
        return state;
    }
  };
  
  export default formDataReducer;
