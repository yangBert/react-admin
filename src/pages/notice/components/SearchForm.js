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
  const [publishTimeStart, setPublishTimeStart] = useState(null)
  const [publishTimeEnd, setPublishTimeEnd] = useState(null)



  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ title })
  }, [title, changeSearchParams]);

  function search() {
    const { title } = props.params
    const start = publishTimeStart && publishTimeStart.format('YYYY-MM-DD')
    const end = publishTimeEnd && publishTimeEnd.format('YYYY-MM-DD')
    const data = {
      pageSize: 10,
      pageNo: 1,
      title,
      start,
      end
    }
    props.queryCertlist({ props, data });
  }

  function reset() {
    setTitle("");
    setPublishTimeStart(null);
    setPublishTimeEnd(null);
    const data = { pageNo: 1, pageSize: 10 }
    props.queryCertlist({ props, data });
  }

  function onChangePicker(dates, dateStrings) {
    setPublishTimeStart(moment(dateStrings[0]))
    setPublishTimeEnd(moment(dateStrings[1]))
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
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
          <label className="pullLeft">发布日期:</label>
          <div className={`${styles.inline} pullLeft`}>
            <RangePicker
              value={[publishTimeStart, publishTimeEnd]}
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
    </div>
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
