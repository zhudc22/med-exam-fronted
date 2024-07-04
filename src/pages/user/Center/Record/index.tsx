import React, { useRef, useState } from 'react';
import { useParams, useModel, history, useRequest } from 'umi';
import { Button, Card, Row, Col, Divider, message, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProForm, { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { queryInfoByOrderId } from '@/services/orderinfo';
import { read, add, remove } from '@/services/record';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';

import styles from '../index.less';

const { confirm } = Modal;

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */

const handleAdd = async (fields: API.TrainingRecord) => {
  const hide = message.loading('正在添加');
  try {
    await add(fields);
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const handleRemove = async (selectedRows: API.TrainingRecord[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await remove(selectedRows.map((row) => row.id));
    hide();
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

const Page: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { initialState } = useModel('@@initialState');

  const [createModalVisible, handleModalVisible] = useState<boolean>(false);

  const { data: orderInfo, loading } = useRequest(() => queryInfoByOrderId(id));
  const actionRef = useRef<ActionType>();

  const { currentUser } = initialState || {};
  if (currentUser === undefined) {
    history.push('/');
    return undefined;
  }
  const isUser = currentUser.roles.length === 1 && currentUser.roles[0].code === 'USER';


  const maleItems: ProColumns<API.TrainingRecord>[] = [
    {
      children: [
        {
          title: '时间',
          dataIndex: 'updateTime',
          valueType: 'date',
        },
      ],
    },
    {
      title: '必选项',
      children: [
        {
          title: '1000米跑(分’秒”)',
          dataIndex: 'yymp',
        },
        {
          title: '分数',
          dataIndex: 'yympScore',
        },
      ],
    },
    {
      title: '三选一',
      children: [
        {
          title: '引体向上(次)',
          dataIndex: 'ytxs',
        },
        {
          title: '分数',
          dataIndex: 'ytxsScore',
        },
        {
          title: '50米跑(秒)',
          dataIndex: 'wsmp',
        },
        {
          title: '分数',
          dataIndex: 'wsmpScore',
        },
        {
          title: '立定跳远(厘米)',
          dataIndex: 'ldty',
        },
        {
          title: '分数',
          dataIndex: 'ldtyScore',
        },
      ],
    },
    {
      title: '四选一',
      children: [
        {
          title: '足球绕杆(秒)',
          dataIndex: 'zqrg',
        },
        {
          title: '分数',
          dataIndex: 'zqrgScore',
        },
        {
          title: '篮球红杆(秒)',
          dataIndex: 'lqrg',
        },
        {
          title: '分数',
          dataIndex: 'lqrgScore',
        },
        {
          title: '排球正面双手垫球(次)',
          dataIndex: 'pq',
        },
        {
          title: '分数',
          dataIndex: 'pqScore',
        },
        {
          title: '乒乓球(次)',
          dataIndex: 'ppq',
        },
        {
          title: '分数',
          dataIndex: 'ppqScore',
        },
      ],
    },
    {
      children: [
        {
          title: '总数',
          dataIndex: 'score',
          key:'score',
        },
      ],
    },
    {
      children: [
        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          render: (_, record) => {
            const options = [];
            if (!isUser) {
              options.push(
                <a
                  key="del"
                  onClick={() => {
                    confirm({
                      title: '删除',
                      icon: <ExclamationCircleOutlined />,
                      content: (
                        <p>
                          是否删除
                          <strong>{new Date(record.createTime).toLocaleDateString()}的记录</strong>?
                        </p>
                      ),
                      okType: 'danger',
                      onOk() {
                        handleRemove([record]).then(() => {
                          if (actionRef.current) {
                            actionRef.current.reload();
                          }
                        });
                      },
                    });
                  }}
                >
                  删除
                </a>,
              );
            } else {
              options.push(
                <span
                  key="del"
                  style={{ cursor: 'not-allowed', textDecoration: 'none', opacity: 0.5 }}
                >
                  删除
                </span>,
              );
            }
            return options
          },
        },
      ],
    },
  ];

  const femaleItems: ProColumns<API.TrainingRecord>[] = [
    {
      children: [
        {
          title: '时间',
          dataIndex: 'updateTime',
          key:'updateTime',
          valueType: 'date',
        },
      ],
    },
    {
      title: '必选项',
      children: [
        {
          title: '800米跑(分’秒”)',
          dataIndex: 'bbmp',
          key:'bbmp',
        },
        {
          title: '分数',
          dataIndex: 'bbmpScore',
          key:'bbmpScore',
        },
      ],
    },
    {
      title: '三选一',
      children: [
        {
          title: '1分钟仰卧起坐(次)',
          dataIndex: 'ywqz',
          key:'ywqz',
        },
        {
          title: '分数',
          dataIndex: 'ywqzScore',
          key:'ywqzScore',
        },
        {
          title: '50米跑(秒)',
          dataIndex: 'wsmp',
          key:'wsmp',
        },
        {
          title: '分数',
          dataIndex: 'wsmpScore',
          key:'wsmpScore',
        },
        {
          title: '立定跳远(厘米)',
          dataIndex: 'ldty',
          key:'ldty',
        },
        {
          title: '分数',
          dataIndex: 'ldtyScore',
          key:'ldtyScore',
        },
      ],
    },
    {
      title: '四选一',
      children: [
        {
          title: '足球绕杆(秒)',
          dataIndex: 'zqrg',
          key:'zqrg',
        },
        {
          title: '分数',
          dataIndex: 'zqrgScore',
          key:'zqrgScore',
        },
        {
          title: '篮球红杆(秒)',
          dataIndex: 'lqrg',
          key:'lqrg',
        },
        {
          title: '分数',
          dataIndex: 'lqrgScore',
          key:'lqrgScore',
        },
        {
          title: '排球正面双手垫球(次)',
          dataIndex: 'pq',
          key:'pq',
        },
        {
          title: '分数',
          dataIndex: 'pqScore',
          key:'pqScore',
        },
        {
          title: '乒乓球(次)',
          dataIndex: 'ppq',
          key:'ppq',
        },
        {
          title: '分数',
          dataIndex: 'ppqScore',
          key:'ppqScore',
        },
      ],
    },
    {
      children: [
        {
          title: '总数',
          dataIndex: 'score',
          key:'score',
        },
      ],
    },
    {
      children: [
        {
          title: '操作',
          dataIndex: 'option',
          key: 'option',
          valueType: 'option',
          render: (_, record) => {
            const options = [];
            if (!isUser) {
              options.push(
                <a
                  key="del"
                  onClick={() => {
                    confirm({
                      title: '删除',
                      icon: <ExclamationCircleOutlined />,
                      content: (
                        <p>
                          是否删除
                          <strong>{new Date(record.createTime).toLocaleDateString()}的记录</strong>?
                        </p>
                      ),
                      okType: 'danger',
                      onOk() {
                        handleRemove([record]).then(() => {
                          if (actionRef.current) {
                            actionRef.current.reload();
                          }
                        });
                      },
                    });
                  }}
                >
                  删除
                </a>,
              );
            } else {
              options.push(
                <span
                  key="del"
                  style={{ cursor: 'not-allowed', textDecoration: 'none', opacity: 0.5 }}
                >
                  删除
                </span>,
              );
            }
            return options
          },
        },
      ],
    },
  ];

  let columns;
  if (orderInfo === undefined) {
    columns = maleItems;
  } else {
    columns = orderInfo.male === 0 ? maleItems : femaleItems
  }

  return (
    <PageContainer>
      {!loading && (
        <ProTable<API.TrainingRecord, API.PageParams>
          headerTitle={orderInfo.nickName}
          style={{ height: '100%' }}
          actionRef={actionRef}
          rowKey="id"
          search={false}
          toolbar={{
            settings: [],
            multipleLine: true,
          }}
          toolBarRender={() => {
            const buttons = [];
            if (!isUser) {
              buttons.push(
                <Button
                  type="primary"
                  key="add"
                  onClick={() => {
                    handleModalVisible(true);
                  }}
                >
                  <PlusOutlined /> 添加
                </Button>,
              );
            }
            return buttons;
          }}
          request={read}
          params={{ id }}
          columns={columns}
          tableAlertRender={false}
          rowSelection={false}
          pagination={false}
        />
      )}
      {!loading && (
        <ModalForm
          title={'添加'}
          modalProps={{
            destroyOnClose: true,
          }}
          initialValues={{
            name: orderInfo.nickName,
            sex: orderInfo.male === 0 ? '男' : '女',
            phone: orderInfo.contactPhone,
            card: orderInfo.card,
          }}
          layout="horizontal"
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const success = await handleAdd({
              orderId: id,
              yymp: value.yymp,
              bbmp: value.bbmp,
              [value.three]: value.input,
              [value.four]: value.input2,
            } as API.TrainingRecord);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProForm.Group>
            <ProFormText label="姓名" name="name" readonly />
            <ProFormText label="性别" name="sex" readonly />
            <ProFormText label="联系电话" name="phone" readonly />
            <ProFormText label="身份证号" name="card" readonly />
          </ProForm.Group>
          {orderInfo.male === 0 && (
            <>
              <ProFormText
                label="1000米跑(分’秒”)"
                name="yymp"
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                ]}
                width="sm"
              />
              <Row>
                <Col span={8}>
                  <ProFormSelect
                    label="三选一"
                    name="three"
                    placeholder="请选择项目"
                    allowClear={true}
                    rules={[
                      {
                        required: true,
                        message: '必填项',
                      },
                    ]}
                    options={[
                      {
                        label: '引体向上',
                        value: 'ytxs',
                      },
                      {
                        label: '50米跑',
                        value: 'wsmp',
                      },
                      {
                        label: '立定跳远',
                        value: 'ldty',
                      },
                    ]}
                  />
                </Col>
                <Col span={1}></Col>
                <Col>
                  <ProFormText
                    name="input"
                    rules={[
                      {
                        required: true,
                        message: '必填项',
                      },
                    ]}
                    width="sm"
                  />
                </Col>
              </Row>
            </>
          )}
          {orderInfo.male === 1 && (
            <>
              <ProFormText
                label="800米跑(分’秒”)"
                name="bbmp"
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                ]}
                width="sm"
              />
              <Row>
                <Col span={8}>
                  <ProFormSelect
                    label="三选一"
                    name="three"
                    placeholder="请选择项目"
                    rules={[
                      {
                        required: true,
                        message: '必填项',
                      },
                    ]}
                    options={[
                      {
                        label: '1分钟仰卧起坐',
                        value: 'ywqz',
                      },
                      {
                        label: '50米跑',
                        value: 'wsmp',
                      },
                      {
                        label: '立定跳远',
                        value: 'ldty',
                      },
                    ]}
                  />
                </Col>
                <Col span={1}></Col>
                <Col>
                  <ProFormText
                    name="input"
                    rules={[
                      {
                        required: true,
                        message: '必填项',
                      },
                    ]}
                    width="sm"
                  />
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col span={8}>
              <ProFormSelect
                label="四选一"
                name="four"
                placeholder="请选择项目"
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                ]}
                options={[
                  {
                    label: '足球运球绕杆',
                    value: 'zqrg',
                  },
                  {
                    label: '篮球运球绕杆',
                    value: 'lqrg',
                  },
                  {
                    label: '排球正面双手垫球',
                    value: 'pq',
                  },
                  {
                    label: '乒乓球正手攻球',
                    value: 'ppq',
                  },
                ]}
              />
            </Col>
            <Col span={1}></Col>
            <Col>
              <ProFormText
                name="input2"
                rules={[
                  {
                    required: true,
                    message: '必填项',
                  },
                ]}
                width="sm"
              />
            </Col>
          </Row>
        </ModalForm>
      )}
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

export default Page;
