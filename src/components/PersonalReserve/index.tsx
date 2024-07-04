import React, { useState } from 'react';
import { useModel, history } from 'umi';
import { DatePicker, Select, message, Row, Col } from 'antd';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import moment from 'moment';
import TreeSelect from '@/components/TreeSelect';
import { rootCheckItems, customCheckItems, checkItems } from '@/services/checkItems';
import { personalReserve } from '@/services/reserve';
import { org2Option, queryByParentId } from '@/services/org';

import styles from './index.less';

const PersonalReserveForm: React.FC = ({ callback }) => {

  const [customItem, setcCustomItem] = useState<boolean>(false);
  const [rootId, setRootId] = useState<number>(-1);

  const [orderTime, setOrderTime] = useState();
  const [orderDay, setOrderDay] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [checkTypewOptions, setCheckTypeOptions] = useState();

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};

  const isOperator = currentUser.roles.length === 1 && currentUser.roles[0].code === 'OPERATOR';


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  
  const checkType1Change = async(value) => {
    if (value === 5) {
      setcCustomItem(true);
      setRootId(-1);
    } else if (value === 2 || value === 3) {
      setcCustomItem(false);
      setRootId(value);
      const its = await checkItems(value);
      let res = [];
      its.forEach((item) => {
        res.push({ label: item.name, value: item.id });
      });
     setCheckTypeOptions(res);
    } else {
      setRootId(-1);
      setcCustomItem(false);
    }
  };

  return (
    <ProForm
      {...formItemLayout}
      layout={'horizontal'}
      submitter={{
        searchConfig: {
          submitText: '提交',
        },
        render: (_, dom) => dom.pop(),
        submitButtonProps: {
          size: 'large',
          loading: submitting,
          style: {
            width: '100%',
          },
        },
      }}
      onFinish={async (values) => {
        if (!orderDay) {
          message.error('请选择检测日期');
          return;
        }
        values.orderDate = orderDay;
        if (!orderTime) {
          message.error('请选择检测时间段');
          return;
        }
        values.orderTime = orderTime;

        if (values.checkType1 === 3 && !values.checkType2) {
          message.error('请选择检测项目（二级）');
          return;
        }

        if (values.checkType1 === 5 && (!values.checkItems || values.checkItems.length === 0)) {
          message.error('请选择自选检测项目');
          return;
        }

        if (values.checkType1 === 5 && values.checkItems.length > 0) {
          const items = [];
          values.checkItems.forEach((item) => {
            items.push({ id: item });
          });
          values.checkItems = items;
        }

        if (!isOperator) {
          values.checkOrgId = values.parentId[values.parentId.length - 1];
        } else {
          values.checkOrgId = currentUser.checkOrgId;
        }

        setSubmitting(true);
        personalReserve(values).then((resp) => {
          if (resp) {
            callback(true);
          } else {
            message.error('预约异常请稍后再试');
          }
          setSubmitting(false);
        });
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

      <ProForm.Item
        label="检测时间"
        required
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder="请选择"
          allowClear={false}
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
            setOrderDay(date.unix() * 1000);
          }}
        />

        <Select
          style={{ width: '100%', marginTop: '20px' }}
          placeholder="预约时间段"
          onChange={(value) => {
            setOrderTime(value);
          }}
        >
          <Select.Option value="1">上午 9:00-11:30</Select.Option>
          <Select.Option value="2">下午 13:30 - 17:00</Select.Option>
        </Select>
      </ProForm.Item>

      {!isOperator && (
        <ProForm.Item
          label="检测点"
          name="parentId"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        >
          <TreeSelect fetchByParentId={queryByParentId} item2Option={org2Option} />
        </ProForm.Item>
      )}
      {isOperator && (
        <ProFormText
          label="检测点"
          name='checkOrgName'
          initialValue={currentUser.checkOrgName}
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
          const res = [];
          data.map((item) => {
            if (item.code !== 'TiYuZhongKao') {
              res.push({ label: item.name, value: item.id });
            }
          });
          return res;
        }}
        name="checkType1"
        label="检测项目（一级）"
        fieldProps={{
          onChange: (value) => {
            checkType1Change(value);
          },
        }}
      />
      {rootId > 0 && (
        <ProFormSelect
          name="checkType2"
          label="检测项目（二级）"
          options={checkTypewOptions}
          // request={async () => {
          //   const data = await checkItems(rootId);
          //   const res = [];
          //   data.map((item) => {
          //     res.push({ label: item.name, value: item.id });
          //   });
          //   return res;
          // }}
        />
      )}

      {customItem && (
        <ProFormSelect
          mode="multiple"
          name="checkItems"
          label="自选检测项目"
          request={async () => {
            const data = await customCheckItems();
            const res = [];
            data.map((item) => {
              res.push({ label: item.name, value: item.id });
            });
            return res;
          }}
        />
      )}

      <div style={{ marginLeft: '130px' }}>

        <Row>
          <Col span={6}>
            <span className={styles.title}>检测项目说明:</span>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col>
            <span className={styles.label}>青少年身体形态、机能健康发育基础选材检测评估适用于6-9岁</span>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col>
            <span className={styles.label}>青少年身体机能健康成长初级选材检测评估适用于10-13岁</span>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col>
            <span className={styles.label}>青少年专项运动选材检测评估适用于14-17岁</span>
          </Col>
        </Row>
        <Row>
          <Col span={2}></Col>
          <Col>
            <span className={styles.label}>中小学生6-14岁请选择青少年身体形态、机能健康发育基础选材检测评估</span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={2}></Col>
          <Col>
            <span className={styles.label}>自选项目检测适用于任意年龄</span>
          </Col>
        </Row>
      </div>
    </ProForm>
  );
};

export default PersonalReserveForm;
