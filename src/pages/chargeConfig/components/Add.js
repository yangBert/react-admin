import React, { Component } from 'react';
import { Spin, Input, Button, message, Card, Form } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/add.module.css';
import $$ from 'static/js/base';
import * as config from '../config';

const { Search } = Input;

class Add extends Component {

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editRecord) {
      const { title, url, imgUrl } = this.props.location.state.editRecord
      this.props.onChangeEditTitle(title)
      this.props.onChangeEditURL(url)
      this.props.onChangeEditImageURL(imgUrl)
    }
  }

  save() {
    const { editTitle, editURL, editImageURL } = this.props;
    if ($$.trim(editTitle) === "") {
      message.error('链接标题');
      return
    } else if ($$.trim(editURL) === "") {
      message.error('链接URL');
      return
    } else if ($$.trim(editImageURL) === "") {
      message.error('图片URL');
      return
    }
    const userNo = $$.localStorage.get("adminId")
    const req = {
      props: this.props,
      data: {
        title: $$.trim(editTitle),
        url: $$.trim(editURL),
        imgUrl: editImageURL,
        userNo
      }
    }

    const editId = this.props.location.state && this.props.location.state.editRecord.id
    if (editId) {
      req.data.id = editId
    }
    this.props.save(req)
  }

  mapStatus() {
    let statusArr = [];
    Object.keys(config.status).forEach(k => {
      statusArr.push({ k, v: config.status[k] })
    })
    return statusArr;
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="链接信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">产品：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Search placeholder="请选择产品" onSearch={value => console.log(value)} enterButton="选择产品" />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">链接URL：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="链接URL"
                      onChange={e => this.props.onChangeEditURL(e.target.value)}
                      value={this.props.editURL}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}><label className="pullLeft">图片URL：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="图片URL"
                      onChange={e => this.props.onChangeEditImageURL(e.target.value)}
                      value={this.props.editImageURL}
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
            >保存</Button>
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.props.history.goBack()}
            >返回列表</Button>
          </div>
        </Spin>
      </div>
    )
  }
}

const mapState = state => ({
  spinning: state.link.spinning,
  editTitle: state.link.editTitle,
  editURL: state.link.editURL,
  editImageURL: state.link.editImageURL,
  status: state.link.editStatus,
  saveLoading: state.link.saveLoading,
})

const mapDispatch = dispatch => ({
  // save: req => {
  //   const action = creators.saveAction(req);
  //   dispatch(action);
  // },
  // onChangeEditTitle: value => {
  //   const action = creators.onChangeEditTitleAction(value);
  //   dispatch(action);
  // },
  // onChangeEditURL: value => {
  //   const action = creators.onChangeEditURLAction(value);
  //   dispatch(action);
  // },
  // onChangeEditImageURL: value => {
  //   const action = creators.onChangeEditImageURLAction(value);
  //   dispatch(action);
  // },

})

export default connect(mapState, mapDispatch)(Add);