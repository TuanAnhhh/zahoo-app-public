import axios from "axios";

const baseURL = "http://192.168.1.6:8800";
// const baseURL = "http://178.128.122.216:5000";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${baseURL}/api/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${baseURL}/api/${url}`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`${baseURL}/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`${baseURL}/api/${url}`, post, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`${baseURL}/api/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};
