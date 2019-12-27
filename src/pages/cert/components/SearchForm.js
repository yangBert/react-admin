import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;
const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [certSerNum, setCertSerNum] = useState("")
  const [validityBegin, setValidityBegin] = useState("")
  const [validityEnd, setValidityEnd] = useState("")
  const [state, setState] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ certSerNum, validityBegin, validityEnd, state })
  }, [certSerNum, validityBegin, validityEnd, state, changeSearchParams]);

  function search() {
    const { certSerNum, state, validityBegin, validityEnd } = props.params
    const data = {
      pageSize: 10,
      pageNo: 1,
      certSerNum,
      validityBegin,
      validityEnd,
      state,
    }
    props.queryCertlist({ props, data });
  }

  function reset() {
    setCertSerNum("");
    setValidityBegin("");
    setValidityEnd("");
    setState("");
    const data = { pageNo: 1, pageSize: 10 }
    props.queryCertlist({ props, data });
  }

  function onChangePicker(dates, dateStrings) {
    setValidityBegin(dateStrings[0])
    setValidityEnd(dateStrings[1])
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">签名证书序列号:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setCertSerNum(e.target.value)}
              value={certSerNum}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">有效日期:</label>
          <div className={`${styles.inline} pullLeft`}>
            <RangePicker
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onChangePicker}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={state} style={{ width: "100%" }} onChange={value => setState(value)}>
              <Option value="">请选择</Option>
              <Option value="1">启用</Option>
              <Option value="0">禁用</Option>
            </Select>
          </div>
        </div>
        <div className="pullLeft">
          <Button onClick={() => search()} type="primary">
            <Icon type="search" />查询
          </Button>&nbsp;&nbsp;
          <Button onClick={() => reset()} type="primary" ghost>
            <Icon type="undo" />重置
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapState = state => ({
  params: state.cert.params
})

const mapDispatch = dispatch => ({

  queryCertlist: req => {
    const action = creators.createQueryCertlistAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
