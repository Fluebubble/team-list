import axios from 'axios';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});
