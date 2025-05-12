import axios from 'axios';

const API = '/api/perfil';

export const getPerfil = () => axios.get(API);
export const updatePerfil = (id, data) => axios.put(`${API}/${id}`, data);
