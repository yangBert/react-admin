import React from "react";
import { Modal, Input, Form, Select } from "antd";
import styles from "../css/add.module.css";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import * as config from "../config";
import $$ from "static/js/base";

const { Option } = Select;

function Add(props) {
  function collectData() {
    let { strategyName, strategyCode, strategyStatus } = props.record;
    strategyName = $$.trim(strategyName);
    strategyCode = $$.trim(strategyCode);
    if (strategyName === "") {
      Modal.error({
        title: "安全策略名称",
        content: "不能为空",
        okText: "确认"
      });
      return;
    } else if (!/^[0-9A-Za-z]{5,30}$/g.test(strategyCode)) {
      Modal.error({
        title: "安全策略编码",
        content: "请输入10~30位：字母大小写、数字",
        okText: "确认"
      });
      return;
    }
    let data = {
      strategyName,
      strategyCode
    };
    if (props.edit) {
      data.id = props.record.id;
      data.strategyStatus = strategyStatus;
    }
    const req = { props, data };
    props.save(req);
  }

  return (
    <div className={styles.tableForm}>
      <Modal
        title={props.record ? "修改" : "新增"}
        width={600}
        style={{ top: 20 }}
        visible={props.modalVisible}
        cancelText="取消"
        okText="确定"
        onOk={() => collectData()}
        confirmLoading={props.confirmLoading}
        onCancel={() => props.changeModalVisible(false, false, config.record)}
      >
        <Form>
          <div className={`${styles.formLine} clearfix`}>
            <label className="pullLeft">安全策略名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => props.changeStrategyName(e.target.value)}
                value={props.record.strategyName}
              />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}>
            <label className="pullLeft">安全策略编码：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                disabled={props.edit ? true : false}
                allowClear
                onChange={e => props.changeStrategyCode(e.target.value)}
                value={props.record.strategyCode}
              />
            </div>
          </div>
          {props.edit ? (
            <div className={`${styles.formLine} clearfix`}>
              <label className="pullLeft">安全策略状态：</label>
              <div className={`${styles.inline} pullLeft`}>
                <Select
                  value={props.record.strategyStatus}
                  style={{ width: "100%" }}
                  onChange={value => props.changeStrategyStatus(value)}
                >
                  <Option value="">请选择</Option>
                  {config.statusMap.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          ) : (
              ""
            )}
        </Form>
      </Modal>
    </div>
  );
}

const mapState = state => ({
  modalVisible: state.safeStrategy.modalVisible,
  record: state.safeStrategy.record,
  spinning: state.safeStrategy.spinning,
  confirmLoading: state.safeStrategy.confirmLoading,
  edit: state.safeStrategy.edit
});

const mapDispatch = dispatch => ({
  changeModalVisible: (modalVisible, edit, record) => {
    const action = creators.changeModalVisibleAction(
      modalVisible,
      edit,
      record
    );
    dispatch(action);
  },
  changeStrategyName: value => {
    const action = creators.changeStrategyNameAction(value);
    dispatch(action);
  },
  changeStrategyCode: value => {
    const action = creators.changeStrategyCodeAction(value);
    dispatch(action);
  },
  changeStrategyStatus: value => {
    const action = creators.changeStrategyStatusAction(value);
    dispatch(action);
  },
  save: req => {
    const action = creators.saveAction(req);
    dispatch(action);
  }
});

export default connect(mapState, mapDispatch)(Add);
