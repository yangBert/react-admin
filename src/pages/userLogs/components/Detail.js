import React from "react";
import { Card, Descriptions, Button, Input } from "antd";
import styles from "../css/detail.module.css";
import $$ from "static/js/base";
import * as config from "../config";
const { TextArea } = Input;

function Detail(props) {
  const {
    userId,
    operateType,
    method,
    logTime,
    paramReq,
    paramRes
  } = props.location.state.record;
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="管理员日志详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="操作人：">{userId}</Descriptions.Item>
              <Descriptions.Item label="操作描述：">
                {config.method[method] ? config.method[method] : "--"}
              </Descriptions.Item>
              <Descriptions.Item label="操作编码：">
                {operateType}
              </Descriptions.Item>
              <Descriptions.Item label="操作时间：">
                {$$.getHours(logTime)}
              </Descriptions.Item>
            </Descriptions>
            <div className={styles.desc}>
              <p className={styles.label}>请求参数JSON：</p>
              <TextArea rows={4} value={paramReq} />
            </div>
            <div className={styles.desc}>
              <p className={styles.label}>响应参数JSON：</p>
              <TextArea rows={4} value={paramRes} />
            </div>
          </Card>
        </div>
        <div className={styles.bottom}>
          <Button
            type="primary"
            className={styles.back}
            onClick={() => props.history.goBack()}
            size="large"
          >
            返回
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
