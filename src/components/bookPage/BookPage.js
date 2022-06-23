import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';

import { selectById } from '../booksList/booksSlice';
import { store } from '../../store';

import bookImg from '../../resources/book.jpg'
import './bookPage.scss';

const BookPage = () => {

  const {id} = useParams();

  const {categories, title, authors, image, description} = selectById(store.getState(), id);

  return (
    <div className="book-page">
      <div className="book-page_left">
        <div className="book-page__img">
        <img src={image ? image : bookImg} alt="book" />
        </div>
      </div>
      <div className="book-page_right">
        <div className="book-page__categoties">{categories ? categories.join('/ ') : ''}</div>
        <div className="book-page__name">{title}</div>
        <div className="book-page__author">{authors ? authors.join(', ') : ''}</div>
        <div className="book-page__decription">{description}</div>
        <Link to='/'>
          <div className="back">Back to all</div>
        </Link>
      </div>
    </div>
  )
};

export default BookPage;