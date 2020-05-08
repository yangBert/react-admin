import React from 'react';
import { Card, Descriptions, Button, Input, Modal } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import { PhotoProvider, PhotoConsumer } from "react-photo-view";
import "react-photo-view/dist/index.css";

const { TextArea } = Input;
const { confirm } = Modal;
let reaOfFail = "";
function Detail(props) {
  if (props.location.state.record) {
    var {
      applyTime,
      state,
      userId,
      userName,
      orgCode,
      orgName,
      authFileViewUrl,
      id
    } = props.location.state.record;
  }

  function submitFn(orgCode, userId, state) {
    const req = {
      props,
      data: {
        id: orgCode,
        state,
        userId
      }
    }
    if (state === '2') {
      req.data.reaOfFail = reaOfFail
    }
    props.audit(req)
  }

  function audit(orgCode, userId, state) {
    if (state === '2') {
      confirm({
        title: '请输入不通过的原因',
        content: <TextArea rows={4} onChange={e => changeTextarea(e.target.value)} />,
        onOk() {
          submitFn(orgCode, userId, state)
        },
        onCancel() { },
      });
    } else {
      submitFn(orgCode, userId, state)
    }
  }

  function changeTextarea(value) {
    reaOfFail = value
  }

  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="机构名称">{orgName}</Descriptions.Item>
              <Descriptions.Item label="机构统一社会信用代码">{orgCode}</Descriptions.Item>
              <Descriptions.Item label="申请人">{userName}</Descriptions.Item>
              <Descriptions.Item label="状态">{state === '0' ? '待审核' : state === '1' ? '审核通过' : '审核未通过'}</Descriptions.Item>
              {
                state !== '0' && <Descriptions.Item label="审核通过时间">{applyTime && $$.getHours(applyTime)}</Descriptions.Item>
              }
            </Descriptions>
            <p>机构授权书：</p>

            <PhotoProvider>
              <PhotoConsumer
                src={authFileViewUrl}
                intro="机构授权书"
              >
                <img style={{ width: "100px", height: "100px", cursor: "pointer" }} src={authFileViewUrl} alt="机构授权书" />
              </PhotoConsumer>
            </PhotoProvider>
          </Card>
        </div>
        <div className={styles.bottom}>
          {
            state === '0' ?
              <span>
                <Button
                  type="primary"
                  onClick={() => audit(id, userId, '1')}
                  size="large">审核通过</Button>&nbsp;&nbsp;
                <Button
                  type="primary"
                  onClick={() => audit(id, userId, '2')}
                  size="large">审核不通过</Button>
              </span> : ""
          }
          &nbsp;&nbsp;
          <Button
            type="primary"
            onClick={() => props.history.goBack()}
            className={state !== '0' ? styles.back : null}
            size="large">返回</Button>
        </div>
      </div>
    </div >
  )
}

const mapDispatch = dispatch => ({
  audit: req => {
    const action = creators.auditAction(req);
    dispatch(action);
  },
})

export default connect(null, mapDispatch)(Detail);