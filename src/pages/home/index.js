import React, { Component } from 'react';
import { Line, StepLine, PercentageStackBar } from '@antv/g2plot';
import styles from './style.module.css';
import axios from 'axios';

function plot1() {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const linePlot = new Line(document.getElementById('plot1'), {
    title: {
      visible: true,
      text: '带数据点的折线图',
    },
    description: {
      visible: true,
      text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
    },
    forceFit: true,
    padding: 'auto',
    data,
    theme: 'dark',
    xField: 'year',
    yField: 'value',
    point: {
      visible: true,
    },
    label: {
      visible: true,
      type: 'point',
    },
  });

  linePlot.render();
}

function plot2() {
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const step = new StepLine(document.getElementById('plot2'), {
    title: {
      visible: true,
      text: '带数据点的折线图',
    },
    description: {
      visible: true,
      text: '将折线图上的每一个数据点显示出来，作为辅助阅读。',
    },
    forceFit: true,
    padding: 'auto',
    data,
    theme: 'dark',
    xField: 'year',
    yField: 'value',
    step: 'hvh', // 可以选择 hv, vh, hvh, vhv
    point: {
      visible: true,
    },
    label: {
      visible: true,
      type: 'point',
    },
  });

  step.render();
}

function plot3() {
  const data = [
    {
      country: 'Asia',
      year: '1750',
      value: 502,
    },
    {
      country: 'Asia',
      year: '1800',
      value: 635,
    },
    {
      country: 'Asia',
      year: '1850',
      value: 809,
    },
    {
      country: 'Asia',
      year: '1900',
      value: 947,
    },
    {
      country: 'Asia',
      year: '1950',
      value: 1402,
    },
    {
      country: 'Asia',
      year: '1999',
      value: 3634,
    },
    {
      country: 'Asia',
      year: '2050',
      value: 5268,
    },
    {
      country: 'Africa',
      year: '1750',
      value: 106,
    },
    {
      country: 'Africa',
      year: '1800',
      value: 107,
    },
    {
      country: 'Africa',
      year: '1850',
      value: 111,
    },
    {
      country: 'Africa',
      year: '1900',
      value: 133,
    },
    {
      country: 'Africa',
      year: '1950',
      value: 221,
    },
    {
      country: 'Africa',
      year: '1999',
      value: 767,
    },
    {
      country: 'Africa',
      year: '2050',
      value: 1766,
    },
    {
      country: 'Europe',
      year: '1750',
      value: 163,
    },
    {
      country: 'Europe',
      year: '1800',
      value: 203,
    },
    {
      country: 'Europe',
      year: '1850',
      value: 276,
    },
    {
      country: 'Europe',
      year: '1900',
      value: 408,
    },
    {
      country: 'Europe',
      year: '1950',
      value: 547,
    },
    {
      country: 'Europe',
      year: '1999',
      value: 729,
    },
    {
      country: 'Europe',
      year: '2050',
      value: 628,
    },
  ];

  const barPlot = new PercentageStackBar(document.getElementById('plot3'), {
    title: {
      visible: true,
      text: '百分比堆叠条形图',
    },
    data,
    theme: 'dark',
    xField: 'value',
    yField: 'year',
    stackField: 'country',
  });

  barPlot.render();
}

function plot4() {
  axios.get('https:/g2plot.antv.vision/zh/examples/data/fireworks-sales.json')
    .then((res) => {
      const step = new StepLine(document.getElementById('plot4'), {
        title: {
          visible: true,
          text: '单阶梯折线的基础用法',
        },
        description: {
          visible: true,
          text: '最基础简单的阶梯图使用方式，显示一个指标的趋势和变化',
        },
        forceFit: true,
        data: res.data,
        theme: 'dark',
        padding: 'auto',
        xField: 'Date',
        yField: 'scales',
        xAxis: {
          type: 'dateTime',
          tickCount: 5,
        },
      });

      step.render();
    }
    )
    .catch((data) => {

    });
}


class Home extends Component {

  componentDidMount() {
    plot1()
    plot2()
    plot3()
    plot4()
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
          <div id="plot4"></div>
        </div>
      </div>
    )
  }
}

export default Home;