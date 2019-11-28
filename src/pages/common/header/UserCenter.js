import React from 'react';
import styles from 'pages/common/header/userCenter.module.css';

class UserCenter extends React.Component {

  render() {
    return (
      <div className={styles.container}>
        
        <img className={styles.userImage} src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" alt="avatar" />
        <span>admin</span>
      </div>
    )
  }
}
export default UserCenter;