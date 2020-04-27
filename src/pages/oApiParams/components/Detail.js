import React from "react";
import { Card, Descriptions, Button, Icon } from "antd";
import styles from "../css/detail.module.css";

function Detail(props) {
  const {
    apiId,
    isNess,
    paramName,
    paramRemarks,
    paramType,
    state
  } = props.location.state.record;
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="所属API接口：">
                {apiId}
              </Descriptions.Item>
              <Descriptions.Item label="参数名称：">
                {paramName}
              </Descriptions.Item>
              <Descriptions.Item label="参数是否必传：">
                {isNess === "true" ? "是" : "否"}
              </Descriptions.Item>
              <Descriptions.Item label="参数类型：">
                {paramType}
              </Descriptions.Item>
              <Descriptions.Item label="参数状态：">{state}</Descriptions.Item>
            </Descriptions>
            <Descriptions>
              <Descriptions.Item label="参数描述：">
                {paramRemarks}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
        <div className={styles.bottom}>
          <Button
            type="primary"
            className={styles.back}
            onClick={() => props.history.goBack()}
            size="large"
          >
            <Icon type="rollback" />
            返回
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
