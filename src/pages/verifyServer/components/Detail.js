import React from 'react';
import { Card, Descriptions, Button, Input } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';
const { TextArea } = Input;

function Detail(props) {
  const {
    user,
    methodName,
    methodTime,
    methodLog
  } = props.location.state.record
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="管理员日志详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="操作人：">{user}</Descriptions.Item>
              <Descriptions.Item label="操作描述：">{methodName}</Descriptions.Item>
              <Descriptions.Item label="操作时间：">{$$.getHours(methodTime)}</Descriptions.Item>
            </Descriptions>
            <div className={styles.desc}>
              <p className={styles.label}>响应结果：</p>
              <TextArea rows={4} value={methodLog} />
            </div>
          </Card>
        </div>
        <div className={styles.bottom}>
          <Button
            type="primary"
            className={styles.back}
            onClick={() => props.history.goBack()}
            size="large">返回</Button>
        </div>
      </div>
    </div>
  )
}

export default Detail;