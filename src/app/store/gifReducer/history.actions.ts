import { createAction, props } from '@ngrx/store';

type Props = {
  payload?: Record<string | number, unknown>
}

export const addHistory = createAction(
  '[History Component] addHistory',
  props<Props>()
);

export const removeHistory = createAction(
  '[History Component] removeHistory',
  props<Props>()
);

export const gifSearching = createAction(
  '[Searching Component] gifSearching',
  props<Props>()
);

export const gifOffset = createAction(
  '[Searching Component] gifOffset',
  props<Props>()
);

export const onlySearch = createAction(
  '[Searching Component] onlySearch',
  props<Props>()
);
