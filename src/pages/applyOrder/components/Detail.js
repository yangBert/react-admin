import React from 'react';
import { Card,Descriptions,Button } from 'antd';
import styles from '../css/detail.module.css';
import $$ from 'static/js/base';
import * as creators from '../store/creators';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';

class Detail extends React.Component {

  componentDidMount() {
    this.props.getDetail({props:this.props,data:{instanceCode:this.props.location.state.record.instanceCode}})
  }
  render() {
    return (
      <div>
        <div className={styles.pageContet}>
          {
            this.props.detail ?
            <div className="pageContentColor">
            <Card title="受理单详情" bordered={false}>
              <Descriptions>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="支付时间">{this.props.detail.payTime ? $$.getHours(this.props.detail.payTime) : "--"}</Descriptions.Item>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
                <Descriptions.Item label="受理单号">{this.props.detail.instanceCode}</Descriptions.Item>
                <Descriptions.Item label="申请单名称">{this.props.detail.name}</Descriptions.Item>
              </Descriptions>
            </Card>
          </div>:""
          }
          <div className={styles.bottom}>
              <Button 
              type="primary" 
              className={styles.back} 
              onClick={() => this.props.history.goBack()}
              size="large">返回</Button>
          </div>
        </div>
      </div>
    )
  }

}

const mapState = state => ({
  spinning: state.applyOrder.spinning,
  detail: state.applyOrder.detail,
})

const mapDispatch = dispatch => ({
  getDetail: req => {
    const action = creators.getDetailAction(req);
    dispatch(action);
  },
})

export default withRouter(connect(mapState, mapDispatch)(Detail));