import { MEDIAS_ACTION_TYPES } from "constants/mediasActionTypes";

/**
 *
 * @param {object[]} state
 * @param {object} action
 * @param {string} action.type
 * @param {object} action.payload
 * @returns {object}
 */
const mediasReducer = (state = [], action) => {
  switch (action.type) {
    case MEDIAS_ACTION_TYPES.FETCH_MEDIAS:
      return [...action.payload];
    case MEDIAS_ACTION_TYPES.LOADING_MEDIAS:
      return null;
    default:
      return state;
  }
};

export default mediasReducer;
