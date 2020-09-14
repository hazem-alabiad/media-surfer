export const DESIGN_SYSTEM = {
  // #############################################
  // ##############   Properties   ###############
  // #############################################

  // #############################################
  // ################   Methods   ################
  // #############################################
  setColor:
    /**
     * @param {boolean} isText
     * @returns {object} if isText true, return text color styling
     * else, returns background color styling object.
     */
    (isText, color) => {
      return isText ? { color } : { backgroundColor: color };
    },

  setTopMargin: (margin = "12rem") => {
    return { marginTop: margin };
  },

  setFontSize: (size: "2rem") => ({
    fontSize: size,
  }),

  many: (...objects) => {
    return objects.reduce((answer, item) => {
      for (const [key, value] of Object.entries(item)) {
        answer[key] = value;
      }
      return answer;
    }, {});
  },
};
