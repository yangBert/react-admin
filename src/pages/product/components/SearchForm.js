import React, { useState, useEffect } from 'react';
import { Button, Icon, Input, TreeSelect } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';

//const { Option } = Select;

function SearchForm(props) {
  const [productName, setProductName] = useState("")
  const [productTypeCode, setProductTypeCode] = useState("")
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
      productTypeCode
    }
    props.queryList({ props, data });
  }

  function reset() {
    setProductName("");
    const data = { pageNo: 1, pageSize: 10 }
    props.queryList({ props, data });
  }

  function recursiveFn(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].title = arr[i].productTypeName
      arr[i].value = arr[i].productTypeCode
      if (arr[i].children && arr[i].children.length > 0) {
        recursiveFn(arr[i].children)
      }
    }
    return arr;
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">产品类型:</label>
          <div className={`${styles.inline} pullLeft`}>
            <TreeSelect
              style={{ width: '100%' }}
              value={productTypeCode}
              dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
              treeData={recursiveFn(props.allProductType)}
              placeholder="请选择"
              //treeDefaultExpandAll
              onChange={value => setProductTypeCode(value)}
            />
          </div>
        </div>
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
  allProductType: state.product.allProductType,
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
