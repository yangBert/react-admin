import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import * as config from '../config';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Option } = Select;

function SearchForm(props) {
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      title,
      status,
    })
  }, [
    title,
    status,
    changeSearchParams
  ]);


  function search() {
    const {
      title,
      status,
    } = props.params

    const data = {
      pageSize: 10,
      pageNo: 1,
    }


    if (title) {
      data.title = title
    }

    if (status !== "") {
      data.status = status
    }

    console.log("data", data)
    props.querylist({ props, data });
  }

  function reset() {
    setTitle("");
    setStatus("");
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }

  function mapStatus() {
    let statusArr = [];
    Object.keys(config.status).forEach(k => {
      statusArr.push({ k, v: config.status[k] })
    })
    return statusArr;
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">链接标题:</label>
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
              <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
                <Option value="">请选择</Option>
                {
                  mapStatus().map(item => {
                    return <Option value={item.k} key={item.k}>{item.v}</Option>
                  })
                }
              </Select>
            </div>
            &nbsp;&nbsp;
            <Button onClick={() => search()} type="primary">
              <Icon type="search" />查询
            </Button>&nbsp;&nbsp;
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="undo" />重置
            </Button>
          </div>

        </div>
        {/* <div className="clearfix">

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
        </div> */}
      </div>
    </div >
  )
}

const mapState = state => ({
  params: state.link.params,
  spinning: state.link.spinning,
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
