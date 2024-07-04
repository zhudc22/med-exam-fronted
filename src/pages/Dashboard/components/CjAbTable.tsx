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
		title: '不合格总人数',
		dataIndex: 'bhgTotalNum',
		key: 'bhgTotalNum',
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
	},
	{
		title: '人数',
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
		title: '体姿体态不合格',
		children: [
			{
				title: '高低肩',
				children: [
					{
						title: '左肩高',
						children: [
							{
								title: 'I级',
								dataIndex: 'zuojiangaoLevel1',
								key: 'zuojiangaoLevel1',
								width: 100,
								align: 'center',
								render: (value) => {
									if(value===undefined || value===0){
										return '';
									}
									return value;
								}
							},
							{
								title: 'II级',
								dataIndex: 'zuojiangaoLevel2',
								key: 'zuojiangaoLevel2',
								width: 100,
								align: 'center',
								render: (value) => {
									if(value===undefined || value===0){
										return '';
									}
									return value;
								}
							},
							{
								title: 'III级',
								dataIndex: 'zuojiangaoLevel3',
								key: 'zuojiangaoLevel3',
								width: 100,
								align: 'center',
								render: (value) => {
									if(value===undefined || value===0){
										return '';
									}
									return value;
								}
							}
						]
					}, {
						title: '右肩高',
						children: [
							{
								title: 'I级',
								dataIndex: 'youjiangaoLevel1',
								key: 'youjiangaoLevel1',
								width: 100,
								align: 'center',
								render: (value) => {
									if(value===undefined || value===0){
										return '';
									}
									return value;
								}
							},
							{
								title: 'II级',
								dataIndex: 'youjiangaoLevel2',
								key: 'youjiangaoLevel2',
								width: 100,
								align: 'center',
								render: (value) => {
									if(value===undefined || value===0){
										return '';
									}
									return value;
								}
							},
							{
								title: 'III级',
								dataIndex: 'youjiangaoLevel3',
								key: 'youjiangaoLevel3',
								width: 100,
								align: 'center',
								render: (value) => {
									if(value===undefined || value===0){
										return '';
									}
									return value;
								}
							}
						]
					}
				]
			},
			{
				title: '脊柱弯曲',
				children: [
					{
						title: 'I级',
						dataIndex: 'spinalLevel1',
						key: 'spinalLevel1',
						align: 'center',
						width: 100,
						render: (value) => {
							if(value===undefined || value===0){
								return '';
							}
							return value;
						}
					},
					{
						title: 'II级',
						dataIndex: 'spinalLevel2',
						key: 'spinalLevel2',
						align: 'center',
						width: 100,
						render: (value) => {
							if(value===undefined || value===0){
								return '';
							}
							return value;
						}
					},
					{
						title: 'III级',
						dataIndex: 'spinalLevel3',
						key: 'spinalLevel3',
						align: 'center',
						width: 100,
						render: (value) => {
							if(value===undefined || value===0){
								return '';
							}
							return value;
						}
					}
				]
			}, {
				title: '翼状肩胛',
				dataIndex: 'yizhuangjianjia',
				key: 'yizhuangjianjia',
				width: 100,
				fixed: 'left',
				align: 'center',
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				}
			}, {
			
				title: '骨盆倾斜',
				dataIndex: 'gupenQx',
				key: 'gupenQx',
				width: 100,
				fixed: 'left',
				align: 'center',
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},	
			}, {
				title: '圆肩驼背',
				dataIndex: 'yuanjianTuobei',
				key: 'yuanjianTuobei',
				width: 100,
				fixed: 'left',
				align: 'center',
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			}, {
				title: '扁平足',
				dataIndex: 'bianpingzu',
				key: 'bianpingzu',
				width: 100,
				fixed: 'left',
				align: 'center',
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			}
		]
	}, {
		title: '机能不合格',
		children: [
			{
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
				title: '发育迟缓',
				dataIndex: 'fy',
				key: 'fy',
				align: 'center',
				width: 100,
				render: (value) => {
					if(value===undefined || value===0){
						return '';
					}
					return value;
				},
			},{
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

const CjAbTable = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: API.StatsBoardTotal[]; }) => (
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
		<div style={{ textAlign: "center", fontWeight:"bolder" }}>（注：体姿体态不合格人数包含高低肩、翼状肩胛、骨盆倾斜和圆肩驼背）</div>
	</Card>
);

export default CjAbTable;
