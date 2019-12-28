import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import { Link } from 'react-router-dom';
const { Option } = Select;

function SearchForm(props) {
  const [authName, setAuthName] = useState("")
  const [authLevel, setAuthLevel] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ authName })
  }, [authName, changeSearchParams]);

  function search() {
    const { authName, authLevel } = props.params

    const data = {
      pageSize: 10,
      pageNo: 1,
      authName,
      authLevel,
    }
    props.querylist({ props, data });
  }

  function reset() {
    setAuthName("");
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">认证源名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setAuthName(e.target.value)}
              value={authName}
            />
          </div>
        </div>

        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">认证等级:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={authLevel} style={{ width: "100%" }} onChange={value => setAuthLevel(value)}>
              <Option value="">请选择</Option>
              <Option value="1">启用</Option>
              <Option value="0">禁用</Option>
            </Select>
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">认证源接口方式:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={authLevel} style={{ width: "100%" }} onChange={value => setAuthLevel(value)}>
              <Option value="">请选择</Option>
              <Option value="1">启用</Option>
              <Option value="0">禁用</Option>
            </Select>
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">认证源状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={authLevel} style={{ width: "100%" }} onChange={value => setAuthLevel(value)}>
              <Option value="">请选择</Option>
              <Option value="1">启用</Option>
              <Option value="0">禁用</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className={styles.formButton}>
        <Button className={styles.button} onClick={() => search()} type="primary">
          <Icon type="search" />查询
          </Button>
        <Button className={styles.button} onClick={() => reset()} type="primary" ghost>
          <Icon type="undo" />重置
          </Button>
        <Link className={styles.button} to="/certification/add">
          <Button
            type="primary"
            className={styles.addButton}
          >
            <Icon type="plus" />新增
          </Button>
        </Link>
      </div>
    </div>
  )
}

const mapState = state => ({
  params: state.certification.params
})

const mapDispatch = dispatch => ({

  querylist: req => {
    const action = creators.querylistAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
