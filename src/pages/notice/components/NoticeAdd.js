import React, { Component } from 'react';
import { Spin, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';

class NoticeAdd extends Component {
  componentDidMount() {
    console.log("id", this.props.location.state)
  }

  save() {
    const { editTitle, editContent } = this.props;
    if ($$.trim(editTitle) === "") {
      message.error('请填写公告标题');
      return
    } else if ($$.trim(editContent) === "") {
      message.error('请填公告内容');
      return
    }

    const req = {
      props: this.props,
      data: { title: editTitle, content: editContent }
    }

    const editId = this.props.location.state && this.props.location.state.editId
    if (editId) {
      req.data.id = editId
    }

    this.props.saveNotice(req)
  }

  render() {
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
              placeholder="请输入正文内容"
              value={this.props.editContent}
              onChange={this.props.handleEditorChange}
            // onSave={this.submitContent}
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
  editContent: state.notice.editContent,
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
  handleEditorChange: content => {
    const action = creators.changeEditorContentAction(content.toHTML());
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(NoticeAdd);