import React from 'react';
import { withRouter } from 'react-router';
import styles from './login.module.css';
import { GZCA } from 'static/plugins/gzca/js/gzca';
import * as creators from './store/creators';
import { connect } from 'react-redux';
import { Button } from 'antd';
import notification from 'pages/common/layer/notification';
function LoginButton(props) {

  //初始化连接
  function initSocket() {
    GZCA.init((res) => {
      if (res) {
        getUkeyList();
      } else {
        notification('error', res.msg)
      }
    });
  }

  //获取UKEY列表
  function getUkeyList() {
    const CertType = 1;
    GZCA.GZCA_GetCertList(true, CertType, function (res) {
      if (res.success) {
        console.log(res)
        getCert(res.ContainerName, CertType)
      } else {
        notification('error', res.msg)
      }
    });
  }

  //获取签名证书base64
  function getCert(ContainerName, CertType) {
    GZCA.GZCA_ExportCert(ContainerName, CertType, function (res) {
      if (res.success) {
        const CertB64 = res.CertB64;
        getSn(CertB64, ContainerName);
      } else {
        notification('error', res.msg)
      }
    });
  }

  //获取签名证书序列号
  function getSn(CertB64, ContainerName) {
    GZCA.GZCA_GetCertInfo(CertB64, function (res) {
      if (res.success) {
        const certserial = res.CertSerial
        props.getRandom({ props: props, GZCA, certserial, ContainerName })
      } else {
        notification('error', res.msg)
      }
    });
  }

  return <Button
    type="primary"
    size="large"
    className={styles.submit}
    onClick={() => initSocket()}
    loading={props.loginLoading}
  >登 录</Button>
}

const mapState = state => ({
  loginLoading: state.login.loginLoading
})

const mapDispatch = dispatch => ({
  getRandom: params => {
    const action = creators.getRandomAction(params);
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(LoginButton));
