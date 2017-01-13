import superagent from 'superagent'
import superagentPromise from 'superagent-promise'
import { Promise } from 'es6-promise'

const request = superagentPromise(superagent, Promise);
const buildApiUrl = (path) => {
  return `${process.env.API_URL}/api/v1/${path}`;
};

export default {
  get(path, params={}, headers={}){
    this._buildHeaders(headers);
    return request.get(buildApiUrl(path), params).set(headers).end();
  },

  _buildHeaders(headers) {
    if (!headers['Accept']) headers['Accept'] = 'application/json';
    if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';

    // Get CSRF token so Rails allows us to keep session in server side.
    // TODO: Remove this when ALL app gets Reactify. We should keep the session in the front-end. If the server returns us a 401/403 we need to remove the credentials and redirect the user to login again.

    if(typeof(document) == 'object'){
      const csrfToken = document.querySelector('meta[name="csrf-token"]');
      if (csrfToken) headers['X-CSRF-Token'] = csrfToken.getAttribute('content');
    }
    return headers;
  }
}
