import React, { useState, useEffect } from 'react';
import { Button, Select, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import * as config from '../config';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;



function SearchForm(props) {
  const [instanceType, setInstanceType] = useState("")
  const [accountCode, setAccountCode] = useState("")
  const [status, setStatus] = useState("")
  const [createStartTimeString, setCreateStartTimeString] = useState(null)
  const [createEndTimeString, setCreateEndTimeString] = useState(null)

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      instanceType,
      accountCode,
      status,
      createStartTimeString,
      createEndTimeString,
    })
  }, [
    instanceType,
    accountCode,
    status,
    createStartTimeString,
    createEndTimeString,
    changeSearchParams
  ]);


  function search() {
    const {
      instanceType,
      accountCode,
      status,
    } = props.params

    let start2 = props.params.createStartTimeString
    let end2 = props.params.createEndTimeString


    start2 = createStartTimeString && createStartTimeString.format('YYYY-MM-DD HH:mm:ss')
    end2 = createEndTimeString && createEndTimeString.format('YYYY-MM-DD HH:mm:ss')
    const data = {
      pageSize: 10,
      pageNo: 1,
    }


    if (instanceType) {
      data.instanceType = instanceType
    }

    if (accountCode) {
      data.accountCode = accountCode
    }

    if (status !== "") {
      data.status = status
    }

    if (createStartTimeString) {
      data.createStartTimeString = start2
    }
    if (createEndTimeString) {
      data.createEndTimeString = end2
    }
    console.log("data", data)
    props.querylist({ props, data });
  }

  function reset() {
    setInstanceType("");
    setAccountCode("");
    setStatus("");
    setTime2("", "")
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }



  function setTime2(t1, t2) {
    setCreateStartTimeString(t1)
    setCreateEndTimeString(t2)
  }

  function mapConfig(key) {
    let arr = [];
    Object.keys(config[key]).forEach(k => {
      arr.push({ k, v: config[key][k] })
    })
    return arr;
  }


  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">受理单状态:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
                <Option value="">请选择</Option>
                {

                  mapConfig("status").map(item => {
                    return <Option value={item.k} key={item.k}>{item.v}</Option>
                  })

                }
              </Select>
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">订单类型:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={instanceType} style={{ width: "100%" }} onChange={value => setInstanceType(value)}>
                <Option value="">请选择</Option>
                {

                  mapConfig("instanceType").map(item => {
                    return <Option value={item.k} key={item.k}>{item.v}</Option>
                  })

                }
              </Select>
            </div>
          </div>
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
      </div>
    </div >
  )
}

const mapState = state => ({
  params: state.billing.params,
  spinning: state.billing.spinning,
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
