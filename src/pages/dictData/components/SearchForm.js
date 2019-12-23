import React, { useState, useEffect } from 'react';
import { Button, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

const { Option } = Select;

function SearchForm(props) {
  const [type, setType] = useState("")
  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ type })
  }, [type, changeSearchParams]);

  function search() {
    const { type } = props.params
    const data = {
      pageSize: 10,
      pageNo: 1,
      type
    }
    props.queryDictList({ props, data });
  }



  function reset() {
    setType("");
    const data = { pageNo: 1, pageSize: 10 }
    props.queryDictList({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={type} style={{ width: "100%" }} onChange={value => setType(value)}>
              <Option value="">请选择</Option>
              {
                props.typeList && props.typeList.map(item => <Option key={item.type} value={item.type}>{item.typeName}</Option>)
              }
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
  params: state.dictData.params,
  typeList: state.dictData.typeList,
})

const mapDispatch = dispatch => ({

  queryDictList: req => {
    const action = creators.queryDictDataListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(SearchForm);
