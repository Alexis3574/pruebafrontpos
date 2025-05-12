import axios from 'axios';

const API = '/api/proveedores';

export const getProveedores = () => axios.get(API);
export const getProveedor = (id) => axios.get(`${API}/${id}`);
export const createProveedor = (data) => axios.post(API, data);
export const updateProveedor = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteProveedor = (id) => axios.delete(`${API}/${id}`);
