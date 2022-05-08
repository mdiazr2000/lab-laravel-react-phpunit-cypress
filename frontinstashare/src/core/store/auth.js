import {storeonDevtools} from "storeon/devtools";

const auth = (store) => {
  store.on('@init', () => ({
    auth: {
      accessToken: '',
      email: '',
    }
  }));
  store.on('addToken', ({ auth }, data) => {
    return {
      auth: {
        accessToken: data.token,
        email: data.email,
      }
    }
  });
  store.on('removeToken', ({ auth }) => {
    return {
      auth: {
        accessToken: '',
        email: '',
      }
    }
  });
}

export default auth;


