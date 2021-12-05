import { Action, createReducer, on } from '@ngrx/store';
import { addHistory, gifOffset, onlySearch, removeHistory, gifSearching } from './history.actions';

export const initialState = {
  history: [],
  searching: true,
  offset: 0,
  onlySearch: ''
};

const _historyReducer = createReducer(
  initialState,
  on(addHistory, (state, action) => { 
    const add = action.payload.text;
    const newHistory = state.history
    .filter((v: string) => v !== add);

    return {
      ...state,
      history: [...newHistory, add],
    };
  }),
  on(removeHistory, (state, action) => {
    const remove = action.payload.text;

    if(!remove) return state;

    const history = state.history
    .filter((v: string) => v !== remove);

    return {
      ...state,
      history: history,
    };
  }),
  on(gifSearching, (state, action) => {
    return {
      ...state,
      searching: action.payload.searching
    }
  }),
  on(gifOffset, (state, action) => {
    return {
      ...state,
      offset: action.payload.offset
    }
  }),
  on(onlySearch, (state, action) => {
    return {
      ...state,
      onlySearch: action.payload.onlySearch
    }
  })
)

export function historyReducer(state, action: Action) {
  return _historyReducer(state, action);
}