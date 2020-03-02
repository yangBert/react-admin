import React from 'react';
import { Card,Descriptions,Button } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';
import * as config from '../config';

function Detail(props) {
  if(props.location.state.record){
    var {
      userName,
      userRealname,
      sex,
      phoneNo,
      idCard,
      status,
      lastLoginTime,
      lastUpdateTime,
      level,
      qq,
      wechatNo,
      alipyNo,
      email,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
      startDate,
      endDate
    } = props.location.state.record;
  }
  return (
    <div>
      <div className={styles.pageContet}>
        <div className="pageContentColor">
          <Card title="用户详情" bordered={false}>
            <Descriptions>
              <Descriptions.Item label="账号">{userName}</Descriptions.Item>
              <Descriptions.Item label="真实姓名">{userRealname}</Descriptions.Item>
              <Descriptions.Item label="性别">{sex}</Descriptions.Item>
              <Descriptions.Item label="身份证">{idCard}</Descriptions.Item>
              <Descriptions.Item label="手机号码">{phoneNo}</Descriptions.Item>
              <Descriptions.Item label="状态">{config.status[status] ? config.status[status] : "--"}</Descriptions.Item>
              <Descriptions.Item label="最后登录时间">{$$.getHours(lastLoginTime)}</Descriptions.Item>
              <Descriptions.Item label="最后更新时间">{$$.getHours(lastUpdateTime)}</Descriptions.Item>
              <Descriptions.Item label="认证等级">{level}</Descriptions.Item>
              <Descriptions.Item label="QQ号码">{qq}</Descriptions.Item>
              <Descriptions.Item label="微信号码">{wechatNo}</Descriptions.Item>
              
              <Descriptions.Item label="支付宝账号">{alipyNo}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
              <Descriptions.Item label="创建日期">{$$.getHours(createdAt)}</Descriptions.Item>
              <Descriptions.Item label="更新日期">{$$.getHours(updatedAt)}</Descriptions.Item>
              <Descriptions.Item label="创建人">{createdBy}</Descriptions.Item>
              <Descriptions.Item label="更新人">{updatedBy}</Descriptions.Item>
              <Descriptions.Item label="开始日期">{$$.getHours(startDate)}</Descriptions.Item>
              <Descriptions.Item label="结束日期">{$$.getHours(endDate)}</Descriptions.Item>
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