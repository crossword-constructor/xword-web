import { useState, useEffect } from 'react';
/**
 * @function useErrorMessage - custom hook
 * @param  {String} message
 * @description sets an error message and then clears it --- consider passing in time to clear as a param
 * @returns {Array}
 * @property {String} errorMessage
 * @property {Function} setErrorMessage
 *
 */
function useErrorMessage(message) {
  const [errorMessage, setErrorMessage] = useState(message);
  useEffect(() => {
    let timer;
    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [errorMessage]);
  return [errorMessage, setErrorMessage];
}

export default useErrorMessage;
