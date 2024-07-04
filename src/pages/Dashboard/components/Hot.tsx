import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi';
import type { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import type { VisitDataType } from '../data';
import { Bubble } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const Hot = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="检测项热度"
    style={{
      height: '100%',
    }}
  >
    <Bubble
      hasLegend
      total={'bbb'}
      data={[]}
      valueFormat={(value) => <Yuan>{value}</Yuan>}
      height={248}
      lineWidth={4}
    />
  </Card>
);

export default Hot;
