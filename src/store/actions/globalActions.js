export const setUserData = (data) => {
    return {
      type: 'SET_USER_DATA',
      payload: data,
    };
  };
export const setMyPermissions = (data) => {
    return {
      type: 'SET_MY_PERMISSIONS',
      payload: data,
    };
  };
export const setToken = (token) => {
    return {
      type: 'SET_TOKEN',
      payload: token,
    };
  };
export const setCompanyData = (data)=>{
    return {
      type: 'SET_COMPANY',
      payload: data,
    };
};