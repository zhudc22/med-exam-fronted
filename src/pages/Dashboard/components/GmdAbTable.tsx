import { Card, Table, Tag, Space } from 'antd';
import styles from '../style.less';




const { Column, ColumnGroup } = Table;


const cols = [
	{
		title: '',
		dataIndex: 'ageCol',
		key: 'ageCol',
		width: 200,
		fixed: 'left',
		align: 'center',
	},
	{
		title: '男',
		dataIndex: 'maleNum',
		key: 'maleNum',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: '女',
		dataIndex: 'fmaleNum',
		key: 'fmaleNum',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: '异常人数',
		dataIndex: 'bhgTotalNum',
		key: 'bhgTotalNum',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: value + '人',
				props: {}
			};
			return obj;
		},
	}, {
		title: '总人数',
		dataIndex: 'totalNum',
		key: 'totalNum',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: value + '人',
				props: {}
			};
			return obj;
		},
	}, {
		title: '异常占比(%)',
		dataIndex: 'per',
		key: 'per',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			let val = ((row.bhgTotalNum / row.totalNum) * 100).toString().match(/^\d+(?:\.\d{0,1})?/);
			const obj = {
				children: val,
				props: {}
			};
			return obj;
		}
	}
];
const GmdAbTable = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: any[]; }) => (
	<Card
		loading={loading}
		className={styles.amountCard}
		bordered={false}
		// title={tableName}
		title={<div style={{ textAlign: "center", fontWeight:"bolder" }}>{tableName}</div>}
		style={{
			height: '100%',
		}}
	>
		<div>
			<Table
				pagination={false}
				columns={cols}
				dataSource={data}
				bordered
				size="middle"
			/>
		</div>
	</Card>
);

export default GmdAbTable;
