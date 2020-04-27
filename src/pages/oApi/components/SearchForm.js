import React, { useState, useEffect } from "react";
import { Button, Input, Icon, Select } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import moment from "moment";
import "moment/locale/zh-cn";
import * as config from "../config";
moment.locale("zh-cn");

const { Option } = Select;

function SearchForm(props) {
  const [apiName, setApiName] = useState("");
  const [state, setState] = useState("");
  const [apiReqType, setApiReqType] = useState("");
  const [typeId, setTypeId] = useState("");

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      apiName,
      state,
      typeId,
      apiReqType
    });
  }, [apiName, state, typeId, apiReqType, changeSearchParams]);

  function search() {
    const { apiName, state, typeId, apiReqType } = props.params;

    const data = {
      pageSize: 10,
      pageNo: 1,
      apiName,
      state,
      typeId,
      apiReqType
    };

    props.querylist({ props, data });
  }

  function reset() {
    setApiName("");
    setState("");
    setTypeId("");
    setApiReqType("");
    const data = { pageNo: 1, pageSize: 10 };
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">接口名称:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setApiName(e.target.value)}
                value={apiName}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">接口类型:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select
                value={typeId}
                style={{ width: "100%" }}
                onChange={value => setTypeId(value)}
              >
                <Option value="">请选择</Option>
                {props.typeList.map(item => (
                  <Option value={item.typeId} key={item.typeName}>
                    {item.typeName}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">接口状态:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select
                value={state}
                style={{ width: "100%" }}
                onChange={value => setState(value)}
              >
                <Option value="">请选择</Option>
                {config.stateMap.map(item => (
                  <Option value={item.value} key={item.value}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">请求方法:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Select
                value={apiReqType}
                style={{ width: "100%" }}
                onChange={value => setApiReqType(value)}
              >
                <Option value="">请选择</Option>
                {config.apiReqType.map(item => (
                  <Option value={item} key={item}>
                    {item}
                  </Option>
                ))}
              </Select>
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
  params: state.oApi.params,
  typeList: state.oApi.typeList
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
