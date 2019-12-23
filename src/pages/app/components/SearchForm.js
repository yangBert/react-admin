import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

const { Option } = Select;

function SearchForm(props) {
  const [appName, setAppName] = useState("")
  const [appStatus, setAppStatus] = useState("")
  const [auditStatus, setAuditStatus] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      appName,
      appStatus,
      auditStatus,
    })
  }, [appName, appStatus, auditStatus]);

  function search() {
    const { appName, appStatus, auditStatus } = props.params
    const data = {
      pageSize: 10,
      pageNo: 1,
      appName,
      appStatus,
      auditStatus,
    }
    props.queryAppList({ props, data });
  }



  function reset() {
    setAppName("");
    setAppStatus("");
    setAuditStatus("");
    const data = { pageNo: 1, pageSize: 10 }
    props.queryAppList({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">应用名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setAppName(e.target.value)}
              value={appName}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">应用状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={appStatus} style={{ width: "100%" }} onChange={value => setAppStatus(value)}>
              <Option value="">请选择</Option>
              <Option value={1}>已上线</Option>
              <Option value={2}>未上线</Option>
            </Select>
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">审核状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={auditStatus} style={{ width: "100%" }} onChange={value => setAuditStatus(value)}>
              <Option value="">请选择</Option>
              <Option value={2}>待审核</Option>
              <Option value={1}>审核通过</Option>
              <Option value={0}>审核未通过</Option>
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
  params: state.admin.params
})

const mapDispatch = dispatch => ({

  queryAppList: req => {
    const action = creators.createQueryAppListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
