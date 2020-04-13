import React, { Component } from "react";
import { Radar, Funnel } from "@antv/g2plot";
import styles from "./style.module.css";
import Plot1 from './components/Plot1'
import Plot2 from './components/Plot2'
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
    //theme: "dark",
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
    //theme: "dark",
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
    plot3();
    plot4();
  }

  render() {
    return (
      <div className="clearfix">
        <Plot1 />
        <Plot2 />
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
