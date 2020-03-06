import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import moment from 'moment';
import * as config from '../config';
import { Link, withRouter } from 'react-router-dom';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

function SearchForm(props) {
  console.log("props", props)
  const [idCard, setIdCard] = useState("")
  const [userRealname, setUserRealname] = useState("")
  const [status, setStatus] = useState("")
  const [phoneNo, setPhoneNo] = useState("")


  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      idCard,
      userRealname,
      status,
      phoneNo
    })
  }, [
    idCard,
    userRealname,
    status,
    phoneNo,
    changeSearchParams
  ]);


  function search() {
    const {
      idCard,
      userRealname,
      status,
      phoneNo,
    } = props.params

    const data = {
      pageSize: 10,
      pageNo: 1,
      idCard,
      userRealname,
      status,
      phoneNo,
    }

    props.querylist({ props, data });
  }

  function reset() {
    setIdCard("");
    setUserRealname("");
    setStatus("");
    setPhoneNo("");
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">产品:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setPhoneNo(e.target.value)}
                value={phoneNo}
              />
            </div>

          </div>
          <label className="pullLeft">&nbsp;&nbsp;&nbsp;</label>
          <Button onClick={() => search()} type="primary">
            <Icon type="search" />查询
            </Button>&nbsp;&nbsp;
            <Button onClick={() => reset()} type="primary" ghost>
            <Icon type="undo" />重置
            </Button>&nbsp;&nbsp;
            <Link
            to={{
              pathname: "/chargeConfig/add",
              state: { appCode: props.location.state.appCode }
            }}
          >
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="plus" />新增
                </Button>
          </Link>
          &nbsp;&nbsp;
          <Link
            to={{
              pathname: "/app/appList",
            }}
          >
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="rollback" />返回
                </Button>
          </Link>
        </div>
      </div >
    </div >
  )
}

const mapState = state => ({
  params: state.clientUser.params,
  spinning: state.clientUser.spinning,
})

const mapDispatch = dispatch => ({

  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default withRouter(connect(mapState, mapDispatch)(SearchForm));
