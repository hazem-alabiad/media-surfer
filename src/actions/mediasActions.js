import { MEDIAS_ACTION_TYPES } from "constants/mediasActionTypes";

export const fetchMedias = (medias: Object[]): Object => ({
  type: MEDIAS_ACTION_TYPES.FETCH_MEDIAS,
  payload: medias,
});

export const loadingMedias = (): Object => ({
  type: MEDIAS_ACTION_TYPES.LOADING_MEDIAS,
});
