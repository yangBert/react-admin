import React, { Component } from "react";
import { Line, StepLine, Radar, Funnel } from "@antv/g2plot";

import styles from "./style.module.css";

function plot1() {
  const data = [
    { year: "第一季度", value: 8908 },
    { year: "第二季度", value: 12088 },
    { year: "第三季度", value: 50896 },
    { year: "第四季度", value: 103541 }
  ];

  const linePlot = new Line(document.getElementById("plot1"), {
    title: {
      visible: true,
      text: "应用登录走势图"
    },
    description: {
      visible: true,
      text: "授权登录统计"
    },
    forceFit: true,
    padding: "auto",
    data,
    theme: "dark",
    xField: "year",
    yField: "value",
    point: {
      visible: true
    },
    label: {
      visible: true,
      type: "point"
    }
  });

  linePlot.render();
}

function plot2() {
  const data = [
    { year: "第一季度", value: 100000 },
    { year: "第二季度", value: 123456 },
    { year: "第三季度", value: 454221 },
    { year: "第四季度", value: 523244 }
  ];

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
    xField: "year",
    yField: "value",
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

function plot3() {
  const data = [
    { action: "浏览网站", pv: 50000 },
    { action: "放入购物车", pv: 35000 },
    { action: "生成订单", pv: 25000 },
    { action: "支付", pv: 15000 },
    { action: "成交", pv: 8500 }
  ];

  const funnelPlot = new Funnel(document.getElementById("plot3"), {
    data: data,
    theme: "dark",
    xField: "action",
    yField: "pv"
  });
  funnelPlot.render();
}

function plot4() {
  const data = [
    {
      item: "数字签名接口服务",
      score: 70
    },
    {
      item: "数字签名验证服务",
      score: 60
    },
    {
      item: "数字证书验证",
      score: 60
    },
    {
      item: "数据加密",
      score: 40
    },
    {
      item: "数据解密",
      score: 60
    },
    {
      item: "银行卡四要素验证",
      score: 70
    },
    {
      item: "银行卡三要素验证",
      score: 50
    },
    {
      item: "手机号信息验证",
      score: 30
    },
    {
      item: "企业基础信息核验",
      score: 60
    },
    {
      item: "驾驶证三要素验证",
      score: 50
    }
  ];
  const radarPlot = new Radar(document.getElementById("plot4"), {
    title: {
      visible: true,
      text: "产品年度统计"
    },
    data,
    theme: "dark",
    angleField: "item",
    radiusField: "score",
    radiusAxis: {
      grid: {
        alternateColor: ["rgba(0, 0, 0, 0.04)", null]
      }
    },
    area: {
      visible: false
    },
    point: {
      visible: true
    }
  });
  radarPlot.render();
}

class Home extends Component {
  componentDidMount() {
    plot1();
    plot2();
    plot3();
    plot4();
  }

  render() {
    return (
      <div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot1"></div>
        </div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot2"></div>
        </div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot3"></div>
        </div>
        <div className={`${styles.item} pullLeft`}>
          <div id="plot4" style={{ color: "#fff" }}></div>
        </div>
      </div>
    );
  }
}

export default Home;
