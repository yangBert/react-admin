import React from 'react';
import { Card,Descriptions,Button } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';


function Detail(props) {
  const {
    instanceCode,
    name,
    code,
    status,
    feeCode,
    userNo,
    instanceType,
    contactName,
    contactPhone,
    payTime,
    lastUpdateTime,
    finishTime,
    paySum,
    totalSum,
    parentAccount,
  } = props.location.state.record
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="受理单详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="受理单号">{instanceCode}</Descriptions.Item>
              <Descriptions.Item label="申请单名称">{name}</Descriptions.Item>
              <Descriptions.Item label="等级编码">{code}</Descriptions.Item>
              <Descriptions.Item label="状态">{status}</Descriptions.Item>
              <Descriptions.Item label="收费编码">{feeCode}</Descriptions.Item>
              <Descriptions.Item label="用户编码">{userNo}</Descriptions.Item>
              <Descriptions.Item label="订单类型">{instanceType}</Descriptions.Item>
              <Descriptions.Item label="联系人">{contactName}</Descriptions.Item>
              <Descriptions.Item label="联系人手机号">{contactPhone}</Descriptions.Item>
              <Descriptions.Item label="支付时间">{$$.getHours(payTime)}</Descriptions.Item>
              <Descriptions.Item label="最后更新时间">{$$.getHours(lastUpdateTime)}</Descriptions.Item>
              <Descriptions.Item label="结束时间">{$$.getHours(finishTime)}</Descriptions.Item>
              <Descriptions.Item label="支付金额">{paySum}</Descriptions.Item>
              <Descriptions.Item label="订单总金额">{totalSum}</Descriptions.Item>
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