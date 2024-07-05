const getTokenFromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem("user")): null;
const config={
    headers: {
        Authorization: getTokenFromLocalStorage !== null ? `Bearer ${getTokenFromLocalStorage.token}` : "",
        Accept:"application/json"
      }
}

export default config;