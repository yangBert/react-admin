import React from 'react';
import { Card, Descriptions, Button } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';

function Detail(props) {
  const {
    accountName,
    accountType,
    accessScrect,
    accesskeyId,
    accountCode,
    status,
    createdAt,
    createdBy,
    orgCode,
    balanceMoney,
    totalMoney,
    lastRechargeMoney,
    lastRechargeTime,
    lastUpdatedTime,
    parentAccount,
  } = props.location.state.record
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="账户信息" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="账户名">{accountName}</Descriptions.Item>
              <Descriptions.Item label="账户类型">
                {accountType === '01' ? '个人账户' : accountType === '02' ? '企业账户' : "未知类型"}
              </Descriptions.Item>
              <Descriptions.Item label="账户编码">{accountCode}</Descriptions.Item>
              <Descriptions.Item label="账户状态">{status}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{$$.getHours(createdAt)}</Descriptions.Item>
              <Descriptions.Item label="创建人">{createdBy}</Descriptions.Item>
              <Descriptions.Item label="账户访问密钥">{accessScrect}</Descriptions.Item>
              <Descriptions.Item label="账户访问唯一编码">{accesskeyId}</Descriptions.Item>
              <Descriptions.Item label="所属于单位">{orgCode}</Descriptions.Item>
              <Descriptions.Item label="可用余额（元）">{balanceMoney === null ? "0.00" : balanceMoney}</Descriptions.Item>
              <Descriptions.Item label="充值总金额（元）">{totalMoney === null ? "0.00" : totalMoney.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="最后一次充值金额（元）">{lastRechargeMoney === null ? "0.00" : lastRechargeMoney.toFixed(2)}</Descriptions.Item>
              <Descriptions.Item label="最后一次充值时间">{lastRechargeTime && $$.getHours(lastRechargeTime)}</Descriptions.Item>
              <Descriptions.Item label="最后更新时间">{lastUpdatedTime && $$.getHours(lastUpdatedTime)}</Descriptions.Item>
              <Descriptions.Item label="父账户">{parentAccount}</Descriptions.Item>
            </Descriptions>

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