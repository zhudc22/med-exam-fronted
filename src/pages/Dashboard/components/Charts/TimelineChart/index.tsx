import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Facet,
  Util,
  Point,
  Line,
  Interval,
  Slider,
} from 'bizcharts';
import moment from 'moment';

import DataSet from '@antv/data-set';
import autoHeight from '../autoHeight';
import styles from './index.less';

export interface TimelineChartProps {
  data: {
    x: number;
    y1: number;
    y2: number;
  }[];
  title?: string;
  titleMap: { y1: string; y2: string };
  padding?: [number, number, number, number];
  height?: number;
  style?: React.CSSProperties;
  borderWidth?: number;
}

const TimelineChart: React.FC<TimelineChartProps> = (props) => {
  const data = [
    { time: '2021-05-01 00:00', people: 0.0621 },
    { time: '2021-05-01 01:00', people: 0.0192 },
    { time: '2021-05-01 02:00', people: 0.0079 },
    { time: '2021-05-01 03:00', people: 0.0365 },
    { time: '2021-05-01 04:00', people: 0.0032 },
    { time: '2021-05-01 05:00', people: 0.0399 },
    { time: '2021-05-01 06:00', people: 0.0194 },
    { time: '2021-05-01 07:00', people: 0.0571 },
    { time: '2021-05-01 08:00', people: 0.0482 },
    { time: '2021-05-01 09:00', people: 0.0559 },
    { time: '2021-05-01 10:00', people: 0.0307 },
    { time: '2021-05-01 11:00', people: 0.022 },
    { time: '2021-05-01 12:00', people: 0.0555 },
    { time: '2021-05-01 13:00', people: 0.024 },
    { time: '2021-05-01 14:00', people: 0.055 },
    { time: '2021-05-01 15:00', people: 0.0233 },
    { time: '2021-05-01 16:00', people: 0.0658 },
    { time: '2021-05-01 17:00', people: 0.0534 },
    { time: '2021-05-01 18:00', people: 0.0627 },
    { time: '2021-05-01 19:00', people: 0.0335 },
    { time: '2021-05-01 20:00', people: 0.0398 },
    { time: '2021-05-01 21:00', people: 0.0778 },
    { time: '2021-05-01 22:00', people: 0.0717 },
    { time: '2021-05-01 23:00', people: 0.0354 },
  ];

  let chartIns = null;
  const scale = {
    // tickCount控制双轴的对齐
    people: {
      alias: '人次',
      tickCount: 5,
      min: 0,
      type: 'linear-strict',
    },
    time: {
      alias: '时间',
      // type: 'timeCat',
      // mask: 'YYYY-MM-DD HH:mm:ss'
    },
  };
  const colors = ['#6394f9', '#62daaa'];

  const axisLabel = {
    formatter(text, item, index) {
      // return moment(text).format('YYYY-MM-DD HH:mm:ss')
      return moment(text).format('HH:mm');
    },
  };

  return (
    <Chart
      scale={scale}
      autoFit
      height={400}
      data={data}
      onGetG2Instance={(chart) => {
        chartIns = chart;
      }}
    >
      <Axis name="people" title />
      <Axis name="time" label={axisLabel} />
      <Legend
        visible={false}
        custom={true}
        allowAllCanceled={true}
        items={[
          {
            value: 'people',
            name: '播放量',
            marker: {
              symbol: 'hyphen',
              style: { stroke: colors[1], r: 5, lineWidth: 3 },
            },
          },
        ]}
        onChange={(ev) => {
          const item = ev.item;
          const value = item.value;
          const checked = !item.unchecked;
          const geoms = chartIns.geometries;

          for (let i = 0; i < geoms.length; i++) {
            const geom = geoms[i];

            if (geom.getYScale().field === value) {
              if (checked) {
                geom.show();
              } else {
                geom.hide();
              }
            }
          }
        }}
      />
      <Tooltip shared showCrosshairs />
      {/*API参考文档 https://pre-bxs.alibaba-inc.com/product/bizcharts/category/7/page/27#tooltip*/}
      <Line
        position="time*people"
        color={colors[1]}
        size={3}
        shape="smooth"
        tooltip={[
          'time*people',
          (time, people) => {
            const myTitle = moment(time).format('MM-DD HH:mm');
            return {
              name: '播放量',
              value: `${people} %`,
              title: myTitle,
            };
          },
        ]}
      />
      <Point position="time*people" color={colors[1]} size={3} shape="circle" tooltip={false} />
      <Slider />
    </Chart>
  );
};

export default autoHeight()(TimelineChart);
