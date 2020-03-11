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
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.record) {
      console.log("record", this.props.location.state.record);
      const {
        productDesc,
        productName,
        productPrice,
        productPaying,
        productTypeCode,
        productRemark,
        tag
      } = this.props.location.state.record;
      this.props.setProductName(productName);
      this.props.setProductPrice(productPrice);
      this.props.setProductPaying(productPaying);
      this.props.setProductTypeCode(productTypeCode);
      this.props.setProductRemark(productRemark);
      this.props.setTag(tag);
      this.props.setEditContent(BraftEditor.createEditorState(productDesc));
    } else {
      //初始化富文本编辑器
      this.props.setEditContent(
        BraftEditor.createEditorState("<p>请输入产品描述信息!</b></p>")
      );
    }
  }

  save() {
    const {
      productName,
      editContent,
      productPrice,
      productPaying,
      productTypeCode,
      productRemark,
      tag
    } = this.props;
    if ($$.trim(productName) === "") {
      message.error("请填写产品名称");
      return;
    } else if (productTypeCode === "") {
      message.error("请选择产品类型");
      return;
    } else if (productPaying === "") {
      message.error("请选择支付方式");
      return;
    } else if (productPrice == 0) {
      message.error("请填写产品价格");
      return;
    } else if ($$.trim(tag) === "") {
      message.error("请填写产品标签");
      return;
    } else if ($$.trim(productRemark) === "") {
      message.error("请填写产品备注信息");
      return;
    } else if (editContent.toHTML() === "") {
      message.error("请填写产品描述信息");
      return;
    }
    const creater = $$.localStorage.get("adminId");
    let req = {
      props: this.props,
      data: {
        productName: $$.trim(productName),
        productDesc: editContent.toHTML(),
        creater,
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

  handleEditorChange = editorState => {
    this.setState({
      editorState: editorState
    });
  };

  render() {
    const { allProductType } = this.props.location.state;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="clearfix">
            <div className={`${styles.form} pullLeft`}>
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

            <div className="pullRight">
              <Button
                type="primary"
                className={`${styles.button}`}
                onClick={() => this.save()}
              >
                保存信息
              </Button>
              <Button
                onClick={() => this.props.history.goBack()}
                className={`${styles.button}`}
              >
                返回列表
              </Button>
            </div>
          </div>
          <div className={`${styles.editContent} my-component`}>
            <BraftEditor
              placeholder="请输入正文内容"
              value={this.props.editContent}
              onChange={this.props.setEditContent}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

const mapState = state => ({
  spinning: state.product.spinning,
  productName: state.product.productName,
  editContent: state.product.editContent,
  allProductType: state.product.allProductType,
  productPrice: state.product.productPrice,
  productPaying: state.product.productPaying,
  productTypeCode: state.product.productTypeCode,
  productRemark: state.product.productRemark,
  tag: state.product.tag
});

const mapDispatch = dispatch => ({
  setProductName: req => {
    const action = creators.setProductNameAction(req);
    dispatch(action);
  },
  setEditContent: req => {
    const action = creators.setEditContentAction(req);
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
  }
});

export default connect(mapState, mapDispatch)(Add);
