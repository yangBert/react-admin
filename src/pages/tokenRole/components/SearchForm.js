import React, { useState, useEffect } from "react";
import { Button, Input, Icon } from "antd";
import { connect } from "react-redux";
import * as creators from "../store/creators";
import styles from "../css/SearchForm.module.css";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

function SearchForm(props) {
  const [name, setName] = useState("");

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      name
    });
  }, [name, changeSearchParams]);

  function search() {
    const { name } = props.params;

    const data = {
      pageSize: 10,
      pageNo: 1
    };
    if (name) {
      data.name = name;
    }
    console.log("data", data);
    props.querylist({ props, data });
  }

  function reset() {
    setName("");
    const data = { pageNo: 1, pageSize: 10 };
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">角色名称:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
          </div>
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
          &nbsp;&nbsp;
          <Button type="primary" className={styles.addButton}>
            <Link to="/tokenRole/add">
              <Icon type="plus" />
              新增
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapState = state => ({
  params: state.tokenRole.params,
  spinning: state.tokenRole.spinning
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
