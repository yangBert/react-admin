import React, { Component } from "react";
import { Spin, Input, Button, message, Card, Form } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/add.module.css";
import $$ from "static/js/base";

let imageFile = null;
class Add extends Component {
  state = {
    loading: false
  };

  componentDidMount() {
    if (this.props.location.state && this.props.location.state.editRecord) {
      const { title, url, imgUrl } = this.props.location.state.editRecord;
      this.props.onChangeEditTitle(title);
      this.props.onChangeEditURL(url);
      this.props.onChangeEditImageURL(imgUrl);
      this.props.changeShowImage(true);
    }
  }

  save() {
    const { editTitle, editURL } = this.props;
    if ($$.trim(editTitle) === "") {
      message.error("请上填写链接标题");
      return;
    } else if ($$.trim(editURL) === "") {
      message.error("请上填写链接URL");
      return;
    } else if (!imageFile) {
      message.error("请上传图片");
      return;
    }
    const userNo = $$.localStorage.get("adminId");
    var formDatas = new FormData();
    formDatas.append("file", imageFile);
    formDatas.append("userNo", userNo);
    formDatas.append("title", editTitle);
    formDatas.append("url", editURL);

    const editId =
      this.props.location.state && this.props.location.state.editRecord.id;
    if (editId) {
      formDatas.append("id", editId);
    }
    this.props.save({ props: this.props, data: formDatas });
  }

  clickFile() {
    this.refs.myFile.click();
  }

  fileChange(ele) {
    imageFile = ele.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      this.refs.img.src = reader.result;
      this.props.changeShowImage(true);
    };
  }

  render() {
    return (
      <div className={styles.pageContet}>
        <Spin tip="Loading..." spinning={this.props.spinning}>
          <div className="pageContentColor">
            <Card title="链接信息" bordered={false}>
              <Form className={`${styles.form} clearfix`}>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">链接标题：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="链接标题"
                      onChange={e =>
                        this.props.onChangeEditTitle(e.target.value)
                      }
                      value={this.props.editTitle}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">链接URL：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <Input
                      className={styles.text}
                      placeholder="链接URL"
                      onChange={e => this.props.onChangeEditURL(e.target.value)}
                      value={this.props.editURL}
                    />
                  </div>
                </div>
                <div className={`${styles.formLine} pullLeft`}>
                  <label className="pullLeft">上传图片：</label>
                  <div className={`${styles.inline} pullLeft`}>
                    <div className={styles.uploadImg}>
                      <img
                        src={this.props.editImageURL}
                        ref="img"
                        className={
                          this.props.showImage
                            ? styles.showimg
                            : styles.hiddenimg
                        }
                        alt="上传"
                      />
                    </div>
                    <Button
                      type="primary"
                      className={styles.upload}
                      onClick={() => this.clickFile()}
                    >
                      选择文件
                    </Button>
                    <input
                      onChange={e => this.fileChange(e.target)}
                      type="file"
                      style={{ display: "none" }}
                      ref="myFile"
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
              className={styles.formbtn}
              onClick={() => this.save()}
              loading={this.props.saveLoading}
            >
              保存
            </Button>
            <Button
              size="large"
              type="primary"
              className={styles.formbtn}
              onClick={() => this.props.history.goBack()}
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
  spinning: state.link.spinning,
  editTitle: state.link.editTitle,
  editURL: state.link.editURL,
  showImage: state.link.showImage,
  editImageURL: state.link.editImageURL,
  status: state.link.editStatus,
  saveLoading: state.link.saveLoading
});

const mapDispatch = dispatch => ({
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  },
  onChangeEditTitle: value => {
    const action = creators.onChangeEditTitleAction(value);
    dispatch(action);
  },
  onChangeEditURL: value => {
    const action = creators.onChangeEditURLAction(value);
    dispatch(action);
  },
  onChangeEditImageURL: value => {
    const action = creators.onChangeEditImageURLAction(value);
    dispatch(action);
  },
  changeShowImage: value => {
    const action = creators.changeShowImageAction(value);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Add);
