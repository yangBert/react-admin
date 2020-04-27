import React, { useState, useEffect } from 'react';
import { Button, Select, Icon, DatePicker, Input } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import * as config from '../config';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;

const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [instanceCode, setInstanceCode] = useState("")
  const [instanceType, setInstanceType] = useState("")
  const [accountCode, setAccountCode] = useState("")
  const [status, setStatus] = useState("")
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      instanceCode,
      instanceType,
      accountCode,
      status,
      startTime,
      endTime,
    })
  }, [
    instanceCode,
    instanceType,
    accountCode,
    status,
    startTime,
    endTime,
    changeSearchParams
  ]);


  function search() {
    const {
      instanceCode,
      instanceType,
      accountCode,
      status,
      startTime,
      endTime
    } = props.params


    const data = {
      pageSize: 10,
      pageNo: 1,
      instanceCode,
      instanceType,
      accountCode,
      status,
      startTime,
      endTime
    }
    props.querylist({ props, data });
  }

  function reset() {
    setInstanceCode("")
    setInstanceType("");
    setAccountCode("");
    setStatus("");
    setStartTime(null)
    setEndTime(null)
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }


  function onChangeRangePicker(date, dateString) {
    setStartTime(dateString[0])
    setEndTime(dateString[1])
  }

  function mapOptions(typeMap) {
    return config[typeMap].map(item => (
      <Option value={item.value} key={item.value}>{item.name}</Option>
    ))
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">订单号:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setInstanceCode(e.target.value)}
                value={instanceCode}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">订单类型:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={instanceType} style={{ width: "100%" }} onChange={value => setInstanceType(value)}>
                <Option value="">请选择</Option>
                {mapOptions("instanceTypeMap")}
              </Select>
            </div>
          </div>
        </div>

        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">订单状态:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
                <Option value="">请选择</Option>
                {mapOptions(props.allStatus ? "allStatusMap" : "statusMap")}
              </Select>
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">起始日期:</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                style={{ "width": "100%" }}
                //showTime
                onChange={onChangeRangePicker}
              />
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

export default withRouter(connect(mapState, mapDispatch)(SearchForm));
