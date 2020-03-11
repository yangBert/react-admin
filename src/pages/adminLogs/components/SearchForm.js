import React from "react";
import { Button, Icon, DatePicker } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;

function SearchForm(props) {
  function onChangeDatePicker(dates, dateStrings) {
    let params = props.params;
    params.logTimeStart = dateStrings[0];
    params.logTimeEnd = dateStrings[1];
    props.changeSearchParams(params);
  }

  function search() {
    const data = {
      pageSize: 10,
      pageNo: 1,
      ...props.params
    };

    console.log("data", data);
    props.querylist({ props, data });
  }

  function reset() {
    props.changeSearchParams({});
    const data = { pageNo: 1, pageSize: 10 };
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">日期:</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month")
                  ]
                }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={onChangeDatePicker}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            &nbsp;&nbsp;
            <Button onClick={() => search()} type="primary">
              <Icon type="search" />
              查询
            </Button>
            &nbsp;&nbsp;
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="undo" />
              重置
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  params: state.adminLogs.params,
  spinning: state.adminLogs.spinning
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(SearchForm));
