// ##################   Globals   ##################
const validYear = (str) => {
  return /^(19\d{2}|20\d{2})$/.test(str) ? undefined : "Invalid year!";
};

/**
 * @param {object} values
 * @param {string} values.title
 * @param {string} values.year
 */
const searchValidator = (values) => {
  const errors = {
    title: undefined,
    year: undefined,
  };

  // #########    Title    #########
  if (!values.title) {
    errors.title = "Required!";
  }

  // #########   year    #########
  if (!values.year) {
    errors.year = "Required!";
  } else {
    errors.year = validYear(values.year);
  }

  return errors;
};

export default searchValidator;
