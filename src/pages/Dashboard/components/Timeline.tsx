import React from 'react';
import { Card, Radio } from 'antd';

import type { VisitDataType } from '../data';
import { TimelineChart } from './Charts';
import styles from '../style.less';

const Timeline = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="时段分布"
    style={{
      height: '100%',
    }}
  >
    <TimelineChart
      data={[]}
      height={248}
      titleMap={{
        y1: 'traffic',
        y2: 'payments',
      }}
    />
  </Card>
);

export default Timeline;
