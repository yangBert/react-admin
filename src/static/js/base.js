const token = "YUN_SHANG_GUIZHOU_TOKEN"
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
      return localStorage.getItem(token);
    },
    set: v => {
      localStorage.setItem(token, v);
    }
  },
  getDays: function (_time) {
    var GZCADate = new Date(_time), GZCAYear = GZCADate.getFullYear(), GZCAMonth = changeDate(GZCADate
      .getMonth() + 1), GZCATime = changeDate(GZCADate.getDate());
    function changeDate(d) {
      return d < 10 ? "0" + d : d;
    }
    return GZCAYear + '-' + GZCAMonth + '-' + GZCATime;
  },
  getHours: function (_time) {
    var GZCADate = new Date(_time), GZCAYear = GZCADate.getFullYear(), GZCAMonth = changeDate(GZCADate
      .getMonth() + 1), GZCATime = changeDate(GZCADate.getDate()), GZCAHours = changeDate(GZCADate
        .getHours()), GZCAMinutes = changeDate(GZCADate.getMinutes()), GZCASeconds = changeDate(GZCADate
          .getSeconds());
    function changeDate(d) {
      return d < 10 ? "0" + d : d;
    }
    return GZCAYear + '-' + GZCAMonth + '-' + GZCATime + ' ' + GZCAHours
      + ':' + GZCAMinutes + ':' + GZCASeconds;
  },
  login(props, token) {
    this.token.set(token);
    props.history.push("/home");
  },
  logout(props) {
    props.history.push("/");
    this.token.set("");
  },
  trim(s) {
    return s.replace(/(^\s*)|(\s*$)/g, '')
  }
}