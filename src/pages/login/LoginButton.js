import React, { useEffect } from 'react';
import styles from './login.module.css';
import { GZCA } from 'static/plugins/gzca/js/gzca';
import * as creators from './store/creators';
import { connect } from 'react-redux';
import $$ from 'static/js/base.js';

function LoginButton(props) {
  useEffect(() => {
    if(props.loginState){
      $$.login(props.loginProps, 123456789)
    }
  });
  return <button className={styles.submit} onClick={() => initSocket(props)}>登 录</button>
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
  const CertType = 1;
  GZCA.GZCA_GetCertList(true, CertType, function (res) {
    if (res.success) {
      getCert(props, res.ContainerName, CertType)
    }
  });
}

//获取签名证书base64
function getCert(props, ContainerName, CertType) {
  GZCA.GZCA_ExportCert(ContainerName, CertType, function (res) {
    if (res.success) {
      const CertB64 = res.CertB64;
      getSn(props, CertB64);
    }
  });
}

//获取签名证书序列号
function getSn(props, CertB64) {
  GZCA.GZCA_GetCertInfo(CertB64, function (res) {
    if (res.success) {
      const data = {
        certSerial: res.CertSerial,
        random: 1231237189237
      };
      props.loginFn(data);
    }
  });
}

const mapState = state => ({
  loginState: state.login.loginState
})

const mapDispatch = dispatch => ({
  loginFn: () => {
    const action = creators.loginSubmit();
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(LoginButton);
