
export const _validText= (text) => {
  if(!text) return text;
  if (text.length >= 40) {
    return `${text.substring(0, 40)}...`
  }
  return text;
};

export const _transformBooks = (book) => {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    description: book.volumeInfo.description || 'There is no description.',
    authors: book.volumeInfo.authors,
    image: book.volumeInfo.imageLinks?.thumbnail,
    categories: book.volumeInfo.categories
  };
};