import axios from 'axios';

axios.defaults.baseURL = 'https://frontend-test-assignment-api.abz.agency';

const url = 'https://frontend-test-assignment-api.abz.agency';

export const getConfig = {
  method: 'get',
  url,
};

// export axios.get(getConfig);
