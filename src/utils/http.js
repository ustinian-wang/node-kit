import https from 'https';
import http from 'http';

/**
 * 发送 HTTP 请求
 * @param {Object} options 请求的选项
 * 
 * @returns {Promise<Object>} 请求响应的 JSON 数据
 */
export function httpRequest(options) {
  const { method, url, headers = {}, body = null } = options;
  const methodUpper = method.toUpperCase();

  const requestOptions = {
    method: methodUpper,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  const protocol = url.startsWith('https') ? https : http;

  return new Promise((resolve, reject) => {
    const req = protocol.request(url, requestOptions, (res) => {
      let data = '';
      
      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          resolve(jsonResponse);
        } catch (error) {
          reject(new Error('Response is not valid JSON'));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    // If there's a body (for POST or PUT requests), write it to the request
    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}


export function httpGet(options) {
  return httpRequest({ ...options, method: 'GET' });
}

/**
 * 发送 POST 请求
 * @param {Object} options 请求的选项
 * @returns {Promise<Object>} 请求响应的 JSON 数据
 */
export function httpPost(options) {
  return httpRequest({ ...options, method: 'POST' });
}

/**
 * 发送 PUT 请求
 * @param {Object} options 请求的选项
 * @returns {Promise<Object>} 请求响应的 JSON 数据
 */
export function httpPut(options) {
  return httpRequest({ ...options, method: 'PUT' });
}

/**
 * 发送 DELETE 请求
 * @param {Object} options 请求的选项
 * @returns {Promise<Object>} 请求响应的 JSON 数据
 */
export function httpDel(options) {
  return httpRequest({ ...options, method: 'DELETE' });
}
