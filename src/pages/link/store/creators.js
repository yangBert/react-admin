import * as types from "./actionTypes";
import * as requestURL from "static/js/requestURL";
import * as request from "static/js/request";
import spinningAction from "pages/common/layer/spinning";
import notification from "pages/common/layer/notification";
import createPagination from "static/js/pagination";
import { Modal } from "antd";

const initListAction = (list, pagination) => ({
  type: types.LINK_QUERY_LIST,
  list,
  pagination
});

//改变editTitle
const onChangeEditTitleAction = editTitle => ({
  type: types.LINK_CHANGE_EDIT_TITLE,
  editTitle
});

//改变editURL
const onChangeEditURLAction = editURL => ({
  type: types.LINK_CHANGE_EDIT_URL,
  editURL
});

//改变editImageURL
const onChangeEditImageURLAction = editImageURL => ({
  type: types.LINK_CHANGE_EDIT_IMAGE_URL,
  editImageURL
});

const onChangeEditStatusAction = editStatus => ({
  type: types.LINK_CHANGE_EDIT_STATUS,
  editStatus
});

//改变保存loading
const onChangeSaveLoadingAction = saveLoading => ({
  type: types.LINK_CHANGE_SAVE_LOADING,
  saveLoading
});

const changeShowImageAction = showImage => ({
  type: types.LINK_CHANGE_SHOW_IMAGE,
  showImage
});

//保存和修改
const saveAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    let url;
    if (req.props.location.state) {
      url = requestURL.webManagerLinkUpdate;
    } else {
      url = requestURL.webManagerLinkAdd;
    }

    request.formData(url, req.data, res => {
      dispatch(spinningAction(false));
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

//查询
const queryListAction = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.linkQueryLinksByPage, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data && res.data;
        if (success) {
          const action = initListAction(data.results, createPagination(data));
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

//修改状态
const updateStateAction = req => {
  return (dispatch, getState) => {
    dispatch(spinningAction(true));
    const url = requestURL.webManagerLinkChangeStatus;
    request.json(url, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message } = res.data && res.data;
        if (success) {
          const pagination = getState().link.pagination;
          const params = {
            ...getState().link.params,
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

//查询携带参数
const createChangeParamsAction = params => ({
  type: types.LINK_CHANGE_SEARCH_PARAMS,
  params
});

export {
  queryListAction,
  onChangeEditTitleAction,
  onChangeEditURLAction,
  onChangeEditImageURLAction,
  onChangeEditStatusAction,
  saveAction,
  onChangeSaveLoadingAction,
  createChangeParamsAction,
  updateStateAction,
  changeShowImageAction
};
