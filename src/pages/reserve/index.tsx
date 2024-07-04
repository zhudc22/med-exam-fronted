import PersonalReserveForm from '@/components/PersonalReserve';
import TeamReserveForm from '@/components/TeamReserve';
import { ExclamationCircleOutlined, PlusOutlined, CalendarOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, message, Modal, Row, Col, DatePicker, Select, Tabs } from 'antd';
import printJS from 'print-js';
import React, { useRef, useState } from 'react';
import Moment from 'react-moment';
import {
  cancelReserve,
  fetchReserveList,
  print as printService,
  fetchPersonalReserve,
  updatePersonalReserveTime,
  updateTeamReserveTime,
} from '@/services/reserve';
import { history } from 'umi';
import moment from 'moment';
import { DEFAULT_PAGE_SIZE } from '@/utils/constant';
import styles from './index.less';

const { confirm } = Modal;
const { TabPane } = Tabs;



const Reserve: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  const [loading, setLoading] = useState<boolean>(false);

  const [showPersonalInfo, setShowPersonalInfo] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  const [personalReserveInfo, setPersonalReserveInfo] = useState({});

  const [item, setItem] = useState({});

  const loadCheckItems = () => {
    if (personalReserveInfo.items) {
      const items = [];
      personalReserveInfo.items.forEach((tmp) => {
        items.push(tmp.name);
      });
      return items.join(',');
    }
    return '';
  };

  const columns: ProColumns<API.ReserveItem>[] = [
    {
      title: '#',
      dataIndex: 'id',
      valueType: 'index',
      width: '32px',
      fixed: 'left',
    },
    {
      title: '预约单号',
      dataIndex: 'orderId',
      width: 140,
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      width: 80,
      fixed: 'left',
      sorter: true,
      render: (_, record) => {
        return record.type === 0 ? record.nickName : record.contactName;
      },
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      width: 130,
    },
    {
      title: '预约时间',
      dataIndex: 'orderDate',
      hideInSearch: true,
      width: 250,
      sorter: true,
      render: (_, record) => {
        return (
          <div>
            <Moment format="YYYY/MM/DD">{record.orderDate}</Moment>{' '}
            {record.orderTime === 1 ? '上午 09:00-11:30' : '下午 13:30-17:00'}
            {record.status === 0 && (
              <CalendarOutlined
                className={styles.cal_editor}
                onClick={() => {
                  setShowTimePicker(true);
                  setItem(record);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      title: '团体名称',
      dataIndex: 'checkGroupName',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '检测点',
      dataIndex: 'checkOrgName',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      valueType: 'select',
      initialValue: 0,
      request: async () => [
        {
          label: '全部',
          value: -1,
        },
        {
          label: '待检测',
          value: 0,
        },
        {
          label: '检测完成',
          value: 2,
        },
        {
          label: '预约取消',
          value: 3,
        },
      ],
      render: (_, record) => {
        switch (record.status) {
          case 0:
            return '待检测';
          case 2:
            return '检测完成';
          case 3:
            return '预约取消';
          default:
            return '-';
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 250,
      fixed: 'right',
      render: (_, record) => {
        const viewAction = (
          <a
            key="view"
            onClick={() => {
              if (record.type === 0) {
                // 个人预约
                setLoading(true);
                fetchPersonalReserve(record.id).then((resp) => {
                  setPersonalReserveInfo(resp.data);
                  setShowPersonalInfo(true);
                  setLoading(false);
                });
              } else {
                // 团体预约
                history.push(`/reserve/teamReserveInfo/${record.id}`);
              }
            }}
          >
            查看
          </a>
        );

        const cancelAction = (
          <a
            key="canel"
            onClick={() => {
              confirm({
                title: '',
                icon: <ExclamationCircleOutlined />,
                content: (
                  <p>
                    是否取消{record.type === 0 ? record.nickName : record.checkGroupName}的检测预约?
                  </p>
                ),
                okText: '确定',
                okType: 'danger',
                cancelText: '关闭',
                onOk() {
                  cancelReserve(record.id).then((resp) => {
                    if (resp) {
                      message.success('预约信息已取消');
                    }
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  });
                },
                onCancel() {},
              });
            }}
          >
            预约取消
          </a>
        );

        const printAction = (
          <a
            key="print"
            onClick={async () => {
              setLoading(true);
              const binaryData = [];
              binaryData.push(await printService(record.orderId));
              const blob = new Blob(binaryData, { type: 'application/pdf' });
              const blobUrl = URL.createObjectURL(blob);
              printJS({
                printable: blobUrl,
                type: 'pdf',
              });
              setLoading(false);
            }}
          >
            打印指引单
          </a>
        );

        const actions = [];
        if (record.status !== 0) {
          actions.push(viewAction);
        } else {
          actions.push(viewAction);
          actions.push(cancelAction);
          actions.push(printAction);
        }

        return actions;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.ReserveItem, API.PageParams>
        scroll={{ x: 1000 }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          layout: 'vertical',
          span: 4,
        }}
        toolbar={{
          settings: [],
        }}
        loading={loading}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={fetchReserveList}
        columns={columns}
        tableAlertRender={false}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
      />

      <Modal
        centered
        destroyOnClose
        title="个人预约信息"
        visible={showPersonalInfo}
        width="800px"
        footer={[
          <Button
            type="primary"
            key="close"
            onClick={() => {
              setShowPersonalInfo(false);
              setPersonalReserveInfo({});
            }}
          >
            关闭
          </Button>,
        ]}
        onCancel={() => {
          setShowPersonalInfo(false);
          setPersonalReserveInfo({});
        }}
      >
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            姓名：
          </Col>
          <Col>{personalReserveInfo.nickName}</Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            性别：
          </Col>
          <Col>{personalReserveInfo.male === 0 ? '男' : '女'}</Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            年龄：
          </Col>
          <Col>{personalReserveInfo.age}</Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            身份证号：
          </Col>
          <Col>{personalReserveInfo.card}</Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            联系电话：
          </Col>
          <Col>{personalReserveInfo.contactPhone}</Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            预约时间：
          </Col>
          <Col>
            <Moment format="YYYY/MM/DD" style={{ marginRight: '10px' }}>
              {personalReserveInfo.orderDate}
            </Moment>
            {personalReserveInfo.orderTime === 1 ? '上午 09:00-11:30' : '下午 13:30-17:00'}
          </Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            检测点：
          </Col>
          <Col>{personalReserveInfo.checkOrgName}</Col>
        </Row>
        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            检测项目（一级）：
          </Col>
          <Col>{personalReserveInfo.checkType1Name}</Col>
        </Row>
        {personalReserveInfo.checkType2Name && (
          <Row className={styles.info_row}>
            <Col span={6} className={styles.label}>
              检测项目（二级）：
            </Col>
            <Col>{personalReserveInfo.checkType2Name}</Col>
          </Row>
        )}

        <Row className={styles.info_row}>
          <Col span={6} className={styles.label}>
            检测项目：
          </Col>
          <Col style={{ maxWidth: '60%' }} className={styles.check_item_name}>
            {loadCheckItems()}
          </Col>
        </Row>
      </Modal>

      <Modal
        title={'新建预约'}
        visible={createModalVisible}
        centered
        destroyOnClose
        width="800px"
        onCancel={() => {
          handleModalVisible(false);
        }}
        maskClosable={false}
        mask={true}
        footer={null}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="个人预约" key="1">
            <PersonalReserveForm
              callback={(val) => {
                if (val) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                  handleModalVisible(false);
                }
              }}
            />
          </TabPane>
          <TabPane tab="团队预约" key="2">
            <TeamReserveForm
              callback={(val) => {
                if (val) {
                  if (actionRef.current) {
                    actionRef.current.reload();
                  }
                  handleModalVisible(false);
                }
              }}
            />
          </TabPane>
        </Tabs>
      </Modal>

      <Modal
        title={'修改预约时间'}
        visible={showTimePicker}
        centered
        destroyOnClose
        onCancel={() => {
          setShowTimePicker(false);
          setItem({});
        }}
        onOk={() => {
          if (item.type === 0) {
            // 个人
            updatePersonalReserveTime(item).then((resp) => {
              if (resp && actionRef.current) {
                actionRef.current.reload();
              }
              setShowTimePicker(false);
            });
          } else {
            // 团体
            updateTeamReserveTime(item).then((resp) => {
              if (resp && actionRef.current) {
                actionRef.current.reload();
              }
              setShowTimePicker(false);
            });
          }
        }}
      >
        <div>
          <Row align="middle">
            <Col span={4} className={styles.label}>
              预约日期:
            </Col>
            <Col className={styles.time_picker}>
              <DatePicker
                style={{ width: 220 }}
                allowClear={false}
                value={moment.unix(item.orderDate / 1000)}
                disabledDate={(current) => {
                  const days = current.diff(moment(), 'days');
                  if (days > 5) {
                    return true;
                  } else if (days < 0) {
                    return true;
                  }
                  return false;
                }}
                onChange={(date) => {
                  if (date) {
                    const tmp = { ...item };
                    tmp.orderDate = date.unix() * 1000;
                    setItem(tmp);
                  }
                }}
              />
            </Col>
          </Row>
          <Row align="middle" style={{ marginTop: '10px' }}>
            <Col span={4} className={styles.label}>
              时间段:
            </Col>
            <Col className={styles.time_picker}>
              <Select
                style={{ width: 220 }}
                onChange={(value) => {
                  const tmp = { ...item };
                  tmp.orderTime = value;
                  setItem(tmp);
                }}
                value={`${item.orderTime}`}
              >
                <Select.Option value="1">上午 09:00-11:30</Select.Option>
                <Select.Option value="2">下午 13:30 - 17:00</Select.Option>
              </Select>
            </Col>
          </Row>
        </div>
      </Modal>
    </PageContainer>
  );
};

export default Reserve;
