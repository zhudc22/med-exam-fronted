import React from 'react';
import { Card, Col, DatePicker, Row, Tabs } from 'antd';
import { formatMessage } from 'umi';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import numeral from 'numeral';
import { Bar } from './Charts';
import styles from '../style.less';

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

// const rankingListData: { title: string; total: number }[] = [];
// rankingListData.push({
//   title: '4月20日',
//   total: 2999,
// });

// rankingListData.push({
//   title: '4月24日',
//   total: 2431,
// });

// rankingListData.push({
//   title: '4月25日',
//   total: 2392,
// });

// rankingListData.push({
//   title: '4月21日',
//   total: 2177,
// });

// rankingListData.push({
//   title: '4月27日',
//   total: 1983,
// });

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

export type Props = {
  ['key']?: any;
  title: string;
  loading: boolean;
  data: any;
  topData: any;
};

const AmountCard: React.FC<Props> = ({ loading, title, data, topData }) => (
  <Card loading={loading} bordered={false} title={title} bodyStyle={{ padding: 0 }}>
    <div className={styles.amountCard}>
      <Tabs
        size="large"
        tabBarStyle={{ marginBottom: 24 }}
      >
        <TabPane key="Amount">
          <Row gutter={16}>
            <Col xl={16} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.amountBar}>
                <Bar
                  height={295}
                  data={data}
                />
              </div>
            </Col>
            <Col xl={8} lg={12} md={12} sm={24} xs={24}>
              <div className={styles.amountRank}>
                <h4 className={styles.rankingTitle}>Top 5</h4>
                <ul className={styles.rankingList}>
                  {topData.map((item, i) => (
                    <li key={item.title}>
                      <span className={`${styles.rankingItemNumber} ${i < 3 ? styles.active : ''}`}>
                        {i + 1}
                      </span>
                      <span className={styles.rankingItemTitle} title={item.title}>
                        {item.x}
                      </span>
                      <span className={styles.rankingItemValue}>
                        {item.y.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  </Card>
);

export default AmountCard;
