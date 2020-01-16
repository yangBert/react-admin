import React, { useState, useEffect } from 'react';
import { Button, Input, Icon, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import { Link } from 'react-router-dom';
const { Option } = Select;

function SearchForm(props) {
  const [name, setName] = useState("")
  const [productCode, setProductCode] = useState("")


  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ name, productCode })
  }, [name, productCode, changeSearchParams]);

  function search() {
    const { name, productCode } = props.params

    const data = {
      pageSize: 10,
      pageNo: 1,
      name,
      productCode,
    }
    props.querylist({ props, data });
  }

  function reset() {
    setName("")
    setProductCode("")
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }

  function initProductList(list) {
    return list.map(item => (
      <Option key={item.productCode} value={item.productCode}>{item.productName}</Option>
    ))
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">分类名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">选择产品:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select
              value={productCode}
              style={{ width: "100%" }}
              onChange={value => setProductCode(value)}
            >
              <Option value="">请选择</Option>
              {
                (props.productList) ?
                  initProductList(props.productList) : ""
              }
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
        <Link
          className={styles.button}
          to={{
            pathname: "/docCatalog/add",
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
