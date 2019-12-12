import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

const { Option } = Select;

function SearchForm(props) {
  const [adminName, setAdminName] = useState("")
  const [adminId, setAdminId] = useState("")
  const [status, setStatus] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ adminName, adminId, status })
  }, [adminName, adminId, status, changeSearchParams]);

  function search() {
    const { adminName, adminId, status } = props.params
    props.queryUserList({
      pageSize: 10,
      pageNo: 1,
      adminName,
      adminId,
      status,
    })
  }

  function reset() {
    setAdminName("");
    setAdminId("");
    setStatus("");
    props.queryUserList({ pageSize: 10, pageNo: 1 });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">管理员名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setAdminName(e.target.value)}
              value={adminName}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">证书序列号:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setAdminId(e.target.value)}
              value={adminId}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={status} style={{ width: "100%" }} onChange={value => setStatus(value)}>
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
  params: state.admin.params
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  queryUserList: requestData => {
    const action = creators.createQueryUserAction(requestData);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
