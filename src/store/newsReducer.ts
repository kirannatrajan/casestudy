import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { NewsState, NewsAction } from './types';
import { fetchNews } from '../services/newsService';
import { RootState } from './store';

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, NewsAction>;

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE';
export const SET_FILTERS = 'SET_FILTERS';

const initialState: NewsState = {
  query: '',
  articles: [],
  status: 'idle',
  source: 'newsapi',
  date: '',
  category: '',
  author: '',
};

const newsReducer = (state = initialState, action: NewsAction): NewsState => {
  switch (action.type) {
    case FETCH_ARTICLES_REQUEST:
      return { ...state, status: 'loading' };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, status: 'succeeded', articles: action.payload };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, status: 'failed' };
    case SET_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const fetchArticles =
  ({ query, source, date, category, author }: Partial<NewsState>): AppThunk =>
  async (dispatch: Dispatch<NewsAction>) => {
    dispatch({ type: FETCH_ARTICLES_REQUEST });

    try {
      const response = await fetchNews(query || 'latest', source || 'newsapi', date || '', category || '', author || '');

      let articles = response.articles || response.response?.docs || response.response?.results;
  
      if (author) {
        articles = articles.filter((article: any) =>
          (article.author?.toLowerCase() === author.toLowerCase()) || 
          (article.byline?.original?.toLowerCase() === author.toLowerCase()) ||
          (article.fields?.byline?.toLowerCase() === author.toLowerCase())
        );
      }

      dispatch({ type: FETCH_ARTICLES_SUCCESS, payload: articles || response.response?.docs || response.response?.results });
    } catch (error) {
      dispatch({ type: FETCH_ARTICLES_FAILURE });
    }
  };

export const setFilters = (filters: Partial<NewsState>): NewsAction => ({
  type: SET_FILTERS,
  payload: filters,
});

export default newsReducer;