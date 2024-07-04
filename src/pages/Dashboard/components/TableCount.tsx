import { Card, Table, Tag, Space } from 'antd';
import styles from '../style.less';

const columns = [
	{
		title: '',
		dataIndex: 'name',
		key: 'name',
		width: 100,
		fixed: 'left',
		align: 'center',
	}, {
		title: '总人数',
		dataIndex: 'totalNum',
		key: 'totalNum',
		width: 100,
		fixed: 'left',
		align: 'center',
		render: (value, row, index) => {
			return value + '人';
		}
	}, {
		title: '总人数（男）',
		dataIndex: 'maleNum',
		key: 'maleNum',
		width: 100,
		fixed: 'left',
		align: 'center',
	}, {
		title: '总人数（女）',
		dataIndex: 'fmaleNum',
		key: 'fmaleNum',
		width: 100,
		fixed: 'left',
		align: 'center',
	}, {
		title: '体校（个）',
		dataIndex: 'orgNum',
		key: 'orgNum',
		width: 100,
		fixed: 'left',
		align: 'center',
	}, {
		title: '项目(个)',
		dataIndex: 'proNum',
		key: 'proNum',
		width: 100,
		fixed: 'left',
		align: 'center',
	}
];

const TableCount = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: API.StatsBoardTotal[]; }) => (
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
				columns={columns}
				dataSource={data}
				bordered
				size="middle"
			/>
		</div>
		<div style={{ textAlign: "center", fontWeight:"bolder" }}>（注：10岁-13岁中包含形态异常人数；为所有检测人员总人数）</div>
	</Card>
);

export default TableCount;
