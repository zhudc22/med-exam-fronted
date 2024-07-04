import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi';
import type { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import type { VisitDataType } from '../data.d';
import { Pie } from './Charts';
import Yuan from '../utils/Yuan';
import styles from '../style.less';
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	getTheme,
} from "bizcharts";



const cols = {
	percent: {
		formatter: (val) => {
			val = (val * 100).toFixed(2) + "%";
			return val;
		},
	},
};
const BodyCount = ({ loading, pieName, bodyData, total, isAb }: { loading: boolean; pieName: string; bodyData: API.StatsPie[]; total: number; isAb: number; }) => (
	<Card
		loading={loading}
		className={styles.amountCard}
		bordered={false}
		title={pieName}
		style={{
			height: '100%',
		}}
	>
		<div>
			<Chart height={400} data={bodyData} scale={cols} interactions={['element-active']} autoFit>
				<Coordinate type="theta" radius={0.75} />
				<Tooltip showTitle={false} />
				<Axis visible={false} />
				<Interval
					position="percent"
					adjust="stack"
					color={isAb==0?  "name":(isAb==1?["name", "#33cc66-#ff6633"]:["name", "#ff6633-#ff3333"])}
					style={{
						lineWidth: 1,
						stroke: "#fff",
					}}
					label={[
						"name",
						(name) => {
							return {
								offset: 20,
								content: (data) => {
									return `${data.name} ${(total * data.percent).toFixed(0)}人-${(data.percent * 100).toFixed(2)}%`;
								}
							};
						},
					]}
				/>
			</Chart>
		</div>
	</Card>
);

export default BodyCount;
