import React, { useState, useEffect } from 'react';
import { Button, Input, Icon } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


function SearchForm(props) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({
      title,
      url,
    })
  }, [
    title,
    url,
    changeSearchParams
  ]);


  function search() {
    const {
      title,
      url,
    } = props.params

    const data = {
      pageSize: 10,
      pageNo: 1,
    }


    if (title) {
      data.title = title
    }

    if (url !== "") {
      data.url = url
    }

    console.log("data", data)
    props.querylist({ props, data });
  }

  function reset() {
    setTitle("");
    setUrl("");
    const data = { pageNo: 1, pageSize: 10 }
    props.querylist({ props, data });
  }

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">接口标题:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">接口:</label>
            <div className={`${styles.inline} pullLeft`}>
              <Input
                allowClear
                onChange={e => setUrl(e.target.value)}
                value={url}
              />
            </div>
          </div>
        </div>
        <div className="clearfix">
          <div className={`${styles.formLine} pullLeft`}>
            <label className="pullLeft">&nbsp;</label>
            <Button onClick={() => search()} type="primary">
              <Icon type="search" />查询
            </Button>&nbsp;&nbsp;
            <Button onClick={() => reset()} type="primary" ghost>
              <Icon type="undo" />重置
            </Button>&nbsp;&nbsp;
            <Button type="primary" className={styles.addButton}>
              <Link to="/tokenPower/add">
                <Icon type="plus" />新增
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div >
  )
}

const mapState = state => ({
  params: state.billing.params,
  spinning: state.billing.spinning,
})

const mapDispatch = dispatch => ({

  querylist: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  }
})

export default connect(mapState, mapDispatch)(SearchForm);
