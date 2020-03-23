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

const initVerifyApiListAction = verifyApiList => ({
  type: types.INIT_VERIFY_API_LIST,
  verifyApiList
});

const setAPINameAction = APIName => ({
  type: types.SET_API_NAME,
  APIName
});

const setOrderWordAction = orderWord => ({
  type: types.SET_ORDER_WORD,
  orderWord
});

const changeSaveLoadingAction = saveLoading => ({
  type: types.CHANGE_SAVE_LOADING,
  saveLoading
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
  return (dispatch) => {
    const url = req.data.productCode
      ? requestURL.productUpdateProduct
      : requestURL.productAddProduct;
    dispatch(changeSaveLoadingAction(true));
    request.json(url, req.data, res => {
      dispatch(changeSaveLoadingAction(false));
      if (res.data) {
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

const verifyApiListAction = req => {
  return (dispatch) => {
    const url = requestURL.verifyApiAuthCondition;
    request.json(url, req.data, res => {
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          dispatch(initVerifyApiListAction(data));
          if (req.props.location.state.record) {
            console.log("apiName", req.props.location.state)
            dispatch(setAPINameAction(req.props.location.state.record.apiName));
          }
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
  setProductPriceAction,
  setProductPayingAction,
  setProductTypeCodeAction,
  setStatusAction,
  setProductRemarkAction,
  setTagAction,
  verifyApiListAction,
  setAPINameAction,
  setOrderWordAction,
  changeSaveLoadingAction
};
