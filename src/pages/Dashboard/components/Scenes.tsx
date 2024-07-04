import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi';
import type { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import type { VisitDataType } from '../data.d';
import { Pie2 } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const Scenes = ({ loading }: { loading: boolean }) => (
  <Card
    loading={loading}
    className={styles.salesCard}
    bordered={false}
    title="客户分布"
    style={{
      height: '100%',
    }}
  >
    <Pie2
      hasLegend
      data={[
        { item: '学生', percent: 0.521 },
        { item: '白领', percent: 0.3565 },
        { item: '离退休人员', percent: 0.0248 },
        { item: '在学校', percent: 0.0076 },
        { item: '其他', percent: 0.09 },
      ]}
      cols={{
        percent: {
          formatter: (val) => {
            val = val * 100 + '%';
            return val;
          },
        },
      }}
      height={248}
      lineWidth={4}
    />
  </Card>
);

export default Scenes;
