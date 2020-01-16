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
  const [title, setTitle] = useState("")
  const [state, setState] = useState("")
  const [publishStartTimeString, setPublishStartTimeString] = useState(null)
  const [publishEndTimeString, setPublishEndTimeString] = useState(null)
  const [createStartTimeString, setCreateStartTimeString] = useState(null)
  const [createEndTimeString, setCreateEndTimeString] = useState(null)

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      title,
      state,
      publishStartTimeString,
      publishEndTimeString,
      createStartTimeString,
      createEndTimeString,
    })
  }, [
    title,
    state,
    publishStartTimeString,
    publishEndTimeString,
    createStartTimeString,
    createEndTimeString,
    changeSearchParams
  ]);


  function search() {
    const {
      title,
      state,
    } = props.params
    let start1 = props.params.publishStartTimeString
    let end1 = props.params.publishEndTimeString
    let start2 = props.params.createStartTimeString
    let end2 = props.params.createEndTimeString

    start1 = publishStartTimeString && publishStartTimeString.format('YYYY-MM-DD HH:mm:ss')
    end1 = publishEndTimeString && publishEndTimeString.format('YYYY-MM-DD HH:mm:ss')
    start2 = createStartTimeString && createStartTimeString.format('YYYY-MM-DD HH:mm:ss')
    end2 = createEndTimeString && createEndTimeString.format('YYYY-MM-DD HH:mm:ss')
    const data = {
      pageSize: 10,
      pageNo: 1,
    }

    if (state) {
      data.state = state
    }
    if (title) {
      data.title = title
    }
    if (publishStartTimeString) {
      data.publishStartTimeString = start1
    }
    if (publishEndTimeString) {
      data.publishEndTimeString = end1
    }
    if (createStartTimeString) {
      data.createStartTimeString = start2
    }
    if (createEndTimeString) {
      data.createEndTimeString = end2
    }

    props.queryCertlist({ props, data });
  }

  function reset() {
    setTitle("");
    setPublishStartTimeString(null);
    setPublishEndTimeString(null);
    const data = { pageNo: 1, pageSize: 10 }
    props.queryCertlist({ props, data });
  }

  function setTime1(t1, t2) {
    setPublishStartTimeString(t1)
    setPublishEndTimeString(t2)
  }

  function setTime2(t1, t2) {
    setCreateStartTimeString(t1)
    setCreateEndTimeString(t2)
  }

  function onChangePicker1(dates, dateStrings) {
    if (dateStrings[0]) {
      setTime1(moment(dateStrings[0]), moment(dateStrings[1]))
    } else {
      setTime1(null, null)
    }
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
            <label className="pullLeft">公告标题:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">状态:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select value={state} style={{ width: "100%" }} onChange={value => setState(value)}>
                <Option value="">请选择</Option>
                <Option value={4}>已发布</Option>
                <Option value={1}>未发布</Option>
              </Select>
            </div>
          </div>
        </div>

        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">发布日期:</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                style={{ "width": "100%" }}
                showTime
                value={[publishStartTimeString, publishEndTimeString]}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={onChangePicker1}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">创建日期:</label>
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
  params: state.notice.params
})

const mapDispatch = dispatch => ({

  queryCertlist: req => {
    const action = creators.queryNoticelistAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
