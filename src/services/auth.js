export const setUSer = (name) => {
  localStorage.setItem("user", name);
};

export const getUser = () => {
  return localStorage.getItem("user") === '' ? 'Visitante' : localStorage.getItem("user");
};
