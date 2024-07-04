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

			if (index == 18) {
				obj.props.colSpan = 6;
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

			if (index > 17) {
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

			if (index > 17) {
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
			if (index > 17) {
				obj.props.colSpan = 0;
			}
			return obj;
		}
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
			if (index > 17) {
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
		render: (value, row, index) => {
			const obj = {
				children: value,
				props: {}
			};
			if (index > 17) {
				obj.props.colSpan = 0;
			}
			return obj;
		}
	},

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
						width: 200,
						align: 'center',
						render: (value, row, index) => {
							const obj = {
								children: value,
								props: {}
							};
							if (index == 18) {
								obj.props.colSpan = 3;
							}
							if (index == 19) {
								obj.props.colSpan = 6;
							}

							return obj;
						}
					},
					{
						title: 'II级',
						dataIndex: 'zuojiangaoLevel2',
						key: 'zuojiangaoLevel2',
						width: 200,
						align: 'center',
						render: (value, row, index) => {
							const obj = {
								children: value,
								props: {}
							};
							if (index > 17) {
								obj.props.colSpan = 0;
							}
							return obj;
						}
					},
					{
						title: 'III级',
						dataIndex: 'zuojiangaoLevel3',
						key: 'zuojiangaoLevel3',
						width: 200,
						align: 'center',
						render: (value, row, index) => {
							const obj = {
								children: (value === undefined || value === 0) ? '' : value,
								props: {}
							};
							if (index > 17) {
								obj.props.colSpan = 0;
							}
							return obj;

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
						width: 200,
						align: 'center',
						render: (value, row, index) => {
							const obj = {
								children: value,
								props: {}
							};
							if (index == 18) {
								obj.props.colSpan = 3;
							}
							if (index == 19) {
								obj.props.colSpan = 0;
							}

							return obj;
						}
					},
					{
						title: 'II级',
						dataIndex: 'youjiangaoLevel2',
						key: 'youjiangaoLevel2',
						width: 200,
						align: 'center',
						render: (value, row, index) => {
							const obj = {
								children: value,
								props: {}
							};
							if (index > 17) {
								obj.props.colSpan = 0;
							}
							return obj;
						}
					},
					{
						title: 'III级',
						dataIndex: 'youjiangaoLevel3',
						key: 'youjiangaoLevel3',
						width: 200,
						align: 'center',
						render: (value, row, index) => {
							const obj = {
								children: (value === undefined || value === 0) ? '' : value,
								props: {}
							};
							if (index > 17) {
								obj.props.colSpan = 0;
							}
							return obj;
						}
					}
				]
			}, {
				title: '异常占比(%)',
				dataIndex: 'per',
				key: 'per',
				width: 200,
				fixed: 'left',
				align: 'center',
				render: (value, row, index) => {
					// let val = ((row.bhgNum / row.countNum) * 100).toFixed(1);
					let val = ((row.bhgNum / row.countNum) * 100).toString().match(/^\d+(?:\.\d{0,1})?/);
					if (index === 18) {
						// val = (((row.zuojiangaoLevel1+row.youjiangaoLevel1) / row.totalNum) * 100).toFixed(1);
						val = (((row.zuojiangaoLevel1+row.youjiangaoLevel1) / row.totalNum) * 100).toString().match(/^\d+(?:\.\d{0,1})?/);
					}
					if (index === 19) {
						val = '';
				   }
					const obj = {
						children: val,
						props: {}
					};
					if (index ==18 ) {
						obj.props.rowSpan = 2;
					}
					if (index ==19 ) {
						obj.props.rowSpan = 0;
					}

					return obj;
				}
			}
		]
	}
];

const GdjAbTable = ({ loading, tableName, data }: { loading: boolean; tableName: string; data: API.StatsBoardTotal[]; }) => (
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
