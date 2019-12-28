import React from 'react';
import { connect } from 'react-redux';
import styles from '../css/detail.module.css';
import { Descriptions, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
const { TextArea } = Input;
function CertDetail(props) {

  const info = props.location.state.detailInfo
  console.log(info)
  return (
    <div className={`${styles.pageContet} pageContentColor`}>
      <div className={styles.info}>
        <Descriptions title="用户证书信息">
          <Descriptions.Item label="签名证书序列号">{info.certSerNum}</Descriptions.Item>
          <Descriptions.Item label="有效开始时间">{$$.getHours(info.validityBegin)}</Descriptions.Item>
          <Descriptions.Item label="有效结束时间">{$$.getHours(info.validityEnd)}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{$$.getHours(info.createTime)}</Descriptions.Item>
          <Descriptions.Item label="颁发机构">{info.certIssuerCN}</Descriptions.Item>
          <Descriptions.Item label="证书状态">
            {info.state === '1' ? '正常' : info.state === '2' ? '挂失' : info.state === '3' ? '作废' : "未知状态"}
          </Descriptions.Item>
        </Descriptions>
        <div>
          <h6>签名证书</h6>
          <p>
            <TextArea rows={6} className={styles.textarea} value={info.signcert} />
          </p>
        </div>
        <div className={styles.bottom}>
          <Link to="/cert/certList">
            <Button type="primary" className={styles.back} size="large">返回</Button>
          </Link>
        </div>
      </div>

    </div >
  )
}

const mapState = state => ({
  detailInfo: state.cert.editTitle,
})

export default connect(mapState, null)(CertDetail);