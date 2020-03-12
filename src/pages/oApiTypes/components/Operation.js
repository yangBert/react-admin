import React from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import { withRouter } from "react-router-dom";

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "5px" };
  return (
    <div>
      <Button
        style={fontSmall}
        type="primary"
        size="small"
        ghost
        onClick={() => props.changeModalVisible(true, true, props.record)}
      >
        修改
      </Button>
    </div>
  );
}

const mapDispatch = dispatch => ({
  changeModalVisible: (modalVisible, edit, record) => {
    const action = creators.changeModalVisibleAction(
      modalVisible,
      edit,
      record
    );
    dispatch(action);
  }
});

export default withRouter(connect(null, mapDispatch)(Oper));
