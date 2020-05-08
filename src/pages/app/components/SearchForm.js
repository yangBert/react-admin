import React, { useState, useEffect } from "react";
import { Button, Input, Icon, Select } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import { Link, withRouter } from "react-router-dom";
const { Option } = Select;

function SearchForm(props) {
  const [appName, setAppName] = useState("");
  const [appCode, setAppCode] = useState("");
  const [appStatus, setAppStatus] = useState("");
  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      appName,
      appStatus,
      appCode
    });
  }, [appName, appCode, appStatus, changeSearchParams]);

  function search() {
    const { appName, appCode, appStatus } = props.params;
    const data = {
      pageSize: 10,
      pageNo: 1,
      appName,
      appCode,
      appStatus
    };
    props.queryAppList({ props, data });
  }

  function reset() {
    setAppName("");
    setAppStatus("");
    setAppCode("");
    const data = { pageNo: 1, pageSize: 10 };
    props.queryAppList({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">应用名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setAppName(e.target.value)}
              value={appName}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">应用编码:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              allowClear
              onChange={e => setAppCode(e.target.value)}
              value={appCode}
            />
          </div>
        </div>

      </div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">应用状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select
              value={appStatus}
              style={{ width: "100%" }}
              onChange={value => setAppStatus(value)}
            >
              <Option value="">请选择</Option>
              <Option value={1}>已上线</Option>
              <Option value={2}>未上线</Option>
            </Select>
          </div>
        </div>
      </div>
      <div className={`${styles.form} clearfix`}>
        <div className="pullLeft">
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
          &nbsp;&nbsp;
          {props.history.location.pathname === "/app/appList" ? (
            <Link
              to={{
                pathname: "/app/appList/add",
                state: {
                  allLandingModes: props.allLandingModes,
                  allSupportCAs: props.allSupportCAs,
                  allAppTypes: props.allAppTypes,
                  allAuthLevel: props.allAuthLevel
                }
              }}
            >
              <Button type="primary" className={styles.addButton}>
                <Icon type="plus" />
                新增
              </Button>
            </Link>
          ) : (
              ""
            )}
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  params: state.app.params,
  allAuthLevel: state.app.form.allAuthLevel,
  allLandingModes: state.app.form.allLandingModes,
  allSupportCAs: state.app.form.allSupportCAs,
  allAppTypes: state.app.form.allAppTypes
});

const mapDispatch = dispatch => ({
  queryAppList: req => {
    const action = creators.createQueryAppListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
});

export default withRouter(connect(mapState, mapDispatch)(SearchForm));
