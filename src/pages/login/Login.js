import React from 'react';

import styles from './login.module.css';
import img from 'static/img/1.png';
import logo from 'static/img/logo.png';
import LoginButton from './LoginButton';
import platForm from 'static/js/config';


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
          <h2 className={styles.title}>{platForm.platFormName}</h2>
          <LoginButton loginProps={props} />
        </div>
      </div>
      <div className={styles.footer}>©2019 gzdata.com 云上贵州 黔ICP备17003900号-1</div>
    </div>
  )
}

export default Login;
