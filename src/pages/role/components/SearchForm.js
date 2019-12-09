import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

function SearchForm(props) {
  const [roleName, setRoleName] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ roleName })
  }, [roleName, changeSearchParams]);

  function search() {
    const { roleName } = props.params
    props.queryRoleList({
      pageSize: 10,
      pageNo: 1,
      roleName,
    })
  }

  function reset() {
    setRoleName("");
    props.queryRoleList({ pageSize: 10, pageNo: 1 });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">角色名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setRoleName(e.target.value)}
              value={roleName}
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

const mapState = state => ({
  params: state.user.params
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  queryRoleList: requestData => {
    const action = creators.queryRoleListAction(requestData);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
