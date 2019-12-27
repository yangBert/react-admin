import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

//const { Option } = Select;

function SearchForm(props) {
  const [title, setTitle] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ title })
  }, [title, changeSearchParams]);

  function search() {
    const { title } = props.params
    const data = {
      pageSize: 10,
      pageNo: 1,
      title,
    }
    props.queryCertlist({ props, data });
  }

  function reset() {
    setTitle("");
    const data = { pageNo: 1, pageSize: 10 }
    props.queryCertlist({ props, data });
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
  params: state.admin.params
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
