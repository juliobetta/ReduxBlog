export const embedToken = (token) => {
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};
