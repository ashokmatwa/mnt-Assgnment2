import { buyBook, sellBook } from "../constants/BookTypes"

const purchaseBook = () => {
    return {
        type:buyBook
    }
}
const sell_Book = () => {
    return{
        type:sellBook
    }
}

export default purchaseBook;