import React, { Component } from 'react';
import { Spin, Input, Button, message, Select } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import $$ from 'static/js/base';
import * as config from '../config';

const { Option } = Select;

class Add extends Component {
  state = {
    title: "",
    type: "",
    id: "",
    editorState: null
  }
  componentDidMount() {
    if (this.props.location.state && this.props.location.state.record) {
      const { title, type, id, content } = this.props.location.state.record;
      this.setState({
        title,
        type,
        id,
        editorState: BraftEditor.createEditorState(content)
      })
    } else {
      this.setState({
        editorState: BraftEditor.createEditorState('<p>请描述常见问题...</p>')
      })
    }
  }

  save() {
    const { editorState, title, id, type } = this.state;
    if ($$.trim(title) === "") {
      message.error('请填写公告标题');
      return
    } else if (editorState === null) {
      message.error('请填公告内容');
      return
    }
    const createdBy = $$.localStorage.get("adminId")
    let req = {
      props: this.props,
      data: {
        title,
        content: editorState.toHTML(),
        createdBy,
        type,
      }
    }

    if (id) {
      req.data.id = id;
    }
    this.props.save(req)
  }

  mapArr() {
    let arr = [];
    Object.keys(config.type).forEach(k => {
      arr.push({ k, v: config.type[k] })
    })
    return arr;
  }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className={`${styles.pageContet} pageContentColor`}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="clearfix">
            <div className={`${styles.form} pullLeft`}>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">常见问题:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Input
                    placeholder="常见问题"
                    allowClear
                    onChange={e => this.setState({ title: e.target.value })}
                    value={this.state.title}
                  />
                </div>
              </div>
              <div className={`${styles.formLine} pullLeft`}>
                <label className="pullLeft">类型:</label>
                <div className={`${styles.inline} pullLeft`}>
                  <Select
                    value={this.state.type}
                    style={{ width: "100%" }}
                    onChange={value => this.setState({ type: value })}
                  >
                    <Option value="">请选择</Option>
                    {
                      this.mapArr().map(item => {
                        return <Option value={item.k} key={item.k}>{item.v}</Option>
                      })
                    }
                  </Select>
                </div>
              </div>
            </div>
            <div className="pullRight">
              <Button type="primary" className={`${styles.button}`}
                onClick={() => this.save()}
              >保存</Button>
              <Button className={`${styles.button}`}
                onClick={() => this.props.history.goBack()}
              >返回</Button>
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
  spinning: state.question.spinning,
  editTitle: state.question.editTitle,
  editType: state.question.editType,
  editContent: state.question.editContent,
  editState: state.question.editState,
})

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.createSaveAction(req);
    dispatch(action);
  },
  changeEditTitle: req => {
    const action = creators.changeEditTitleAction(req);
    dispatch(action);
  },
  setEditType: req => {
    const action = creators.setEditTypeAction(req);
    dispatch(action);
  },
  queryDetail: id => {
    const action = creators.queryDetailAction(id);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(Add);