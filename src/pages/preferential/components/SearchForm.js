import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, DatePicker, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchForm(props) {
  const [strategyName, setStrategyName] = useState("")
  const [strategyCode, setStrategyCode] = useState("")
  const [state, setState] = useState("")
  const [createStartTimeString, setCreateStartTimeString] = useState(null)
  const [createEndTimeString, setCreateEndTimeString] = useState(null)

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      strategyName,
      strategyCode,
      state,
      createStartTimeString,
      createEndTimeString,
    })
  }, [
    strategyName,
    strategyCode,
    state,
    createStartTimeString,
    createEndTimeString,
    changeSearchParams
  ]);


  function search() {
    const {
      strategyName,
      state,
      strategyCode,
    } = props.params

    let start2 = props.params.createStartTimeString
    let end2 = props.params.createEndTimeString


    start2 = createStartTimeString && createStartTimeString.format('YYYY-MM-DD HH:mm:ss')
    end2 = createEndTimeString && createEndTimeString.format('YYYY-MM-DD HH:mm:ss')
    const data = {
      pageSize: 10,
      pageNo: 1,
    }


    if (strategyName) {
      data.strategyName = strategyName
    }

    if (strategyCode) {
      data.strategyCode = strategyCode
    }

    if (state !== "") {
      data.status = state
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
    setStrategyName("");
    setStrategyCode("");
    setState("");
    setTime2("", "")
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }



  function setTime2(t1, t2) {
    setCreateStartTimeString(t1)
    setCreateEndTimeString(t2)
  }


  function onChangePicker2(dates, dateStrings) {
    if (dateStrings[0]) {
      setTime2(moment(dateStrings[0]), moment(dateStrings[1]))
    } else {
      setTime2(null, null)
    }
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">优惠策略:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setStrategyName(e.target.value)}
                value={strategyName}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">编码:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setStrategyCode(e.target.value)}
                value={strategyCode}
              />
            </div>
          </div>

        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">状态:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={state} style={{ width: "100%" }} onChange={value => setState(value)}>
                <Option value="">请选择</Option>
                <Option value="0">已启用</Option>
                <Option value="1">已禁用</Option>
              </Select>
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">创建时间:</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                style={{ "width": "100%" }}
                showTime
                value={[createStartTimeString, createEndTimeString]}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={onChangePicker2}
              />
            </div>
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
