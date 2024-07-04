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
			return obj;
		}
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
			if (index % 2 === 0) {
				obj.props.rowSpan = 2;
			}
			// These two are merged into above cell
			if (index % 2 === 1) {
				obj.props.rowSpan = 0;
			}
			return obj;
		},
	},
	{
		title: '性别',
		dataIndex: 'maleCol',
		key: 'maleCol',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: '人数',
		dataIndex: 'bhgNum',
		key: 'bhgNum',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: '骨盆左右倾人数',
		dataIndex: 'gupenZy',
		key: 'gupenZy',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: '骨盆前后倾人数',
		dataIndex: 'gupenQh',
		key: 'gupenQh',
		width: 200,
		fixed: 'left',
		align: 'center',
	}, {
		title: '异常占比(%)',
		dataIndex: 'per',
		key: 'per',
		width: 200,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			let val = ((row.bhgTotalNum / row.totalNum) * 100).toString().match(/^\d+(?:\.\d{0,1})?/);
			if (index === 20) {
				// val = ((row.zuojiangaoLevel1 / row.totalNum) * 100).toFixed(2) + ' / ' + ((row.youjiangaoLevel1 / row.totalNum) * 100).toFixed(2);
				val ='';
			}
			const obj = {
				children: val,
				props: {}
			};
			if (index % 2 === 0) {
				obj.props.rowSpan = 2;
			}
			// These two are merged into above cell
			if (index % 2 === 1) {
				obj.props.rowSpan = 0;
			}

			return obj;
		}
	}

];
const GdjAbTable = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: any[]; }) => (
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

export default GdjAbTable;
