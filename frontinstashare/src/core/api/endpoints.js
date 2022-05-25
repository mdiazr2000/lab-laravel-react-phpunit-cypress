export const API_ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';
/*export const BACKEND_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';*/
export const BACKEND_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8000';

export const getLoginEndpoint = () => `${API_ENDPOINT}/login`;
export const getRegisterEndpoint = () => `${API_ENDPOINT}/register`;
export const getUploadEndpoint = () => `${API_ENDPOINT}/upload`;
export const getDownloadEndpoint = () => `${API_ENDPOINT}/downloadfile`;
export const getFilesByUserEndpoint = (tye) => `${API_ENDPOINT}/filesByUser`;
export const getUpdateFileNameEndpoint = (id) => `${API_ENDPOINT}/updateFile/${id}`;
