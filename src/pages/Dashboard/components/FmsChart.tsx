import React from 'react';
import { Card, Col, DatePicker, Row, Tabs } from 'antd'; 
import {
  Chart,
  Area,
  Line,
  Point,
  Tooltip,
  Axis,
  View
} from 'bizcharts';
import styles from '../style.less';
// const data = [
//   { age: '13', values: [470, 495] },
//   { age: '39', values: [466, 466] }
// ];

// const averages = [
//   { age: '13', values: 482.5 },
//   { age: '39', values: 466 }
// ];
// const data = {
//   "data": [{ age: '13', values: [470, 495] },
//   { age: '39', values: [466, 466] }],
//   "averages": [
//     { age: '13', values: 482.5 },
//     { age: '39', values: 466 }
//   ]
// };

const { TabPane } = Tabs;
export type Props = {
  ['key']?: any;
  title: string;
  loading: boolean;
  data: API.FmsChartData;
};
const scale = {
  values: {
    sync: true,
    nice: true,
  },
  age: {
    nice: true,
    tickInterval: 1,
  },
};

const FmsCard: React.FC<Props> = ({ loading, title ,data}) => (
  <Card loading={loading} bordered={false} title={title} bodyStyle={{ padding: 0 }}>
    <div className={styles.amountCard}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane key="Fms">
          <Row gutter={16}>
            <Col xl={23} lg={23} md={23} sm={24} xs={24}>
              <div className={styles.amountBar}>
                <Chart scale={scale} height={400} data={data.data} title={title} autoFit>
                  <Tooltip shared />
                  <View data={data.data} scale={{ values: { alias: '分值区间' } }} >
                    <Area position="age*values" />
                  </View>
                  <View data={data.averages} scale={{ values: { alias: '平均值' } }} >
                    <Line position="age*values" />
                    <Point
                      position="age*values"
                      size={3}
                      shape="circle"
                    />
                  </View>
                </Chart>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default FmsCard;
