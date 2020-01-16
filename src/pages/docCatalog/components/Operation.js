import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Oper(props) {
  const fontSmall = { fontSize: "12px", marginLeft: "10px" };
  return (
    <div>
      <Link
        to={{
          pathname: "/docCatalog/add",
          state: { editRecord: props.record, productList: props.productList }
        }}
      >
        <Button
          style={fontSmall}
          type="primary"
          size="small"
          ghost
        >修改</Button>
      </Link>
    </div >
  )
}

const mapState = state => ({
  productList: state.docCatalog.productList,
})

export default connect(mapState, null)(Oper);
