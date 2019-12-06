import React, { useState } from 'react';
import { Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';


function SearchForm(props) {
  const [adminName, setAdminName] = useState("")
  const [adminId, setAdminId] = useState("")

  function search() {
    props.queryUserList({
      adminName,
      adminId
    })
  }

  function reset() {
    props.queryUserList({})
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

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  queryUserList: requestData => {
    const action = creators.createQueryUserAction(requestData);
    dispatch(action);
  }
})

export default connect(null, mapDispatch)(SearchForm);
