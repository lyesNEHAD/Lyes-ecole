const API_BASE_URL = 'https://greenvelvet.alwaysdata.net/pfc';
const TOKEN = '7baae7f698cee3faabd346f9d24b0570f8bf4b73';

const getAuthHeader = () => {
  return { token: TOKEN };
};

const api = {
  setToken: (token) => {
    localStorage.setItem('token', token);
  },

  getToken: () => {
    return localStorage.getItem('token') || TOKEN;
  },
  getApiInfo: async () => {
    const response = await fetch(`${API_BASE_URL}/`);
    return response.json();
  },

  ping: async () => {
    const response = await fetch(`${API_BASE_URL}/ping`);
    return response.json();
  },

  addChecklist: async (title, description, todos) => {
    const response = await fetch(`${API_BASE_URL}/checklist/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        title,
        description,
        todo: todos,
      }),
    });
    return response.json();
  },

  getAllChecklists: async () => {
    const response = await fetch(`${API_BASE_URL}/checklists`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  getChecklist: async (id) => {
    const response = await fetch(`${API_BASE_URL}/checklist?id=${id}`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  deleteChecklist: async (id) => {
    const response = await fetch(`${API_BASE_URL}/checklist/delete?id=${id}`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },

  updateChecklist: async (id, title, description, todos) => {
    const response = await fetch(`${API_BASE_URL}/checklist/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({
        id,
        title,
        description,
        todo: todos,
      }),
    });
    return response.json();
  },

  updateChecklistStatus: async (id, statut) => {
    const response = await fetch(`${API_BASE_URL}/checklist/statut?id=${id}&statut=${statut}`, {
      headers: getAuthHeader(),
    });
    return response.json();
  },
};

export default api;
