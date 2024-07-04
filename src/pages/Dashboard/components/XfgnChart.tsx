import React from 'react';
import { Card, Col, Row, Tabs } from 'antd';

import { Chart, LineAdvance } from 'bizcharts';
import styles from '../style.less';

const { TabPane } = Tabs;

// const data = [
//   {
// 		age: "13",
// 		coi: "平均值",
// 		stand: 76.5
// 	},{
// 		age: "13",
// 		coi: "标准值",
// 		stand: 60
// 	},
// 	{
// 		age: "24",
// 		coi: "平均值",
// 		stand: 48
// 	},{
// 		age: "24",
// 		coi: "标准值",
// 		stand: 60
// 	},
// 	{
// 		age: "39",
// 		coi: "平均值",
// 		stand: 72
// 	},{
// 		age: "39",
// 		coi: "标准值",
// 		stand: 60
// 	}
// ];

export type Props = {
  ['key']?: any;
  title: string;
  loading: boolean;
  data: API.XfgnChartData[];
};

const XfgnChart: React.FC<Props> = ({ loading, title, data }) => (
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
                <Chart padding={[10, 20, 50, 40]} autoFit height={400} data={data} >
                  <LineAdvance
                    shape="smooth"
                    point
                    area
                    position="age*stand"
                    color="coi"
                  />
                </Chart>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default XfgnChart;
