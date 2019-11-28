import React from 'react';
import { withRouter } from 'react-router';
import styles from './login.module.css';
import img from 'static/img/1.png';
import logo from 'static/img/login-logo.png';
import { GZCA } from 'static/plugins/gzca/js/gzca';

function Login(props) {

  return (
    <div className={styles.bg}>
      <div>
        <img className={styles.imgTop} src={img} alt="浮云" />
      </div>
      <div>
        <img className={styles.imgCenter} src={img} alt="浮云" />
      </div>
      <div>
        <img className={styles.imgBottom} src={img} alt="浮云" />
      </div>
      <div>
        <div className={styles.pageCenter}>
          <img className={styles.imgOhter} src={img} alt="浮云" />
          <img className={styles.logo} src={logo} alt="" />
          <h2 className={styles.title}>云上贵州证统一认证平台</h2>
          <button className={styles.submit} onClick={() => initSocket(props)}>登 录</button>
        </div>
      </div>
      <div className={styles.footer}>©2019 gzdata.com 云上贵州 黔ICP备17003900号-1</div>

    </div>

  )
}

function login(props) {
  props.history.push("/pages/userList");
}

//初始化连接
function initSocket(props) {
  GZCA.init((res) => {
    if (res) {
      getUkeyList(props);
    }
  });
}

//获取UKEY列表
function getUkeyList(props) {
  GZCA.GZCA_GetCertList(true, 1, function (res) {
    if(res.success){
      login(props);
    }
  });
}

export default withRouter(Login);
