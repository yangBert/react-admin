import React, { Component } from 'react';
import { Spin, Input, Button, message, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import config from '../config';

const { Option } = Select;

class NoticeAdd extends Component {
  state = {
    editorState: null
  }
  componentDidMount() {

    if (this.props.location.state && this.props.location.state.editId) {
      this.props.queryNoticeDetail({ _this: this, data: { id: this.props.location.state.editId } })
    } else {
      //初始化富文本编辑器
      this.setState({
        editorState: BraftEditor.createEditorState("<p>请输入内容...</b></p>")
      })
    }
  }

  save() {
    const { editTitle, editState, editNoticeType } = this.props;
    const { editorState } = this.state;
    if ($$.trim(editTitle) === "") {
      message.error('请填写公告标题');
      return
    } else if (editNoticeType === "") {
      message.error('请选择公告类型');
      return
    } else if (editorState === null) {
      message.error('请填公告内容');
      return
    }
    const creater = $$.localStorage.get("adminId")
    const createrName = $$.localStorage.get("adminName")
    const req = {
      props: this.props,
      data: {
        title: editTitle,
        noticeType: editNoticeType,
        content: editorState.toHTML(),
        creater,
        createrName,
        state: editState,
      }
    }

    const editId = this.props.location.state && this.props.location.state.editId
    if (editId) {
      req.data.id = editId
    }

    this.props.saveNotice(req)
  }

  handleEditorChange = (editorState) => {
    this.setState({
      editorState: editorState,
    })
  }

  render() {
    const { editorState } = this.state
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="clearfix">
            <div className={`${styles.form} pullLeft`}>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">公告标题:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Input
                    placeholder="请输入标题"
                    allowClear
                    onChange={e => this.props.changeEditTitle(e.target.value)}
                    value={this.props.editTitle}
                  />
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">公告类型:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Select
                    style={{ width: "100%" }}
                    onChange={value => this.props.changeEditNoticeType(value)}
                    value={this.props.editNoticeType}
                  >
                    <Option value="">请选择</Option>
                    {
                      config.noticeType.map(item => (
                        <Option value={item.value} key={item.value}>{item.name}</Option>
                      ))
                    }
                  </Select>
                </div>
              </div>
            </div>
            <div className="pullRight">
              <Button type="primary" className={`${styles.button}`}
                onClick={() => this.save()}
              >保存公告</Button>
              <Link to="/notice/NoticeList">
                <Button className={`${styles.button}`}>返回列表</Button>
              </Link>
            </div>

          </div>
          <div className={`${styles.editContent} my-component`}>
            <BraftEditor
              value={editorState}
              onChange={this.handleEditorChange}
            />
          </div>
        </Spin>
      </div >
    )
  }
}

const mapState = state => ({
  spinning: state.notice.spinning,
  editTitle: state.notice.editTitle,
  editState: state.notice.editState,
  editNoticeType: state.notice.editNoticeType,
})

const mapDispatch = dispatch => ({
  saveNotice: req => {
    const action = creators.createSaveNoticeAction(req);
    dispatch(action);
  },
  changeEditTitle: req => {
    const action = creators.changeEditTitleAction(req);
    dispatch(action);
  },
  changeEditNoticeType: req => {
    const action = creators.changeEditNoticeTypeAction(req);
    dispatch(action);
  },
  queryNoticeDetail: req => {
    const action = creators.queryNoticeDetailAction(req);
    dispatch(action);
  },

})

export default connect(mapState, mapDispatch)(NoticeAdd);