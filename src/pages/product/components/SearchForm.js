import React, { useState, useEffect } from 'react';
import { Button, Icon, Input } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

//const { Option } = Select;

function SearchForm(props) {
  const [productName, setProductName] = useState("")
  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ productName })
  }, [productName, changeSearchParams]);

  function search() {
    const { productName } = props.params
    const data = {
      pageSize: 10,
      pageNo: 1,
      productName,
    }
    props.queryList({ props, data });
  }

  function reset() {
    setProductName("");
    const data = { pageNo: 1, pageSize: 10 }
    props.queryList({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">产品名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              placeholder="产品名称"
              allowClear
              onChange={e => setProductName(e.target.value)}
              value={productName}
            />
          </div>
        </div>
        {/* <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={type} style={{ width: "100%" }} onChange={value => setType(value)}>
              <Option value="">请选择</Option>
              <Option value="1">请选择</Option>
              <Option value="2">请选择</Option>
              <Option value="3">请选择</Option>
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
  params: state.product.params,
})

const mapDispatch = dispatch => ({

  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(SearchForm);
