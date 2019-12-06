import React, { useState, useEffect } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import { GZCA } from 'static/plugins/gzca/js/gzca';
import styles from 'pages/user/css/add.module.css';
import { connect } from 'react-redux';
import * as creators from '../store/creators';


const { TextArea } = Input;

function AddModal(props) {
  const [addModalvisible, setAddModalvisible] = useState(false)
  const [adminName, setAdminName] = useState("")
  const [department, setDepartment] = useState("")
  const [adminId, setAdminId] = useState("")
  const [signcert, setSigncert] = useState("")


  const $operationType = props.operationType
  const $addModalvisible = props.addModalvisible
  const $adminName = $operationType === "edit" ? props.record.adminName : ""
  const $department = $operationType === "edit" ? props.record.department : ""
  const $adminId = $operationType === "edit" ? props.record.adminId : ""
  const $signcert = $operationType === "edit" ? props.record.signcert : ""

  useEffect(() => {
    setAddModalvisible($addModalvisible)
    setAdminName($adminName);
    setDepartment($department);
    setAdminId($adminId);
    setSigncert($signcert);
  }, [$addModalvisible, $operationType, $adminName, $department, $adminId, $signcert]);

  //新增管理员提交数据
  function collectData() {
    props.changeAddModalvisible(false, "", {})
    props.addUser({
      adminName,
      department,
      adminId,
      signcert
    })
  }

  //初始化连接
  function initSocket() {
    GZCA.init((res) => {
      if (res) {
        getUkeyList();
      }
    });
  }

  //获取UKEY列表
  function getUkeyList() {
    const CertType = 1;
    GZCA.GZCA_GetCertList(true, CertType, function (res) {
      if (res.success) {
        getCert(res.ContainerName, CertType)
      }
    });
  }

  //获取签名证书base64
  function getCert(ContainerName, CertType) {
    GZCA.GZCA_ExportCert(ContainerName, CertType, function (res) {
      if (res.success) {
        setSigncert(res.CertB64)
        getSn(res.CertB64);
      }
    });
  }

  //获取签名证书序列号
  function getSn(CertB64) {
    GZCA.GZCA_GetCertInfo(CertB64, function (res) {
      if (res.success) {
        setAdminId(res.CertSerial)
      }
    });
  }

  return (
    <div className={styles.tableForm}>
      <Modal
        title="新增管理员"
        width={600}
        style={{ top: 20 }}
        visible={addModalvisible}
        cancelText="取消"
        okText="确定"
        onOk={() => collectData()}
        onCancel={() => props.changeAddModalvisible(false, "", {})}
      >
        <Form>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">管理员名称：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input onChange={e => setAdminName(e.target.value)} value={adminName} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">部门：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input onChange={e => setDepartment(e.target.value)} value={department} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">签名证书序列号：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input value={adminId} />
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">签名证书：</label>
            <div className={`${styles.inline} pullLeft`}>
              <TextArea value={signcert} rows={2}></TextArea>
            </div>
          </div>
          <div className={`${styles.formLine} clearfix`}><label className="pullLeft">&nbsp;</label>
            <div className={`${styles.inline} pullLeft`}>
              <Button type="primary" onClick={initSocket}>读取证书</Button>
            </div>
          </div>
        </Form>

      </Modal>
    </div>
  )
}

const mapState = state => ({
  addModalvisible: state.user.addModalvisible,
  operationType: state.user.operationType,
  record: state.user.record
})

const mapDispatch = dispatch => ({
  changeAddModalvisible: (addModalvisible, operationType, record) => {
    const action = creators.createChangeAddModalvisibleAction(addModalvisible, operationType, record);
    dispatch(action);
  },
  addUser: requestData => {
    const action = creators.createAddUserAction(requestData);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(AddModal);
