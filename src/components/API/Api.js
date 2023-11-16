import axios from 'axios';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const key = '39775256-103811d0d2e2705907a87b65c';

const APIRequest = async (query, page) => {
  const response = await axios.get(
    `?q=${query}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (response.data.hits.length === 0) {
    toast(`!!! ${query} not found Sorry!!!`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return response.data;
};

export default APIRequest;
