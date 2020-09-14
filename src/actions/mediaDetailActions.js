import { MEDIA_DETAILS_ACTION_TYPES } from "constants/mediaDetailsActionTypes";

export const fetchMediaDetails = (media: Object): Object => ({
  type: MEDIA_DETAILS_ACTION_TYPES.FETCH_MEDIA_DETAILS,
  payload: media,
});
