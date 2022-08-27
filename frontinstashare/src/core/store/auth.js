import {storeonDevtools} from "storeon/devtools";

const auth = (store) => {
  store.on('@init', () => ({
    auth: {
      accessToken: '',
      email: '',
      id: 0,
    }
  }));
  store.on('addToken', ({ auth }, data) => {
    return {
      auth: {
        accessToken: data.token,
        email: data.email,
        id: data.id,
      }
    }
  });
  store.on('removeToken', ({ auth }) => {
    return {
      auth: {
        accessToken: '',
        email: '',
        id : 0,
      }
    }
  });
}

export default auth;


