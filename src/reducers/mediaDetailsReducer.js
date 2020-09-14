import { MEDIA_DETAILS_ACTION_TYPES } from "constants/mediaDetailsActionTypes";

/**
 *
 * @param {object[]} state
 * @param {object} action
 * @param {string} action.type
 * @param {object} action.payload
 * @returns {object}
 */
const mediaDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MEDIA_DETAILS_ACTION_TYPES.FETCH_MEDIA_DETAILS:
      return { ...action.payload };
    default:
      return state;
  }
};

export default mediaDetailsReducer;
