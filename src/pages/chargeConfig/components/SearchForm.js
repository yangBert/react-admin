import React, { useState } from "react";
import { Button, Select, Icon, Spin } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import moment from "moment";
import { Link, withRouter } from "react-router-dom";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { Option } = Select

function SearchForm(props) {
  const [productName, setProductName] = useState("");
  const [fetching, setFetching] = useState(false);
  const [productCode, setProductCode] = useState("");

  function search() {
    const data = {
      pageSize: 10,
      pageNo: 1,
      appCode: props.appCode,
      productCode
    };
    props.querylist({ props, data });
  }

  function reset() {
    setProductName("")
    setProductCode("")
    const data = { pageNo: 1, pageSize: 10, appCode: props.appCode }
    props.querylist({ props, data })
  }


  function fetchProductList(productName) {
    setFetching(true);
    props.fetchProductList({
      props,
      data: { productName }
    })
  };

  function changeProductName(productName, option) {
    setProductName(productName)
    setFetching(false)
    props.initfetchProductList([])
    setProductCode(option.key)
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">产品名称:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select
                showSearch
                value={productName}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={fetchProductList}
                onChange={(value, options) => changeProductName(value, options)}
                style={{ width: '100%' }}
              >
                {props.productListArr.map(d => (
                  <Option key={d.productCode}>{d.productName}</Option>
                ))}
              </Select>
            </div>
          </div>
          <label className="pullLeft">&nbsp;&nbsp;&nbsp;</label>
          <Button onClick={() => search()} type="primary">
            <Icon type="search" />
            查询
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => reset()} type="primary" ghost>
            <Icon type="undo" />
            重置
          </Button>
          &nbsp;&nbsp;
          <Link
            to={{
              pathname: "/chargeConfig/add",
              state: { appCode: props.location.state.appCode }
            }}
          >
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="plus" />
              新增
            </Button>
          </Link>
          &nbsp;&nbsp;
          <Link
            to={{
              pathname: "/app/appList"
            }}
          >
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="rollback" />
              返回
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  productListArr: state.chargeConfig.productListArr
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  fetchProductList: req => {
    const action = creators.fetchProductListAction(req);
    dispatch(action);
  },
  initfetchProductList: req => {
    const action = creators.initfetchProductListAction(req);
    dispatch(action);
  },
});

export default withRouter(connect(mapState, mapDispatch)(SearchForm));
