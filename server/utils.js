export const generateResponse = (payload, error) => {
  console.log({ payload });
  if (error) {
    return {
      code: '500',
      message: error.message || 'Internal Server Error',
      success: false,
    };
  }
  if (payload) {
    /** @todo setup for multiplt response objects */
    const key = Object.keys(payload)[0];
    return {
      [key]: payload[key],
      message: 'success',
      success: true,
      code: '200',
    };
  }
};

// exoprt const errors = {

// }
