import { Card, Table, Tag, Space } from 'antd';
import styles from '../style.less';




const { Column, ColumnGroup } = Table;


const cols = [
	{
		title: '',
		dataIndex: 'ageCol',
		key: 'ageCol',
		width: 100,
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
		width: 100,
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
	},
	{
		title: '性别',
		dataIndex: 'maleCol',
		key: 'maleCol',
		width: 100,
		fixed: 'left',
		align: 'center',
	},{
		title: '人数',
		dataIndex: 'countNum',
		key: 'countNum',
		width: 100,
		fixed: 'left',
		align: 'center',
		render: (value) => {
			if(value===undefined || value===0){
				return '';
			}
			return value;
		},
	},
	{
		title: '优秀',
		dataIndex: 'yxNum',
		key: 'yxNum',
		width: 100,
		fixed: 'left',
		align: 'center',
		render: (value) => {
			if(value===undefined || value===0){
				return '';
			}
			return value;
		},
	},
	{
		title: '良好',
		dataIndex: 'lhNum',
		key: 'lhNum',
		width: 100,
		fixed: 'left',
		align: 'center',
		render: (value) => {
			if(value===undefined || value===0){
				return '';
			}
			return value;
		},
	},
	{
		title: '合格',
		dataIndex: 'hgNum',
		key: 'hgNum',
		width: 100,
		fixed: 'left',
		align: 'center',
		render: (value) => {
			if(value===undefined || value===0){
				return '';
			}
			return value;
		},
	},
	{
		title: '不合格',
		dataIndex: 'bhgNum',
		key: 'bhgNum',
		width: 100,
		fixed: 'left',
		align: 'center',
		render: (value) => {
			if(value===undefined || value===0){
				return '';
			}
			return value;
		},
	},
	{
		title: '不合格项目',
		children: [
			{
				title: '心肺功能',
				dataIndex: 'xfgnNum',
				key: 'xfgnNum',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},{
				title: 'FMS',
				dataIndex: 'fmsNum',
				key: 'fmsNum',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},{
				title: '灵敏',
				dataIndex: 'respNum',
				key: 'respNum',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},{
				title: '脊柱机能',
				dataIndex: 'spinalNum',
				key: 'spinalNum',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},{
				title: '骨密度值低',
				dataIndex: 'gmdNum',
				key: 'gmdNum',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},{
				title: '平衡',
				dataIndex: 'balanceNum',
				key: 'balanceNum',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},
		],
	}
];

const CjTable = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: API.StatsBoardTotal[]; }) => (
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
				scroll={{ x: 1500 }}
			/>
		</div>
		<div style={{ textAlign: "center", fontWeight:"bolder" }}>（注：统计表3不包含形态发育异常人数；不合格人数中不合格的项目>1）</div>
	</Card>
);

export default CjTable;
