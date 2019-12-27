import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Icon } from 'antd';
import styles from '../css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

const { TextArea } = Input;

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [userNo] = useState("070005201808011100000000334452")
  const [porgCode, setPorgCode] = useState("A")
  const [pid, setPid] = useState(0)
  const [orgName, setOrgName] = useState("")
  const [orgCode, setOrgCode] = useState("")
  const [orgDesc, setOrgDesc] = useState("")


  //const [refAdminName, setRefAdminName] = useState(null)
  const [refOrgName, setRefOrgName] = useState(null)
  const [refOrgCode, setRefOrgCode] = useState(null)
  const [refOrgDesc, setRefOrgDesc] = useState(null)


  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible
  const $orgName = $operationType === "edit" ? props.record.orgName : ""
  const $orgDesc = $operationType === "edit" ? props.record.orgDesc : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setOrgName($orgName);
    setOrgDesc($orgDesc);
  }, [$addModalvisible, $orgName, $orgDesc]);


  //新增管理员提交数据
  function collectData() {
    if (orgName === "") {
      refOrgName.focus()
      return;
    } else if (orgCode === "") {
      refOrgCode.focus()
      return;
    } else if (orgDesc === "") {
      refOrgDesc.focus()
      return;
    }
    const data = {
      orgName,
      orgDesc,
      porgCode,
      orgCode,
      pid,
      userNo
    }
    const type = $operationType === "edit"
    props.add({ props, data, type })
  }

  return (
    <div className={styles.tableForm}>

      <Modal
        title={<span><Icon type="plus" />新增</span>}
        width={600}
        style={{ top: 20 }}
        confirmLoading={props.ConfirmLoading}
        visible={addModalvisible}
        cancelText="取消"
        okText="确定"
        onOk={() => collectData()}
        onCancel={() => props.changeAddModalvisible(false, "", {})}
      >
        <Form>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">上级机构：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
              // ref={input => setRefAdminName(input)}
              // onChange={e => setAdminName(e.target.value)}
              // value={adminName}
              />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">机构名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                ref={input => setRefOrgName(input)}
                onChange={e => setOrgName(e.target.value)}
                value={orgName} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">机构编码：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setOrgCode(e.target.value)}
                value={orgCode} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">机构描述：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TextArea
                ref={input => setRefOrgDesc(input)}
                value={orgDesc}
                onChange={e => setOrgDesc(e.target.value)}
                rows={2}></TextArea>
            </div>
          </div>

        </Form>
      </Modal>
    </div >
  )
}

const mapState = state => ({
  addModalvisible: state.admin.addModalvisible,
  operationType: state.admin.operationType,
  record: state.admin.record,
  ConfirmLoading: state.admin.ConfirmLoading
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.changeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  add: req => {
    const action = creators.createAddOrgAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(AddModal);
