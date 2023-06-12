import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import purchaseBook from './Redux/actions/BookAction'

const Book = () => {
  const numberOfBooks = useSelector(state => state.numberOfBooks)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Book</h2>
      <h2>Number of Books : {numberOfBooks}</h2>
      <Button onClick={() => dispatch(purchaseBook())}>Buy Book</Button>
    </div>
  )
}

export default Book
