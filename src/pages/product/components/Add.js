import React, { Component } from "react";
import { Spin, Input, Button, message, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/add.module.css";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import $$ from "static/js/base";
import * as config from "../config";
const { Option } = Select;
const { TextArea } = Input;
class Add extends Component {
  state = {
    editorState: null
  }
  componentDidMount() {
    this.props.queryVerifyApiList({ props: this.props, data: {} })
    if (this.props.location.state && this.props.location.state.record) {
      const {
        productDesc,
        productName,
        productPrice,
        productPaying,
        productTypeCode,
        productRemark,
        tag,
        orderWord,
      } = this.props.location.state.record;
      this.props.setProductName(productName);
      this.props.setProductPrice(productPrice);
      this.props.setProductPaying(productPaying);
      this.props.setProductTypeCode(productTypeCode);
      this.props.setProductRemark(productRemark);
      this.props.setTag(tag);
      this.props.setOrderWord(orderWord);
      this.setState({
        editorState: BraftEditor.createEditorState(productDesc)
      })
    } else {
      //初始化富文本编辑器
      this.setState({
        editorState: BraftEditor.createEditorState("<p>请输入产品描述信息...</b></p>")
      })
    }
  }

  save() {
    const {
      productName,
      productPrice,
      productPaying,
      productTypeCode,
      productRemark,
      tag,
      APIName,
      orderWord
    } = this.props;
    const { editorState } = this.state;
    if ($$.trim(productName) === "") {
      message.error("请填写产品名称");
      return;
    } else if (productTypeCode === "") {
      message.error("请选择产品类型");
      return;
    } else if (productPaying === "") {
      message.error("请选择支付方式");
      return;
    } else if (APIName === "") {
      message.error("请选择对应接口");
      return;
    } else if (productPrice === 0) {
      message.error("请填写产品价格");
      return;
    } else if ($$.trim(tag) === "") {
      message.error("请填写产品标签");
      return;
    } else if ($$.trim(productRemark) === "") {
      message.error("请填写产品备注信息");
      return;
    } else if (orderWord === "") {
      message.error("请填写产品备注信息");
      return;
    }
    else if (editorState === null) {
      message.error("请填写产品描述信息");
      return;
    }
    const creater = $$.localStorage.get("adminId");
    let req = {
      props: this.props,
      data: {
        productName: $$.trim(productName),
        productDesc: editorState.toHTML(),
        creater,
        apiName: APIName,
        orderWord,
        productPrice: productPrice + "",
        productPaying,
        productTypeCode,
        productRemark: $$.trim(productRemark),
        tag: $$.trim(tag)
      }
    };

    if (this.props.location.state && this.props.location.state.record) {
      req.data.productCode = this.props.location.state.record.productCode;
    }
    this.props.save(req);
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { allProductType } = this.props.location.state;
    const { editorState } = this.state
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={`${styles.form} clearfix`}>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">产品名称:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  placeholder="请输入产品名称"
                  allowClear
                  onChange={e => this.props.setProductName(e.target.value)}
                  value={this.props.productName}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">产品类型:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={this.props.productTypeCode}
                  style={{ width: "100%" }}
                  onChange={value => this.props.setProductTypeCode(value)}
                >
                  <Option value="">请选择</Option>
                  {allProductType.map(item => {
                    return (
                      <Option
                        value={item.productTypeCode}
                        key={item.productTypeCode}
                      >
                        {item.productTypeName}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">对应接口:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={this.props.APIName}
                  style={{ width: "100%" }}
                  onChange={value => this.props.setAPIName(value)}
                >
                  <Option value="">请选择</Option>
                  {this.props.verifyApiList.map(item => {
                    return (
                      <Option value={item.apiCode} key={item.apiCode}>
                        {item.apiName}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">支付方式:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={this.props.productPaying}
                  style={{ width: "100%" }}
                  onChange={value => this.props.setProductPaying(value)}
                >
                  <Option value="">请选择</Option>
                  {config.productPaying.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">产品价格:</label>
              <div className={`${styles.inline} pullLeft`}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  precision={2}
                  step={10}
                  value={this.props.productPrice}
                  onChange={value => this.props.setProductPrice(value)}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">产品标签:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  placeholder="（产品标签以&#34; ；&#34;号隔开）"
                  allowClear
                  onChange={e => this.props.setTag(e.target.value)}
                  value={this.props.tag}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">产品排序:</label>
              <div className={`${styles.inline} pullLeft`}>
                <InputNumber
                  style={{ width: "100%" }}
                  min={0}
                  step={1}
                  value={this.props.orderWord}
                  onChange={value => this.props.setOrderWord(value)}
                />
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">产品备注:</label>
              <div className={`${styles.inline} pullLeft`}>
                <TextArea
                  placeholder="产品备注信息"
                  rows={4}
                  onChange={e => this.props.setProductRemark(e.target.value)}
                  value={this.props.productRemark}
                />
              </div>
            </div>
          </div>
          <div className={`${styles.editContent} my-component`}>
            <BraftEditor
              placeholder="请输入正文内容"
              value={editorState}
              onChange={this.handleEditorChange}
            />
          </div>
          <div className={styles.buttonRow}>
            <Button
              type="primary"
              size="large"
              className={`${styles.button}`}
              onClick={() => this.save()}
            >
              保存信息
              </Button>
            <Button
              size="large"
              onClick={() => this.props.history.goBack()}
              className={`${styles.button}`}
            >
              返回列表
              </Button>
          </div>
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  spinning: state.product.spinning,
  productName: state.product.productName,
  allProductType: state.product.allProductType,
  productPrice: state.product.productPrice,
  productPaying: state.product.productPaying,
  productTypeCode: state.product.productTypeCode,
  productRemark: state.product.productRemark,
  tag: state.product.tag,
  verifyApiList: state.product.verifyApiList,
  APIName: state.product.APIName,
  orderWord: state.product.orderWord,
});

const mapDispatch = dispatch => ({
  setProductName: req => {
    const action = creators.setProductNameAction(req);
    dispatch(action);
  },
  setProductPrice: req => {
    const action = creators.setProductPriceAction(req);
    dispatch(action);
  },
  setProductPaying: req => {
    const action = creators.setProductPayingAction(req);
    dispatch(action);
  },
  setProductTypeCode: req => {
    const action = creators.setProductTypeCodeAction(req);
    dispatch(action);
  },
  setProductRemark: req => {
    const action = creators.setProductRemarkAction(req);
    dispatch(action);
  },
  setTag: req => {
    const action = creators.setTagAction(req);
    dispatch(action);
  },
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  queryVerifyApiList: req => {
    const action = creators.verifyApiListAction(req);
    dispatch(action);
  },
  setAPIName: req => {
    const action = creators.setAPINameAction(req);
    dispatch(action);
  },
  setOrderWord: req => {
    const action = creators.setOrderWordAction(req);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(Add);
