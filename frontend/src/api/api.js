import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export const networkService = {
  setupInterceptors: () => {
    // request

    apiClient.interceptors.request.use(
      (config) => {
        if (!config.headers) {
          // header가 외부에서 정의되지 않았을 경우에만 추가.
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // // response
    apiClient.interceptors.response.use(
      (response) => {
        return response;
      },

      (error) => {
        console.log('error ::', error);

        return Promise.reject(error);
      }
    );
  },
};
