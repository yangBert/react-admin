import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import $$ from 'static/js/base';
import { connect } from 'react-redux';
import * as creators from '../store/creators';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "10px" };
  function publish(id) {
    const data = {
      props, data: {
        publisherName: $$.localStorage.get("adminName"),
        id,
        publisher: $$.localStorage.get("adminId")
      }
    }
    props.publishNotice(data)
  }
  return (
    <div>
      <Link
        to={{
          pathname: '/doc/add',
          state: {
            record: props.record,
            productAllList: props.productAllList
          },
        }}>
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>
      {props.record.state === 1 &&
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
          onClick={() => publish(props.record.id)}
        >发布</Button>
      }
    </div >
  )
}

const mapState = state => ({
  productAllList: state.doc.productAllList,
})

const mapDispatch = dispatch => ({
  publishNotice: req => {
    const action = creators.publishNoticeAction(req);
    dispatch(action);
  },
})

export default connect(mapState, mapDispatch)(Oper);

