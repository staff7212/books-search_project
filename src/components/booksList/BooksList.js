import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { store } from '../../store';
import { selectAll } from './booksSlice';
import { fetchBooks } from './booksSlice';
import { _validText } from '../../services/services';

import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

import book from '../../resources/book.jpg'
import "./booksList.scss";

const BooksList = () => {

  const [offset, setOffset] = useState(30);

  const {booksLoadingStatus, newLoading, totalBooks, requestData} = useSelector(state => state.books)
  const books = selectAll(store.getState());
  const dispatch = useDispatch();

  if (booksLoadingStatus === "loading" && newLoading) {
    return <Spinner/>;
  } else if (booksLoadingStatus === "error") {
    return <Error/>
  }

  const onLoadMore = () => {
    dispatch(fetchBooks({...requestData, offset}));
    setOffset(offset => offset + 30);
  }

  const renderBooksList = (arr) => {
    return arr.map(({id, categories, title, authors, image}) => {
      return (
        <Link key={id} to={`book/${id}`}>
          <li className="book-item">
            <div className="book-item__img">
              <img src={image ? image : book} alt="book" />
            </div>
            <div className="book-item__categoties">{categories ? categories[0] : ''}</div>
            <div className="book-item__name">{_validText(title)}</div>
            <div className="book-item__author">{authors ? _validText(authors.join(', ')) : ''}</div>
          </li>
        </Link>
      )
    })
  }

  const elements = renderBooksList(books)

  return (
    <div className="books-list">
      <div className="found-results">
      {`Found ${totalBooks} results`}
      </div>
      <ul className="books-grid">
        {elements}
      </ul>
      {elements.length ? 
        <button 
          className="books-list__btn"
          onClick={onLoadMore}>
          load more
        </button> : null}
    </div>
  )
};
export default BooksList;
