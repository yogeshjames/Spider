import { configureStore } from 'redux';

const initialState = {
  searchTerm: 'Harry Potter',
  books: [],
  hasMore: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {// like which call 
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
        books: [], // Clear books 
        hasMore: true, // Reset hasMore when the search term changes
      };
    case 'ADD_BOOKS':
      return {
        ...state,
        books: [...state.books, ...action.payload],
        hasMore: action.payload.length >= 20, 
      };
    case 'SET_HAS_MORE':
      return {
        ...state,
        hasMore: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore(reducer);

export default store;
