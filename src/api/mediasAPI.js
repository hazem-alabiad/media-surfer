import Axios from "axios";
import { MEDIAS_TOTAL_NUMBER, PAGINATION_URL } from "constants/localStorage";
import { HOST_URL } from "constants/urls";
import { setItem, setObject } from "helpers/localStorageHelpers";
import { toast } from "react-toastify";

/**
 *
 * @param {number} page
 * @param {string} title
 * @param {string} year
 * @param {string} type
 */
const getParams = (page: Number, title: String, year: String, type: String) => {
  if (type) {
    setObject(
      PAGINATION_URL,
      `${HOST_URL}&s=${title}&y=${year}&type=${type}&page=${page}`
    );
    return {
      s: title,
      y: year,
      type: type,
      page: page,
    };
  } else {
    setObject(PAGINATION_URL, `${HOST_URL}&s=${title}&y=${year}&page=${page}`);
    return {
      s: title,
      y: year,
      page: page,
    };
  }
};

/**
 *
 * @param {Function} fetchAction
 * @param {string} page
 * @param {string} title
 * @param {string} year
 * @param {string} type
 */
export const apiMediaSearchByTitle = (
  fetchAction: Function,
  page: String = 1,
  type: String = null,
  title: String = "Pokemon",
  year: String = ""
) => {
  Axios.get(HOST_URL, {
    params: getParams(page, title, year, type),
  }).then((res) => {
    // Convert the response data type from string to boolean
    res.data.Response = res.data.Response === "True" ? true : false;

    if (res.status === 200) {
      const { Search, totalResults, Response } = res.data;
      // If success
      if (Response) {
        toast.success(`${totalResults} medias have been fetched successfully!`);
        setItem(MEDIAS_TOTAL_NUMBER, totalResults);
        console.log(res.data);
        fetchAction(Search);
      }

      // If failure
      else {
        console.error(res.data.Error);
        toast.error("There was an error while fetching the medias!");
      }
    }
  });
};

/**
 *
 * @param {Function} fetchAction
 * @param {string} page
 * @param {string} title
 * @param {string} year
 * @param {string} type
 */
export const apiMediaSearchByImdbId = (
  fetchAction: Function,
  imdbId: String
) => {
  Axios.get(HOST_URL, {
    params: {
      i: imdbId,
    },
  }).then((res) => {
    // Convert the response data type from string to boolean
    res.data.Response = res.data.Response === "True" ? true : false;

    if (res.status === 200) {
      const { Response } = res.data;
      // If success
      if (Response) {
        toast.success(`Media details have been fetched successfully!`);
        // console.log(res.data);
        fetchAction(res.data);
      }

      // If failure
      else {
        console.error(res.data.Error);
        toast.error("There was an error while fetching the media details!");
      }
    }
  });
};
