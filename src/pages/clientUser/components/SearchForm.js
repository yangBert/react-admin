import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import moment from 'moment';
import * as config from '../config';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;

function SearchForm(props) {
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


  function mapStatus() {
    let statusArr = [];
    Object.keys(config.status).forEach(k => {
      statusArr.push({k,v:config.status[k]})
    })
    return statusArr;
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">电话号码:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setPhoneNo(e.target.value)}
                value={phoneNo}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">真实姓名:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setUserRealname(e.target.value)}
                value={userRealname}
              />
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">居民身份证:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  allowClear
                  onChange={e => setIdCard(e.target.value)}
                  value={idCard}
                />
              </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">状态:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
                <Option value="">请选择</Option>
                {
                  mapStatus().map(item => {
                  return <Option value={item.k} key={item.k}>{item.v}</Option>
                  })
                }
              </Select>
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">&nbsp;</label>
            <Button onClick={() => search()} type="primary">
              <Icon type="search" />查询
            </Button>&nbsp;&nbsp;
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="undo" />重置
            </Button>
          </div>
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

export default connect(mapState, mapDispatch)(SearchForm);
