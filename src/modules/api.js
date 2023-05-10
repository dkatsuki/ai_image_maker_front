import axios from 'axios';
import queryParser from 'query-string-parser';
import enviroment from 'modules/clientEnviroment';

const addQuery = (url, query) => {
  if (query) {
    return url + '?' + queryParser.toQuery(query);
  } else {
    return url;
  }
}

const isValidJson = (value) => {
  if (typeof(value) !== 'string') {
    return false;
  }

  try {
    JSON.parse(value)
  } catch (e) {
    return false
  }

  return true
}

class Api {
	constructor() {
    this.origin = enviroment.apiOrigin;
	}

	addAuthHeaders = (baseConfig = {}) => {
    let data = localStorage.getItem('User');
    let headers;

    if (!!baseConfig.headers) {
      headers = {...baseConfig.headers};
    } else if (isValidJson(data)) {
      data = JSON.parse(data);
      headers = {
        'access-token': data['access-token'],
        'client': data.client,
        'uid': data.uid,
      };
    } else {
      headers = {}
    }

    return({
      ...baseConfig,
      data: (baseConfig.data ? baseConfig.data : {}),
      headers: headers,
    });
	}

	requestUrl = (path) => {
		return this.origin + path;
	}

	httpGet = (path, callback, config = {}) => {
		axios.get(this.requestUrl(path), this.addAuthHeaders(config))
    .then((response) => {
			callback(response.data);
		})
    .catch((response) => {
      console.log(response)
		})
	}

	asyncHttpGet = (path, config = {}) => {
    return(axios.get(this.requestUrl(path), this.addAuthHeaders(config)));
	}

	httpPost = (path, data, callback, config = {}) => {
		axios.post(this.requestUrl(path), data, this.addAuthHeaders(config))
    .then((response) => {
			callback(response.data);
		})
    .catch((response) => {
      callback(response);
		})
	}

	httpPatch = (path, data, callback, config = {}) => {
		axios.patch(this.requestUrl(path), data, this.addAuthHeaders(config))
    .then((response) => {
			callback(response);
		})
    .catch((response) => {
      callback(response);
		})
	}

	httpPut = (path, data, callback, config = {}) => {
		axios.patch(this.requestUrl(path), data, this.addAuthHeaders(config))
    .then((response) => {
			callback(response.data);
		})
    .catch((response) => {
      callback(response);
		})
	}

  httpDelete = (path, callback = () => {}, config = {}) => {
    axios.delete(this.requestUrl(path), this.addAuthHeaders(config))
    .then((response) => {
      callback(response);
		})
    .catch((response) => {
      callback(response);
		})
  }

  makeEndpoint = (path, query = null) => {
    const originAndPath = `${this.origin}${path}`;

    if (!query) {
      return(originAndPath);
    }

    return(addQuery(originAndPath, query))
  }
}

export default new Api();