const TOKENSTRING = "token"
export default {
  localStorage: {
    get: k => {
      return localStorage.getItem(k);
    },
    set: (k, v) => {
      localStorage.setItem(k, v);
    }
  },
  token: {
    get: () => {
      return localStorage.getItem(TOKENSTRING);
    },
    set: v => {
      localStorage.setItem(TOKENSTRING, v);
    }
  },
  login(props, token) {
    this.token.set(token);
    props.history.push("/home");
  },
  logout(props) {
    this.token.set("");
    props.history.push("/");
  }
}