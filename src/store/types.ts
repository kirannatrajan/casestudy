import { Action } from 'redux';

export interface NewsState {
  articles: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  source: string;
  date: string;
  category: string;
  author: string;
  query: string;
}

export const FETCH_ARTICLES_REQUEST = 'FETCH_ARTICLES_REQUEST' as const;
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS' as const;
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE' as const;
export const SET_FILTERS = 'SET_FILTERS' as const;

interface FetchArticlesRequestAction extends Action<typeof FETCH_ARTICLES_REQUEST> {}

interface FetchArticlesSuccessAction extends Action<typeof FETCH_ARTICLES_SUCCESS> {
  payload: any[];
}

interface FetchArticlesFailureAction extends Action<typeof FETCH_ARTICLES_FAILURE> {}

interface SetFiltersAction extends Action<typeof SET_FILTERS> {
  payload: Partial<NewsState>;
}

export type NewsAction =
  | FetchArticlesRequestAction
  | FetchArticlesSuccessAction
  | FetchArticlesFailureAction
  | SetFiltersAction;