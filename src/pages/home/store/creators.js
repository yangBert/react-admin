import * as requestURL from 'static/js/requestURL';
import * as request from 'static/js/request';
import spinningAction from 'pages/common/layer/spinning';
import notification from 'pages/common/layer/notification';
import * as config from '../config';
import { StepLine, Line } from "@antv/g2plot";

// function initPlot1Render(data) {
//   const columnPlot = new Column(document.getElementById('plot1'), {
//     title: {
//       visible: true,
//       text: '应用登录统计',
//     },
//     description: {
//       visible: true,
//       text: '各种类型登录次数',
//     },
//     forceFit: true,
//     theme: "dark",
//     data,
//     padding: 'auto',
//     xField: 'name',
//     yField: 'num',
//     meta: {
//       name: {
//         alias: '\n',
//         visible: false,
//       },
//       num: {
//         alias: '登录次数',
//       },
//     },
//     label: {
//       visible: false,
//       style: {
//         fill: '#0D0E68',
//         fontSize: 12,
//         fontWeight: 600,
//         opacity: 0.6,
//       },
//     },
//   });

//   columnPlot.render();
// }

function createMonth() {
  var dataArr = [];
  var data = new Date();
  data.setMonth(data.getMonth() + 1, 1)//获取到当前月份,设置月份
  for (var i = 0; i < 12; i++) {
    data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
    var m = data.getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    dataArr.push(data.getFullYear() + "-" + (m))
  }
  return dataArr
}

function initPlot1Render(data) {
  console.log("data", data)
  const datas = [{ "name": "China", "year": "2000", "gdp": 1211346869605.24 }, { "name": "China", "year": "2001", "gdp": 1339395718865.3 }, { "name": "China", "year": "2002", "gdp": 1470550015081.55 }, { "name": "China", "year": "2003", "gdp": 1660287965662.68 }, { "name": "China", "year": "2004", "gdp": 1955347004963.27 }, { "name": "China", "year": "2005", "gdp": 2285965892360.54 }, { "name": "China", "year": "2006", "gdp": 2752131773355.16 }, { "name": "USA", "year": "2007", "gdp": 3550342425238.25 }, { "name": "China", "year": "2008", "gdp": 4594306848763.08 }, { "name": "USA", "year": "2009", "gdp": 5101702432883.45 }, { "name": "China", "year": "2014", "gdp": 10438529153237.6 }, { "name": "China", "year": "2015", "gdp": 11015542352468.9 }, { "name": "China", "year": "2016", "gdp": 11137945669350.6 }, { "name": "China", "year": "2017", "gdp": 12143491448186.1 }, { "name": "China", "year": "2018", "gdp": 13608151864637.9 }, { "name": "United States", "year": "2000", "gdp": 10252345464000 }, { "name": "United States", "year": "2001", "gdp": 10581821399000 }, { "name": "United States", "year": "2002", "gdp": 10936419054000 }, { "name": "United States", "year": "2003", "gdp": 11458243878000 }, { "name": "United States", "year": "2004", "gdp": 12213729147000 },]
  const linePlot = new Line(document.getElementById('plot1'), {
    title: {
      visible: true,
      text: '2000 ~ 2018 年各国家 GDP 趋势对比',
    },
    description: {
      visible: true,
      text: '图形标签 (label) 位于折线尾部，用于标注整根折线，并有带有排名的含义在其中。',
    },
    padding: [20, 100, 30, 80],
    forceFit: true,
    data: datas,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    xAxis: {
      type: 'dateTime',
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
    },
    legend: {
      visible: false,
    },
    label: {
      visible: true,
      type: 'line',
    },
    animation: {
      appear: {
        animation: 'clipingWithData',
      },
    },
    smooth: true,
    scrollBar: {
      interactions: [
        {
          type: 'scrollbar',
        },
      ],
    },
    clickable: true
  });

  linePlot.render();

  // linePlot.on('click', ev => {

  // });

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
    //theme: "dark",
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