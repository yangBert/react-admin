import React, { useState, useEffect } from "react";
import { Button, Input, Icon, DatePicker, Select } from "antd";
import styles from "../css/SearchForm.module.css";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

const { RangePicker } = DatePicker;
const { Option } = Select;

function SearchForm(props) {

  return (
    <div>
      <div className={`${styles.form}`}>
        <div className="clearfix">
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
              />
            </div>
          </div>
          <label className="pullLeft">&nbsp;</label>
          <Button type="primary">
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
  );
}


export default SearchForm;
