import React, { useRef, useState, useEffect } from 'react';
import moment from 'moment'; 
import Moment from 'react-moment';
import { history } from 'umi';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Row, Col, Card, Divider, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import printJS from 'print-js';
import { fetchTeamReserveInfo, print as printService, fetchTeamReserveDetail, teamAppend, teamCancel } from '@/services/reserve';
import { rootCheckItems, customCheckItems, checkItems } from '@/services/checkItems';
import styles from './index.less';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
 const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');
  try {
    await teamAppend({ ...fields });
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */

 const handleRemove = async (id: number) => {
  const hide = message.loading('正在取消');
  try {
    await teamCancel(id);
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const Reserve: React.FC = (props) => {

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [teamInfo, setTeamInfo] = useState<any>();

  const [customItem, setcCustomItem] = useState<boolean>(false);
  const [rootId, setRootId] = useState<number>(-1);

  useEffect(() => {
    fetchTeamReserveDetail(props.match.params.orderId).then(resp => {
      setTeamInfo(resp.data);
    })
  }, [props.match.params.orderId]);

  const columns: ProColumns<API.TeamReserveInfo>[] = [
    {
      title: '预约单号',
      dataIndex: 'orderId',
      width: 70,
      fixed: 'left',
    }, {
      title: '姓名',
      dataIndex: 'nickName',
      width: 70,
      fixed: 'left',
    },
    {
      title: '性别',
      dataIndex: 'male',
      width: 50,
      render: (male) => {
        switch (male) {
          case 0:
            return '女';
          default:
            return '男';
        }
      },
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 40,
      hideInSearch: true,
      fixed: 'left',
    },
    {
      title: '身份证号',
      dataIndex: 'card',
      width: 170,
    },
    {
      title: '联系电话',
      dataIndex: 'contactPhone',
      width: 100,
      hideInSearch: true,
    },

    {
      title: '检测项目（一级）',
      dataIndex: 'checkType1Name',
      hideInSearch: true,
      width: 200,
      ellipsis: true,
    },
    {
      title: '检测项目（二级）',
      dataIndex: 'checkType2Name',
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
      width: 160,
      fixed: 'right',
      render: (_, record) => {
        const links = [];
        links.push(
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
          </a>,
        );

        if (record.status !== 3) {
          links.push(
            <a
              key="cancel"
              onClick={() => {
                confirm({
                  title: '取消预约',
                  icon: <ExclamationCircleOutlined />,
                  content: (
                    <p>
                      是否取消<strong>{record.nickName}</strong>&nbsp;&nbsp;
                      <Moment format="YYYY/MM/DD">{record.orderDate}</Moment>
                      {record.orderTime === 1 ? '上午' : '下午'}的预约?
                    </p>
                  ),
                  okType: 'danger',
                  onOk() {
                    handleRemove(record.id).then(() => {
                      if (actionRef.current) {
                        actionRef.current.reload();
                      }
                    });
                  },
                });
              }}
            >
              取消预约
            </a>,
          );
        }

        if (record.needTyzk) {
          links.push(
            <a
              key="tyzk"
              onClick={() => {
                history.push(`/reserve/teamReserveInfo/${props.match.params.orderId}/record/${record.orderId}`);
              }}
            >
              培训记录
            </a>,
          );
        }

        return links;
      },
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.TeamReserveInfo, API.PageParams>
        headerTitle={
          <div className={styles.title_label}>
            <span>联系人： {teamInfo?.contactName}</span>
            <span className={styles.title_content}>联系电话： {teamInfo?.contactPhone}</span>
            <span className={styles.title_content}>
              预约时间：
              <Moment format="YYYY/MM/DD HH:mm">{teamInfo?.orderDate}</Moment>&nbsp;&nbsp;
              {teamInfo?.orderTime === 1 ? '上午 09:00-11:30' : '下午 13:30-17:00'}
            </span>
            <span className={styles.title_content}>团体名称：{teamInfo?.checkGroupName}</span>
          </div>
        }
        scroll={{ x: 1000 }}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolbar={{
          settings: [],
        }}
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
        loading={loading}
        params={{ ordersId: props.match.params.orderId }}
        request={fetchTeamReserveInfo}
        columns={columns}
        tableAlertRender={false}
      />
      <ModalForm
        title={'新建预约'}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        submitter={{
          searchConfig: {
            submitText: '提交',
          },
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}
        modalProps={{
          destroyOnClose: true,
          mask: true,
          maskClosable: true,
          centered: true,
          footer: null,
        }}
        // width="600px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (formData) => {
          const success = await handleAdd({ ...formData, ordersId: teamInfo.id });
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          name="nickName"
          placeholder={'请输入'}
          label="姓名"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
        <ProFormText
          placeholder={'请输入'}
          name="age"
          label="年龄"
          fieldProps={{
            maxLength: 2,
          }}
          rules={[
            {
              required: true,
              message: '必填项',
            },
            {
              required: false,
              pattern: new RegExp(/^[1-9]\d*$/, 'g'),
              message: '请输入数字',
            },
          ]}
        />

        <ProFormSelect
          initialValue={'0'}
          options={[
            {
              value: '0',
              label: '男',
            },
            {
              value: '1',
              label: '女',
            },
          ]}
          name="male"
          label="性别"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />

        <ProFormText
          placeholder={'请输入'}
          name="contactName"
          label="联系人"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />

        <ProFormText
          placeholder={'请输入'}
          name="contactPhone"
          label="联系电话"
          rules={[
            {
              required: true,
              message: '必填项',
            },
            {
              required: false,
              pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, 'g'),
              message: '请输入正确的手机号',
            },
          ]}
        />

        <ProFormText
          placeholder={'请输入'}
          name="card"
          label="身份证号码"
          rules={[
            {
              required: true,
              message: '必填项',
            },
            {
              required: false,
              pattern: new RegExp(
                /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                'g',
              ),
              message: '请输入正确的身份证号码',
            },
          ]}
        />
        {teamInfo && (
          <ProFormText
            label="检测时间"
            name="orderDate"
            initialValue={`${moment(new Date(teamInfo.orderDate)).format('YYYY/MM/DD')} ${
              teamInfo.orderTime === 1 ? '上午 09:00-11:30' : '下午 13:30-17:00'
            }`}
            readonly
          />
        )}
        {teamInfo && (
          <ProFormText
            label="检测点"
            name="orgAddr"
            initialValue={teamInfo.checkOrgName}
            readonly
          />
        )}
        <ProFormSelect
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
          request={async () => {
            const data = await rootCheckItems();
            return data.map((it) => ({ label: it.name, value: it.id }));
          }}
          name="checkType1"
          label="检测项目（一级）"
          fieldProps={{
            onChange: (value) => {
              if (value === 5) {
                setcCustomItem(true);
                setRootId(-1);
              } else if (value === 2 || value === 3) {
                setcCustomItem(false);
                setRootId(value);
              } else {
                setRootId(-1);
                setcCustomItem(false);
              }
            },
          }}
        />
        {rootId > 0 && (
          <ProFormSelect
            name="checkType2"
            label="检测项目（二级）"
            request={async () => {
              const data = await checkItems(rootId);
              return data.map((it) => ({ label: it.name, value: it.id }));
            }}
          />
        )}

        {customItem && (
          <ProFormSelect
            mode="multiple"
            name="checkItems"
            label="自选检测项目"
            request={async () => {
              const data = await customCheckItems();
              return data.map((it) => ({ label: it.name, value: it.id }));
            }}
          />
        )}

        <div style={{ marginLeft: '130px' }}>
          <Row>
            <Col span={6}>
              <span className={styles.title}>检测项目说明:</span>
            </Col>
            <Col>
              <span className={styles.label}>青少年身体形态、机能健康发育基础选材检测评估适用于6-9岁</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <Col>
              <span className={styles.label}>青少年身体机能健康成长初级选材检测评估适用于10-13岁</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <Col>
              <span className={styles.label}>青少年专项运动选材检测评估适用于14-17岁</span>
            </Col>
          </Row>
          <Row>
            <Col span={6}></Col>
            <Col>
              <span className={styles.label}>中小学生6-14岁请选择青少年身体形态、机能健康发育基础选材检测评估</span>
            </Col>
          </Row>
          <Row style={{ marginBottom: '10px' }}>
            <Col span={6}></Col>
            <Col>
              <span className={styles.label}>自选项目检测适用于任意年龄</span>
            </Col>
          </Row>
        </div>
      </ModalForm>

      <Card bordered={false} style={{ marginTop: '-16px' }}>
        <Divider />
        <Row justify="center">
          <Col>
            <Button
              type="primary"
              onClick={() => {
                history.goBack();
              }}
            >
              返回
            </Button>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default Reserve;
