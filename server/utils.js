/**
 * @param  {Object} payload - note: the key must match the Response type defs
 * e.g., payload = {user: userobject} wehn Response type def includes user
 * @param  {Object} error
 * @param {String} error.message
 */
export const generateResponse = (payload, error) => {
  if (error) {
    return {
      code: '500',
      message: error.message || 'Internal Server Error',
      success: false,
    };
  }
  if (payload) {
    return {
      message: 'success',
      success: true,
      code: '200',
      ...payload,
    };
  }
};

export const formatMongoError = () => {};

// exoprt const errors = {

// }
