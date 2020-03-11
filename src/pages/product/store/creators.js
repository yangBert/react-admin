import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import createPagination from "static/js/pagination";
import { Modal } from "antd";

const initDictDataListAction = (list, pagination) => ({
  type: types.QUERY_DICT_DATA_LIST,
  list,
  pagination
});

const initAllProductType = allProductType => ({
  type: types.INIT_ALL_PRODUCT_TYPE,
  allProductType
});

const setProductNameAction = productName => ({
  type: types.SET_PRODUCT_NAME,
  productName
});

const setEditContentAction = editContent => ({
  type: types.SET_EDIT_CONTENT,
  editContent
});

const setProductPriceAction = productPrice => ({
  type: types.SET_PRODUCT_PRICE,
  productPrice
});

const setProductPayingAction = productPaying => ({
  type: types.SET_PRODUCT_PAYING,
  productPaying
});

const setProductTypeCodeAction = productTypeCode => ({
  type: types.SET_PRODUCT_TYPE_CODE,
  productTypeCode
});

const setProductRemarkAction = productRemark => ({
  type: types.SET_PRODUCT_REMARK,
  productRemark
});

const setTagAction = tag => ({
  type: types.SET_PRODUCT_TAG,
  tag
});

//查询所有的产品类型
const getProductTypeAction = req => {
  return dispatch => {
    request.json(requestURL.productTypeSelectAll, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          dispatch(initAllProductType(data));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//查询产品
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.productSelectByPage, req.data, res => {
      dispatch(spinningAction(false));
      console.log("res", res);
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initDictDataListAction(
            data.results,
            createPagination(data)
          );
          dispatch(action);
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const saveAction = req => {
  return () => {
    const url = req.data.productCode
      ? requestURL.productUpdateProduct
      : requestURL.productAddProduct;
    console.log("req", req);
    request.json(url, req.data, res => {
      if (res.data) {
        console.log("res", res);
        const { success, message } = res.data && res.data;
        if (success) {
          Modal.success({
            title: "系统提示",
            content: message,
            okText: "确认",
            onOk: () => {
              req.props.history.goBack();
            }
          });
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const setStatusAction = req => {
  return (dispatch, getState) => {
    const url = requestURL.productUpdateProduct;
    request.json(url, req.data, res => {
      if (res.data) {
        const { success, message } = res.data;
        if (success) {
          notification("success", message);
          const pagination = getState().product.pagination;
          const params = {
            ...getState().product.params,
            pageNo: pagination.current,
            pageSize: pagination.pageSize
          };
          dispatch(queryListAction({ props: req.props, data: params }));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const deleteRowAction = req => {
  return (dispatch, getState) => {
    const url = requestURL.productDelProduct;

    request.json(url, req.data, res => {
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          notification("success", message);
          const params = {
            ...getState().product.params,
            pageNo: 1,
            pageSize: 10
          };
          dispatch(queryListAction({ props: req.props, data: params }));
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.CHANGE_SEARCH_PARAMS,
  params
});

export {
  queryListAction,
  saveAction,
  createChangeParamsAction,
  deleteRowAction,
  getProductTypeAction,
  setProductNameAction,
  setEditContentAction,
  setProductPriceAction,
  setProductPayingAction,
  setProductTypeCodeAction,
  setStatusAction,
  setProductRemarkAction,
  setTagAction
};
