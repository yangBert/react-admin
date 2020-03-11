import React, { useState, useEffect } from "react";
import { Button, Input, Icon, DatePicker, Select } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import * as config from "../config";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchForm(props) {
  const [accountName, setAccountName] = useState("");
  const [accountCode, setAccountCode] = useState("");
  const [state, setState] = useState("");
  const [createStartTimeString, setCreateStartTimeString] = useState("");
  const [createEndTimeString, setCreateEndTimeString] = useState("");

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
    const {
      accountName,
      accountCode,
      state,
      createStartTimeString,
      createEndTimeString
    } = props.params;

    const data = {
      pageSize: 10,
      pageNo: 1,
      accountName,
      accountCode,
      state,
      createStartTimeString,
      createEndTimeString
    };

    console.log("data", data);
    props.querylist({ props, data });
  }

  function reset() {
    setAccountName("");
    setAccountCode("");
    setState("");
    const data = { pageNo: 1, pageSize: 10 };
    props.querylist({ props, data });
  }

  function onChangeDatePicker(dates, dateStrings) {
    setCreateStartTimeString(dateStrings[0]);
    setCreateEndTimeString(dateStrings[1]);
  }

  function mapArr() {
    let arr = [];
    Object.keys(config.status).forEach(k => {
      arr.push({ k, v: config.status[k] });
    });
    return arr;
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">账户名：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setAccountName(e.target.value)}
                value={accountName}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">账户编码：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setAccountCode(e.target.value)}
                value={accountCode}
              />
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">账户状态：</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select
                value={state}
                style={{ width: "100%" }}
                onChange={value => setState(value)}
              >
                <Option value="">请选择</Option>
                {mapArr().map(item => (
                  <Option value={item.k} key={item.k}>
                    {item.v}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">日期：</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month")
                  ]
                }}
                format="YYYY-MM-DD"
                onChange={onChangeDatePicker}
              />
            </div>
          </div>
        </div>
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
