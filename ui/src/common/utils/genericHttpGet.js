import axios from 'axios';

/**
 * Generic axios get request function
 *
 * @param {string} endpoint
 * @param {object} optional getParams
 * @param {string} serviceName
 * @returns {Promise<AxiosResponse<any, any> | void>} AxiosResponse
 *
 */
const axiosRequest = async (endpoint, getParams = undefined) => {
  let options;
  if (getParams) {
    options = {
      params: { ...getParams },
    };
  }
  try {
    const response = await axios.get(`${endpoint}`, options);
    return response.data;
  } catch (err) {
    const error = new Error();

    if (err.response) {
      // The client was given an error response (5xx, 4xx)
      error.message = err.response.statusText;
    } else if (err.request) {
      // The client never received a response, and the request never left
      error.message = 'Failed connecting to external services';
    } else {
      error.message = 'Oops! Something went wrong';
    }
    throw error;
  }
};

/**
 * Generic HTTP get higher order function for requests with axios
 *
 * @param {function} httpGetFn
 * @returns {Promise<AxiosResponse<any, any> | void>} AxiosResponse
 *
 */
function getWrapper(httpGetFn) {
  return async function _(...args) {
    return httpGetFn.call(this, ...args);
  };
}

const get = getWrapper(axiosRequest);

export default get;
