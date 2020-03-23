import React, { Component } from 'react';
import { Spin, Input, Button, message, Select, Card, Form, InputNumber } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';

const { Option } = Select;

class Add extends Component {
  componentDidMount() {
    if (this.props.location.state) {
      if (this.props.location.state.editRecord) {
        const { orders, productCode, name } = this.props.location.state.editRecord
        this.initForm(productCode, name, orders)
      } else {
        this.initForm("", "", "")
      }
    }
  }

  initForm(productCode, name, orders) {
    this.props.onChangeProductCode(productCode)
    this.props.onChangeEditName(name)
    this.props.onChangeOrders(orders)
  }

  initProductList(list) {
    return list.map(item => (
      <Option key={item.productCode} value={item.productCode}>{item.productName}</Option>
    ))
  }

  save() {
    const {
      editProductCode,
      editName,
      editOrders
    } = this.props;
    if ($$.trim(editProductCode) === "") {
      message.error('请选择产品');
      return
    } else if ($$.trim(editName) === "") {
      message.error('请填写分类名称');
      return
    } else if (!editOrders) {
      message.error('请填写分类排序');
      return
    }
    const userNo = $$.localStorage.get("adminId")
    const req = {
      props: this.props,
      data: {
        productCode: $$.trim(editProductCode),
        name: $$.trim(editName),
        userNo,
        orders: editOrders,
      }
    }

    if (this.props.location.state.editRecord) {
      const { id, code } = this.props.location.state.editRecord
      req.data.id = id
      req.data.code = code
    }

    this.props.saveForm(req)
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card
              title={this.props.location.state && this.props.location.state.editRecord ? "修改" : "新增"}
              bordered={false}>
              <Form className={`${styles.form} clearfix`}>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">产品名称:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Select
                      style={{ width: "100%" }}
                      onChange={value => this.props.onChangeProductCode(value)}
                      value={this.props.editProductCode}
                    >
                      <Option value="">请选择</Option>
                      {
                        (this.props.location.state && this.props.location.state.productList) ?
                          this.initProductList(this.props.location.state.productList) : ""
                      }
                    </Select>
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">分类名称:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      allowClear
                      onChange={e => this.props.onChangeEditName(e.target.value)}
                      value={this.props.editName}
                    />
                  </div>
                </div>

                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">分类排序:</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <InputNumber
                      style={{ width: "100%" }}
                      min={1}
                      value={this.props.editOrders}
                      onChange={value => this.props.onChangeOrders(value)}
                    />
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
              size="large"
              type="primary"
              className={styles.button}
              onClick={() => this.props.history.goBack()}
            >返回列表</Button>

          </div>
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  spinning: state.docCatalog.spinning,
  editProductCode: state.docCatalog.editProductCode,
  editName: state.docCatalog.editName,
  editOrders: state.docCatalog.editOrders,
})

const mapDispatch = dispatch => ({
  onChangeProductCode: value => {
    const action = creators.onChangeProductCodeAction(value);
    dispatch(action);
  },
  onChangeEditName: value => {
    const action = creators.onChangeEditNameAction(value);
    dispatch(action);
  },
  onChangeOrders: value => {
    const action = creators.onChangeOrdersAction(value);
    dispatch(action);
  },
  saveForm: req => {
    const action = creators.saveFormAction(req);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Add);