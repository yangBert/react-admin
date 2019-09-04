import React, { useState } from 'react';
import { Button, Modal, Input, Form } from 'antd';
import styles from 'pages/user/css/add.module.css';

function Add() {
  const [visible, setVisible] = useState(false)
  return (
    <div className={styles.tableForm}>
      <Button type="primary" onClick={() => setVisible(true)}>新增</Button>
      <Modal
        title="新增用户"
        style={{ top: 20 }}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Form>
          <p className={styles.formLine}><label>姓名：</label><Input className={styles.lineOne} /></p>
          <p className={styles.formLine}><label>姓名：</label><Input className={styles.lineOne} /></p>
          <p className={styles.formLine}><label>姓名：</label><Input className={styles.lineOne} /></p>
          <p className={styles.formLine}><label>姓名：</label><Input className={styles.lineOne} /></p>
        </Form>

      </Modal>
    </div>
  )
}
export default Add;
