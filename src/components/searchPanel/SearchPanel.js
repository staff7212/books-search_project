
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchBooks, addRequestData} from '../booksList/booksSlice';

import "./searchPanel.scss";

const SearchPanel = () => {

  const [book, setBook] = useState('');
  const [categories, setCategories] = useState('');
  const [sort, setSort] = useState('relevance');

  const dispatch = useDispatch();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if(!book) return;
    
    const newRequestData = {book, categories, sort};
    dispatch(addRequestData(newRequestData))
    dispatch(fetchBooks(newRequestData));

    setBook('');
    setCategories('');
    setSort('relevance');
  };

  return (
    <div className="search-panel">
      <h1 className="search-panel__title">Search for books</h1>

      <form id="form" className="search-panel__form" onSubmit={onSubmitHandler}>
        <Link to='/'>
        <input 
          className="search-panel__input" 
          type="text" 
          required
          placeholder='Find a book!'
          id="book" 
          value={book}
          onChange={e => setBook(e.target.value)} />
        </Link>

        <div className="search-panel__btn" onClick={onSubmitHandler}>&#128269;</div>
      </form>
      <div className="search-panel__select-block">
        <div className="search-panel__select_one">
          <label className="label" htmlFor="categories">Categories</label>
          <select 
            className="search-panel__select search-panel__select_one" 
            name="categories"
            onChange={e => setCategories(e.target.value)}
            value={categories}>
            <option value="">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
        </div>
        <div className="search-panel__select_two">
        <label className="label" htmlFor="sort">Sorting by</label>
          <select 
            className="search-panel__select search-panel__select_two" 
            name="sort"
            onChange={e => setSort(e.target.value)}
            value={sort}>
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  )
};

export default SearchPanel;