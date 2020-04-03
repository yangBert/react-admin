import React, { Component } from 'react';
import { Spin, Input, Button, message, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
// import DocCatalogModal from './DocCatalogModal';
const { Option } = Select;

class Add extends Component {
  state = {
    productCode: "",
    editContent: null
  }
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.record) {
      const { title, content, catalogCode, productCode } = this.props.location.state.record
      this.changeProduct(productCode, catalogCode)
      this.props.changeEditTitle(title)
      this.setState({
        productCode,
        editContent: BraftEditor.createEditorState(content)
      });
    } else {
      this.props.handleEditorChange(BraftEditor.createEditorState('<p>请输入文档内容!</b></p>'))//初始化富文本编辑器
    }
  }

  save() {
    const { editTitle, editCatalogCode } = this.props;
    const { editContent } = this.state;
    if (editCatalogCode === "") {
      message.error('请选择文档分类');
      return
    } else if ($$.trim(editTitle) === "") {
      message.error('请填写公告标题');
      return
    } else if (editContent === "") {
      message.error('请填公告内容');
      return
    }
    const userNo = $$.localStorage.get("adminId")
    const req = {
      props: this.props,
      data: {
        title: editTitle,
        content: editContent.toHTML(),
        catalogCode: editCatalogCode,
        userNo,
      }
    }

    const record = this.props.location.state && this.props.location.state.record
    if (record) {
      req.data.id = record.id
    }
    this.props.save(req)
  }

  handleEditorChange = (editContent) => {
    this.setState({
      editContent,
    })
  }

  initAllProductList(list) {
    return list.map(item => (
      <Option key={item.productCode} value={item.productCode}>{item.productName}</Option>
    ))
  }

  changeProduct(productCode, catalogCode) {
    this.setState({
      productCode
    });
    const userNo = $$.localStorage.get("adminId");
    this.props.changeProduct({
      props: this.props,
      catalogCode,
      data: {
        productCode,
        userNo,
        pageSize: 1000,
        pageNo: 1,
      }
    });
  }

  render() {
    var { productCode } = this.state
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className={`${styles.form} clearfix`}>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">选择产品:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={productCode}
                  style={{ width: "100%" }}
                  onChange={value => this.changeProduct(value, "")}
                >
                  <Option value="">请选择</Option>
                  {this.initAllProductList(this.props.location.state.productAllList)}
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">选择文档分类:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={this.props.editCatalogCode}
                  style={{ width: "100%" }}
                  onChange={value => this.props.setCatalogCode(value)}
                >
                  <Option value="">请选择</Option>
                  {
                    this.props.docCatalogList.map(item => (
                      <Option key={item.id} value={item.code}>{item.name}</Option>
                    ))
                  }
                </Select>
              </div>
            </div>
            <div className={`${styles.formLine} pullLeft`}>
              <label className="pullLeft">文档标题:</label>
              <div className={`${styles.inline} pullLeft`}>
                <Input
                  value={this.props.editTitle}
                  placeholder="请输入文档标题"
                  allowClear
                  onChange={e => this.props.changeEditTitle(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonRow}>
            <Button type="primary" className={`${styles.button}`}
              onClick={() => this.save()}
            >保存文档</Button>
            <Link to="/doc/list">
              <Button className={`${styles.button}`}>返回列表</Button>
            </Link>
          </div>
          <div className={`${styles.editContent} my-component`}>
            <BraftEditor
              placeholder="请输入正文内容"
              value={this.state.editContent}
              onChange={this.handleEditorChange}
            />
          </div>
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  spinning: state.doc.spinning,
  docCatalogList: state.doc.docCatalogList,
  editCatalogCode: state.doc.editCatalogCode,
  editTitle: state.doc.editTitle,
  editContent: state.doc.editContent,
  editState: state.doc.editState,
})

const mapDispatch = dispatch => ({
  changeProduct: req => {
    const action = creators.queryDocCatalogListAction(req);
    dispatch(action);
  },
  setCatalogCode: req => {
    const action = creators.setCatalogCodeAction(req);
    dispatch(action);
  },

  save: req => {
    const action = creators.createSaveAction(req);
    dispatch(action);
  },
  changeEditTitle: req => {
    const action = creators.changeEditTitleAction(req);
    dispatch(action);
  },
  handleEditorChange: editorState => {
    const action = creators.changeEditorContentAction(editorState.toHTML());
    dispatch(action);
  },
  queryNoticeDetail: req => {
    const action = creators.queryNoticeDetailAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Add);