
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import BookPage from "../bookPage/BookPage";
import BooksList from "../booksList/BooksList";
import SearchPanel from "../searchPanel/SearchPanel";

const App = () => {

  return (
    <Router>
      <header>
        <SearchPanel/>
      </header>
        <main>
          <Routes>
            <Route path="/" element={<BooksList/>}/>
            <Route path="book/:id" element={<BookPage/>}/>
          </Routes>
        </main>
    </Router>
  )
};

export default App;