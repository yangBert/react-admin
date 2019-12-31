import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, DatePicker } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [title, setTitle] = useState("")
  const [publishStartTimeString, setPublishStartTimeString] = useState(null)
  const [publishEndTimeString, setPublishEndTimeString] = useState(null)

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ title })
  }, [title, changeSearchParams]);

  function search() {
    const { title } = props.params

    const start = publishStartTimeString && publishStartTimeString.format('YYYY-MM-DD HH:mm:ss')
    const end = publishEndTimeString && publishEndTimeString.format('YYYY-MM-DD HH:mm:ss')
    const data = {
      pageSize: 10,
      pageNo: 1,
      title,
      publishStartTimeString: start,
      publishEndTimeString: end
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

  function onChangePicker(dates, dateStrings) {
    setPublishStartTimeString(moment(dateStrings[0]))
    setPublishEndTimeString(moment(dateStrings[1]))
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.title} pullLeft`}>
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
          <label className="pullLeft">发布日期:</label>
          <div className={`${styles.inline} pullLeft`}>
            <RangePicker
              showTime
              value={[publishStartTimeString, publishEndTimeString]}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onChangePicker}
            />
          </div>
        </div>
        {/* <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
              <Option value="">请选择</Option>
              <Option value="1">启用</Option>
              <Option value="0">禁用</Option>
            </Select>
          </div>
        </div> */}
        <div className="pullLeft">
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
