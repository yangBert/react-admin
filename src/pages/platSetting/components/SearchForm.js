import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import { Link } from 'react-router-dom';

function SearchForm(props) {
  const [settingExp, setSettingExp] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ settingExp })
  }, [settingExp, changeSearchParams]);

  function search() {
    const { settingExp } = props.params

    const data = {
      pageSize: 10,
      pageNo: 1,
      settingExp,
    }
    props.querylist({ props, data });
  }

  function reset() {
    setSettingExp("")
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">配置项名称:</label>
          <div className={`${styles.inline} ${styles.name} pullLeft`}>
            <Input
              allowClear
              onChange={e => setSettingExp(e.target.value)}
              value={settingExp}
            />
          </div>
          <Button className={styles.button} onClick={() => search()} type="primary">
            <Icon type="search" />查询
          </Button>
          <Button className={styles.button} onClick={() => reset()} type="primary" ghost>
            <Icon type="undo" />重置
          </Button>
          <Link
            className={styles.button}
            to={{
              pathname: "/platSetting/add",
              state: { productList: props.productList }
            }}
          >
            <Button
              type="primary"
              className={styles.addButton}
            >
              <Icon type="plus" />新增
          </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapState = state => ({
  params: state.docCatalog.params,
  productList: state.docCatalog.productList,
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
