export const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };
  
  export const logout = () => {
    localStorage.removeItem("token");
  };
  