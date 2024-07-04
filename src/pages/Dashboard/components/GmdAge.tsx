import React from 'react';
import { Card, Col, Row, Tabs } from 'antd';
import {
  G2,
  Chart,
  Tooltip,
  Interval,
} from "bizcharts";
import styles from '../style.less';

const { TabPane } = Tabs;

// const data = [
//   { name: '正常', age: 'Jan.', cnt: 18.9 },
//   { name: '正常', age: 'Feb.', cnt: 28.8 },
//   { name: '正常', age: 'Mar.', cnt: 39.3 },
//   { name: '正常', age: 'Apr.', cnt: 81.4 },
//   { name: '正常', age: 'May', cnt: 47 },
//   { name: '正常', age: 'Jun.', cnt: 20.3 },
//   { name: '正常', age: 'Jul.', cnt: 24 },
//   { name: '正常', age: 'Aug.', cnt: 35.6 },
//   { name: '异常', age: 'Jan.', cnt: 12.4 },
//   { name: '异常', age: 'Feb.', cnt: 23.2 },
//   { name: '异常', age: 'Mar.', cnt: 34.5 },
//   { name: '异常', age: 'Apr.', cnt: 99.7 },
//   { name: '异常', age: 'May', cnt: 52.6 },
//   { name: '异常', age: 'Jun.', cnt: 35.5 },
//   { name: '异常', age: 'Jul.', cnt: 37.4 },
//   { name: '异常', age: 'Aug.', cnt: 42.4 },
// ];

export type Props = {
  ['key']?: any;
  title: string;
  loading: boolean;
  data: API.StatsGmdAge[];
};

const GmdAgeChart: React.FC<Props> = ({ loading, title, data }) => (
  <Card loading={loading} bordered={false} title={title} bodyStyle={{ padding: 0 }}>
    <div className={styles.amountCard}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane key="xfgn">
          <Row gutter={16}>
            <Col xl={23} lg={23} md={23} sm={24} xs={24}>
              <div className={styles.amountBar}>
                <Chart height={400} padding="auto"  data={data} autoFit>
                  <Interval
                    adjust={[
                      {
                        type: 'dodge',
                      },
                    ]}
                    color={["name", "#33cc66-#ff6633"]}                    
                    position="age*cnt"
                    label={['cnt', { position: 'top', offset: 0}]}
                  />
                  <Tooltip shared />
                </Chart>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default GmdAgeChart;
