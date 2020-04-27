import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import { Column, Line } from "@antv/g2plot";
import * as config from '../config';

function stringToNumber(list) {
  for (let i = 0; i < list.length; i++) {
    list[i].num = Number(list[i].num)
  }
  return list
}

function initPlotData(arr, types, operateType) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < types.length; j++) {
      if (arr[i][operateType] === types[j].value) {
        arr[i].name = types[j].name
      }
    }
  }
  return arr;
}

function initPlotRender(data, plot) {
  var list = stringToNumber(data.list);
  list = initPlotData(list, config.types, "login")
  const linePlot = new Line(plot, {
    title: {
      visible: true,
      text: data.title,
    },
    description: {
      visible: false,
      text: '',
    },
    theme: 'dark',
    padding: 'auto',
    forceFit: true,
    data: list,
    xField: 'timeX',
    yField: 'num',
    seriesField: 'name',
    xAxis: {
      type: 'dateTime',
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      formatter: (v) => `${v} ${data.numUnit}`,
    },
    legend: {
      visible: true,
      position: 'right-top',
    },
    smooth: true,
  });
  linePlot.render();
  // linePlot.on('click', ev => {
  // });
}

const queryPlot1Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.statisticsStatisPhoneLogin, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          initPlotRender(data, document.getElementById("plot1"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};



const queryPlot2Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.statisticsStatisMSLogin, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          initPlotRender(data, document.getElementById("plot2"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const queryPlot3Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.statisticsStatisFaceLogin, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          initPlotRender(data, document.getElementById("plot3"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const queryPlot4Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.statisticsStatisUkeyLogin, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          initPlotRender(data, document.getElementById("plot4"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const queryPlot5Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.get(requestURL.statisticsStatisWechatLogin, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          initPlotRender(data, document.getElementById("plot5"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

function initCollum(data, text, plot) {
  const columnPlot = new Column(plot, {
    title: {
      visible: true,
      text,
    },
    theme: 'dark',
    forceFit: true,
    data,
    padding: 'auto',
    xField: 'name',
    yField: 'num',
    meta: {
      num: {
        alias: '登录数量（次）',
      },
      name: {
        alias: '类型',
      }
    },
  });

  columnPlot.render();
}


const queryPlot6Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.logManageSelectLoginTypeCount, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          const arr = initPlotData(data, config.operateType, "operateType")
          initCollum(arr, "应用登录统计", document.getElementById("plot6"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

const queryPlot7Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.logManageSelectUserLoginTypeCount, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          const arr = initPlotData(data, config.operateType2, "operateType")
          initCollum(arr, "用户登录统计", document.getElementById("plot7"))
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};
export {
  queryPlot1Action,
  queryPlot2Action,
  queryPlot3Action,
  queryPlot4Action,
  queryPlot5Action,
  queryPlot6Action,
  queryPlot7Action
}