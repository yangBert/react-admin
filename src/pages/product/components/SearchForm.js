import React, { useState, useEffect } from 'react';
import { Button, Icon, Select, Input, DatePicker } from 'antd';
import { connect } from 'react-redux';
import * as creators from '../store/creators';
import styles from '../css/SearchForm.module.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

//const { Option } = Select;
const { RangePicker } = DatePicker;

function SearchForm(props) {
  const [productName, setProductName] = useState("")
  const [publishAt, setPublishAt] = useState(null)
  const [publishBy, setPublishBy] = useState(null)
  const { changeSearchParams } = props;
  useEffect(() => {
    changeSearchParams({ productName })
  }, [productName, changeSearchParams]);

  function search() {
    const { productName } = props.params
    const start = publishAt && publishAt.format('YYYY-MM-DD')
    const end = publishBy && publishBy.format('YYYY-MM-DD')
    const data = {
      pageSize: 10,
      pageNo: 1,
      productName,
      start,
      end,
    }
    props.queryList({ props, data });
  }

  function reset() {
    setProductName("");
    setPublishAt(null);
    setPublishBy(null);
    const data = { pageNo: 1, pageSize: 10 }
    props.queryList({ props, data });
  }

  function onChangePicker(dates, dateStrings) {
    setPublishAt(moment(dateStrings[0]))
    setPublishBy(moment(dateStrings[1]))
  }

  return (
    <div>
      <div className={`${styles.form} clearfix`}>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">产品名称:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Input
              placeholder="产品名称"
              allowClear
              onChange={e => setProductName(e.target.value)}
              value={productName}
            />
          </div>
        </div>
        <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">日期:</label>
          <div className={`${styles.inline} pullLeft`}>
            <RangePicker
              value={[publishAt, publishBy]}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={onChangePicker}
            />
          </div>
        </div>
        {/* <div className={`${styles.formLine} pullLeft`}>
          <label className="pullLeft">状态:</label>
          <div className={`${styles.inline} pullLeft`}>
            <Select value={type} style={{ width: "100%" }} onChange={value => setType(value)}>
              <Option value="">请选择</Option>
              <Option value="1">请选择</Option>
              <Option value="2">请选择</Option>
              <Option value="3">请选择</Option>
            </Select>
          </div>
        </div> */}
        <div className="pullLeft">
          <Button onClick={() => search()} type="primary">
            <Icon type="search" />查询
          </Button>&nbsp;&nbsp;
          <Button onClick={() => reset()} type="primary" ghost>
            <Icon type="undo" />重置
          </Button>
        </div>
      </div>
    </div>
  )
}

const mapState = state => ({
  params: state.product.params,
})

const mapDispatch = dispatch => ({

  queryList: req => {
    const action = creators.queryListAction(req);
    dispatch(action);
  },
  changeSearchParams: params => {
    const action = creators.createChangeParamsAction(params);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(SearchForm);
