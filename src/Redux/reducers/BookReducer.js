import { buyBook, sellBook } from "../constants/BookTypes"

const initialState = {
    numberOfBooks : 20
}

const BookReducer = (state = initialState, action) => {
    switch(action.type){
        case buyBook: return{
            ...state,
            numberOfBooks : state.initialState-1
        }
        case sellBook: return{
            ...state,
            numberOfBooks : state.initialState+1
        }
        default : return state
    }
}

export default BookReducer