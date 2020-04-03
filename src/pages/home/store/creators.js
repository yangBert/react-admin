import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import * as config from '../config';
import { StepLine, Column } from "@antv/g2plot";

function initPlot1Render(data) {
  const columnPlot = new Column(document.getElementById('plot1'), {
    title: {
      visible: true,
      text: '应用登录统计',
    },
    description: {
      visible: true,
      text: '各种类型登录次数',
    },
    forceFit: true,
    theme: "dark",
    data,
    padding: 'auto',
    xField: 'name',
    yField: 'num',
    meta: {
      name: {
        alias: '\n',
        visible: false,
      },
      num: {
        alias: '登录次数',
      },
    },
    label: {
      visible: false,
      style: {
        fill: '#0D0E68',
        fontSize: 12,
        fontWeight: 600,
        opacity: 0.6,
      },
    },
  });

  columnPlot.render();
}

function initPlotData(arr, types) {
  let a = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < types.length; j++) {
      if (arr[i].operateType === types[j].value) {
        a.push({ name: types[j].name, num: arr[i].num })
      }
    }
  }
  return a;
}

const queryPlot1Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.logManageSelectLoginTypeCount, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          const plotData = initPlotData(data, config.operateType);
          initPlot1Render(plotData)
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};

function initPlot2Render(data) {
  const step = new StepLine(document.getElementById("plot2"), {
    title: {
      visible: true,
      text: "用户登录统计"
    },
    description: {
      visible: true,
      text: "用户登录次数"
    },
    forceFit: true,
    padding: "auto",
    data,
    theme: "dark",
    xField: "name",
    yField: "num",
    step: "hvh", // 可以选择 hv, vh, hvh, vhv
    point: {
      visible: true
    },
    label: {
      visible: true,
      type: "point"
    }
  });

  step.render();
}

const queryPlot2Action = req => {
  return dispatch => {
    dispatch(spinningAction(true));
    request.json(requestURL.logManageSelectUserLoginTypeCount, req.data, res => {
      dispatch(spinningAction(false));
      if (res.data) {
        const { success, message, data } = res.data;
        if (success) {
          const plotData = initPlotData(data, config.operateType2);
          initPlot2Render(plotData)
        } else {
          notification("error", message);
        }
      } else {
        req.props.history.push("/500");
      }
    });
  };
};


export { queryPlot1Action, queryPlot2Action }