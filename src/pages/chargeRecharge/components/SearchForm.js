import React, { useState, useEffect } from "react";
import { Button, Input, Icon, DatePicker } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [accountName, setAccountName] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [state, setState] = useState("");
  const [createStartTimeString, setCreateStartTimeString] = useState(null);
  const [createEndTimeString, setCreateEndTimeString] = useState(null);

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      accountName,
      accountCode,
      state,
      createStartTimeString,
      createEndTimeString
    });
  }, [
    accountName,
    accountCode,
    state,
    createStartTimeString,
    createEndTimeString,
    changeSearchParams
  ]);

  function search() {
    const { accountName, accountCode, state } = props.params;

    let start2 = props.params.createStartTimeString;
    let end2 = props.params.createEndTimeString;

    start2 =
      createStartTimeString &&
      createStartTimeString.format("YYYY-MM-DD HH:mm:ss");
    end2 =
      createEndTimeString && createEndTimeString.format("YYYY-MM-DD HH:mm:ss");
    const data = {
      pageSize: 10,
      pageNo: 1
    };

    if (accountName) {
      data.accountName = accountName;
    }

    if (accountCode) {
      data.accountCode = accountCode;
    }

    if (state !== "") {
      data.status = state;
    }

    if (createStartTimeString) {
      data.createStartTimeString = start2;
    }
    if (createEndTimeString) {
      data.createEndTimeString = end2;
    }
    console.log("data", data);
    props.querylist({ props, data });
  }

  function reset() {
    setAccountName("");
    setAccountCode("");
    setState("");
    setTime2("", "");
    const data = { pageNo: 1, pageSize: 10 };
    props.querylist({ props, data });
  }

  function setTime2(t1, t2) {
    setCreateStartTimeString(t1);
    setCreateEndTimeString(t2);
  }

  function onChangePicker2(dates, dateStrings) {
    if (dateStrings[0]) {
      setTime2(moment(dateStrings[0]), moment(dateStrings[1]));
    } else {
      setTime2(null, null);
    }
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">账户编码:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setAccountCode(e.target.value)}
                value={accountCode}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">充值时间:</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                style={{ width: "100%" }}
                showTime
                value={[createStartTimeString, createEndTimeString]}
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month")
                  ]
                }}
                onChange={onChangePicker2}
              />
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">&nbsp;</label>
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
  params: state.billing.params,
  spinning: state.billing.spinning
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

export default connect(mapState, mapDispatch)(SearchForm);
