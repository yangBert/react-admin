import { notification } from 'antd';

export default (type, description) => {
  notification[type]({
    message: "系统提示",
    description: description
  });
};
