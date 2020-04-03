import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
const { Search } = Input;

class Add extends Component {

  componentDidMount() {
    if (this.props.location.state.record) {
      const { productName, perfertialName, ruleName, productCode, ruleCode, preferentialCode } = this.props.location.state.record
      this.props.changeConfigStrategyCode(preferentialCode)
      this.props.changeConfigBillingCode(ruleCode)
      this.props.changeConfigProductCode(productCode)
      this.props.changeConfigStrategyName(perfertialName)
      this.props.changeConfigProductName(productName)
      this.props.changeConfigBillingName(ruleName)
      this.props.changeConfigRecord(this.props.location.state.record)
    }
    if (this.props.location.state.preferential) {
      const { strategyCode, strategyName } = this.props.location.state.preferential
      this.props.changeConfigStrategyName(strategyName)
      this.props.changeConfigStrategyCode(strategyCode)
    }
    if (this.props.location.state.billing) {
      const { billingCode, billingName } = this.props.location.state.billing
      this.props.changeConfigBillingName(billingName)
      this.props.changeConfigBillingCode(billingCode)
    }
    if (this.props.location.state.product) {
      const { productCode, productName } = this.props.location.state.product
      this.props.changeConfigProductName(productName)
      this.props.changeConfigProductCode(productCode)
    }
  }

  save() {
    const { strategyCode, billingCode, productCode } = this.props;
    if (productCode === "") {
      message.error('请选择产品');
      return
    } else if (billingCode === "") {
      message.error('请选择计费策略');
      return
    } else if (strategyCode === "") {
      message.error('请选择优惠策略');
      return
    }
    const accountCode = this.props.location.state.accountCode
    const userNo = $$.localStorage.get("adminId")
    const req = {
      props: this.props,
      data: {
        accountCode,
        productCode,
        rechargeId: billingCode,
        preferentialId: strategyCode,
        userNo,
      }
    }

    if (this.props.record) {
      req.data.id = this.props.record.id
    }
    this.props.save(req)
  }

  selectList(pathname, params) {
    const o = {
      pathname,
      state: {
        accountCode: this.props.location.state.accountCode,
        params,
      }
    }
    this.props.history.push(o)
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="配置" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">产品：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Search
                      placeholder="请选择产品"
                      onSearch={() => this.selectList("/rechargeRule/product", this.props.productCode)}
                      onChange={e => null}
                      enterButton="选择"
                      value={this.props.productName}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">计费策略：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Search
                      placeholder="请选择计费策略"
                      onSearch={() => this.selectList("/rechargeRule/billing", this.props.billingCode)}
                      onChange={e => null}
                      enterButton="选择"
                      value={this.props.billingName}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">优惠策略：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Search
                      placeholder="请选择优惠策略"
                      onSearch={() => this.selectList("/rechargeRule/preferential", this.props.strategyCode)}
                      onChange={e => null}
                      enterButton="选择"
                      value={this.props.strategyName}
                    />
                  </div>
                </div>
              </Form>
            </Card>
          </div >

          <div className={styles.formButton}>
            <Button
              type="primary"
              size="large"
              className={styles.formbtn}
              onClick={() => this.save()}
              loading={this.props.saveLoading}
            >保存
            </Button>
            <Link
              to={{
                pathname: '/rechargeRule/list',
                state: {
                  accountCode: this.props.location.state.accountCode,
                }
              }}>
              <Button
                size="large"
                type="primary"
                className={styles.formbtn}
              >返回列表</Button>
            </Link>
          </div>
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  spinning: state.rechargeRuleList.spinning,
  strategyCode: state.rechargeRuleList.strategyCode,
  strategyName: state.rechargeRuleList.strategyName,
  billingName: state.rechargeRuleList.billingName,
  billingCode: state.rechargeRuleList.billingCode,
  productName: state.rechargeRuleList.productName,
  productCode: state.rechargeRuleList.productCode,
  status: state.rechargeRuleList.editStatus,
  saveLoading: state.rechargeRuleList.saveLoading,
  record: state.rechargeRuleList.record,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  changeConfigBillingCode: value => {
    const action = creators.changeConfigBillingCodeAction(value);
    dispatch(action);
  },
  changeConfigBillingName: value => {
    const action = creators.changeConfigBillingNameAction(value);
    dispatch(action);
  },
  changeConfigStrategyCode: value => {
    const action = creators.changeConfigStrategyCodeAction(value);
    dispatch(action);
  },
  changeConfigStrategyName: value => {
    const action = creators.changeConfigStrategyNameAction(value);
    dispatch(action);
  },
  changeConfigProductName: value => {
    const action = creators.changeConfigProductNameAction(value);
    dispatch(action);
  },
  changeConfigProductCode: value => {
    const action = creators.changeConfigProductCodeAction(value);
    dispatch(action);
  },
  changeConfigRecord: value => {
    const action = creators.changeConfigRecordAction(value);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Add);