import React, { useState } from "react";
import { Button, Input, Icon, DatePicker } from "antd";
import styles from "../css/SearchForm.module.css";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [accountName, setAccountName] = useState('')
  const [endTime, setEndTime] = useState('')
  const [startTime, setStartTime] = useState('')

  function search() {
    props.querylist({
      props, data: {
        ...props.params,
        accountName,
        endTime,
        startTime
      }
    })
  }

  function onChangeDatePicker(dateStrings) {
    setStartTime(dateStrings[0])
    setEndTime(dateStrings[1])
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
                value={accountName}
                onChange={e => setAccountName(e.target.value)}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">日期：</label>
            <div className={`${styles.inline} pullLeft`}>
              <RangePicker
                style={{ width: "100%" }}
                value={[
                  startTime ? moment(startTime) : null,
                  endTime ? moment(endTime) : null
                ]}
                ranges={{
                  Today: [moment(), moment()],
                  "This Month": [
                    moment().startOf("month"),
                    moment().endOf("month")
                  ]
                }}
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                onChange={(dates, dateStrings) => onChangeDatePicker(dateStrings)}
              />
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">&nbsp;</label>
            <Button type="primary" onClick={() => search()}>
              <Icon type="search" />
            查询
          </Button>
          &nbsp;&nbsp;
          <Button type="primary" ghost>
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
  typesList: state.accountStatistical.typesList,
  tableList: state.accountStatistical.tableList,
  pagination: state.accountStatistical.pagination,
  params: state.accountStatistical.params
});

const mapDispatch = dispatch => ({
  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  createChangeParams: req => {
    const action = creators.createChangeParamsAction(req);
    dispatch(action);
  },
});

export default connect(mapState, mapDispatch)(SearchForm);
