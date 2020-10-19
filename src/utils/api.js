import axios from 'axios';

export const getBaseURL = () => {
  const apiEndpoint = 'https://swapi.dev/';
  return `${apiEndpoint}api/`;
};

export const client = axios.create({
  baseURL: getBaseURL(),
  timeout: 5000,
  method: 'GET',
});

function jsonConfig(config) {
  config.headers = {
    ...config.headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  return config;
}

function request(config) {
  if (config.data) {
    jsonConfig(config);
  }
  return client.request(config);
}

export async function getPeople() {
  const config = jsonConfig({
    url: 'people/',
  });
  const data = await request(config);
  return data;
}
