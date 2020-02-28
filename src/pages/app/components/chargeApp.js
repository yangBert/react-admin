import React, { Component } from 'react';
import {
  Spin,
  Button,
  message,
  Select,
  Card,
  Form,
  TreeSelect
} from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/chargeApp.module.css';

const { Option } = Select;

class chargeApp extends Component {
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.appCode) {
        //const appCode = this.props.location.state.appCode
        // this.props.queryChargeAppDetail({
        //   props: this.props,
        //   data: { appCode }
        // })
      }
    }
  }

  initProductList(list) {
    return list.map(item => (
      <Option key={item.productCode} value={item.productCode}>{item.productName}</Option>
    ))
  }

  save() {
    const {
      product,
      preferential,
      billing
    } = this.props;
    if (product === "") {
      message.error('请选择产品');
      return
    } else if (billing === "") {
      message.error('请选择计费策略');
      return
    } else if (preferential === "") {
      message.error('请选择优惠策略');
      return
    }
    const appCode = this.props.location.state.appCode
    const req = {
      props: this.props,
      data: {
        productCode: product,
        ruleCode: billing,
        appCode,
        preferentialCode: preferential,
      }
    }

    this.props.saveForm(req)
  }

  //递归
  recursiveFn(arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].title = arr[i].productTypeName
      arr[i].value = arr[i].productTypeCode
      if (arr[i].children && arr[i].children.length > 0) {
        this.recursiveFn(arr[i].children)
      }
    }
    return arr;
  }

  queryProduct(productTypeCode) {
    this.props.changeProductType({ props: this.props, data: { pageSize: 10000, pageNo: 1, productTypeCode } })
  }

  fetchBilling = value => {
    this.props.queryBillingList({
      props: this.props,
      data: { title: value }
    })
  };

  fetchPreferential = value => {
    this.props.queryPreferentialList({
      props: this.props,
      data: { strategyName: value }
    })
  };

  render() {
    const allProductType = this.props.location.state.allProductType
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card
              title="应用配置"
              bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">产品类型:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <TreeSelect
                      style={{ width: '100%' }}
                      //value={this.props.productType}
                      dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                      treeData={this.recursiveFn(allProductType)}
                      placeholder="请选择"
                      //treeDefaultExpandAll
                      onChange={value => this.queryProduct(value)}
                    />
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">请选择产品:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      placeholder="请选择"
                      value={this.props.product}
                      onChange={value => this.props.changeProduct(value)}
                    >
                      <Option value="">请选择</Option>
                      {
                        this.props.productList.map(item => <Option key={item.productCode} value={item.productCode}>{item.productName}</Option>)
                      }
                    </Select>
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">计费策略(输入关键字查询):</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      showSearch
                      value={this.props.billing}
                      placeholder="输入关键字查询计费策略"
                      notFoundContent={this.props.billingFetching ? <Spin size="small" /> : null}
                      filterOption={false}
                      onSearch={this.fetchBilling}
                      onChange={value => this.props.changeBilling(value)}
                      style={{ width: '100%' }}
                    >
                      {
                        this.props.billingList.map(item => (
                          <Option key={item.id} value={item.code}>{item.title}</Option>
                        ))}
                    </Select>
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">优惠策略(输入关键字查询):</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      showSearch
                      value={this.props.preferential}
                      placeholder="输入关键字查询优惠策略"
                      notFoundContent={this.props.preferentialFetching ? <Spin size="small" /> : null}
                      filterOption={false}
                      onSearch={this.fetchPreferential}
                      onChange={value => this.props.changePreferential(value)}
                      style={{ width: '100%' }}
                    >
                      {
                        this.props.preferentialList.map(item => (
                          <Option key={item.id} value={item.strategyCode}>{item.strategyName}</Option>
                        ))}
                    </Select>
                  </div>
                </div>
              </Form>
            </Card>

          </div>
          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.button}
              onClick={() => this.save()}
            >保存</Button>
            <Button
              onClick={() => this.props.history.goBack()}
              size="large"
              type="primary"
              className={styles.button}
            >返回列表</Button>
          </div>
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  spinning: state.app.spinning,
  chargeDetail: state.app.chargeDetail,
  productList: state.app.productList,
  product: state.app.product,
  billingList: state.app.billingList,
  billing: state.app.billing,
  billingFetching: state.app.billingFetching,
  preferentialList: state.app.preferentialList,
  preferential: state.app.preferential,
})

const mapDispatch = dispatch => ({
  // queryChargeAppDetail: req => {
  //   const action = creators.queryChargeAppDetailAction(req);
  //   dispatch(action);
  // },
  changeProduct: req => {
    const action = creators.changeProductAction(req);
    dispatch(action);
  },
  changeProductType: req => {
    const action = creators.changeProductTypeAction(req);
    dispatch(action);
  },
  queryBillingList: req => {
    const action = creators.queryBillingListAction(req);
    dispatch(action);
  },
  changeBilling: value => {
    const action = creators.changeBillingAction(value);
    dispatch(action);
  },
  queryPreferentialList: req => {
    const action = creators.queryPreferentialListAction(req);
    dispatch(action);
  },
  changePreferential: req => {
    const action = creators.changePreferentialAction(req);
    dispatch(action);
  },
  saveForm: req => {
    const action = creators.saveFormAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(chargeApp);