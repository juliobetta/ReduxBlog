export const saveToken = (token) => { localStorage.setItem('token', token); };

export const getToken = () => localStorage.getItem('token') || null;

export const embedToken = (token) => {
  if(getToken() === null) {
    return {};
  }

  return {
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  };
};
