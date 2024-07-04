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
		render: (value, row, index) => {
			const obj = {
				children: value,
				props: {}
			};
			if (index % 2 === 0) {
				obj.props.rowSpan = 2;
			}
			// These two are merged into above cell
			if (index % 2 === 1) {
				obj.props.rowSpan = 0;
			}
			if (index == 20) {
				obj.props.colSpan = 5;
			}
			return obj;
		}
	},
	{
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
			if (index % 2 === 0) {
				obj.props.rowSpan = 2;
			}
			// These two are merged into above cell
			if (index % 2 === 1) {
				obj.props.rowSpan = 0;
			}
			if (index == 20) {
				obj.props.colSpan = 0;
			}
			return obj;
		}
	},
	{
		title: '异常总人数',
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

			if (index % 2 === 0) {
				obj.props.rowSpan = 2;
			}
			// These two are merged into above cell
			if (index % 2 === 1) {
				obj.props.rowSpan = 0;
			}
			if (index >= 20) {
				obj.props.colSpan = 0;
			}
			return obj;
		}
	},
	{
		title: '性别',
		dataIndex: 'maleCol',
		key: 'maleCol',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: value,
				props: {}
			};
			if (index >= 20) {
				obj.props.colSpan = 0;
			}
			return obj;
		},
	}, {
		title: '人数',
		dataIndex: 'countNum',
		key: 'countNum',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: value,
				props: {}
			};
			if (index >= 20) {
				obj.props.colSpan = 0;
			}
			return obj;
		}
	}, {
		title: '异常人数',
		dataIndex: 'bhgNum',
		key: 'bhgNum',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: 'I级',
		dataIndex: 'spinalLevel1',
		key: 'spinalLevel1',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: 'II级',
		dataIndex: 'spinalLevel2',
		key: 'spinalLevel2',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: 'III级',
		dataIndex: 'spinalLevel3',
		key: 'spinalLevel3',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: (value === undefined || value === 0) ? '' : value,
				props: {}
			};
			return obj;

		}
	}, {
		title: '异常占比(%)',
		dataIndex: 'per',
		key: 'per',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			let val = ((row.bhgNum / row.countNum) * 100).toString().match(/^\d+(?:\.\d{0,1})?/);
			if (index === 20) {
				 val = ((row.bhgNum / row.totalNum) * 100).toString().match(/^\d+(?:\.\d{0,1})?/);
			}
			const obj = {
				children: val,
				props: {}
			};
			return obj;
		}
	}

];
const SpinalAbTable = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: any[]; }) => (
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

export default SpinalAbTable;
