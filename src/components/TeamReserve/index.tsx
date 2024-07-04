import TreeSelect from '@/components/TreeSelect';
import { teamReserve } from '@/services/reserve';
import { org2Option, queryByParentId } from '@/services/org';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { DatePicker, Select, message, Upload, Button } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { currentUser } from '@/services/user';
import styles from './index.less';
import { useEffect } from 'react';


const TeamReserveForm: React.FC = ({ callback }) => {

  const [orderTime, setOrderTime] = useState();
  const [orderDay, setOrderDay] = useState();
  const [submitting, setSubmitting] = useState(false);
  const [template, setTemplate] = useState();
  const [manager, setManager] = useState(false);
  const [isOperator, setIsOperator] = useState(false);
  const [currentOrg, setCurrentOrg] = useState({});

  useEffect(() => {
    currentUser().then(resp => {
      resp.data.roles.forEach(role => {
        if (role.code === 'OPERATOR') {
          setIsOperator(true);
        } else {
          setIsOperator(false);
        }
        if (role.code === 'ADMIN' || role.code === 'OPERATOR') {
          setManager(true);
        }
      })
      setCurrentOrg({ orgId: resp.data.checkOrgId, orgName: resp.data.checkOrgName });
    })
  }, [0]);

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
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

        if (!isOperator) {
          values.checkOrgId = values.parentId[values.parentId.length - 1];
        } else {
          values.checkOrgId = currentOrg.orgId;
          values.parentId = undefined;
        }

        if (!template) {
          message.error('请上传团队报名模版');
          return;
        }
        values.template = template;

        teamReserve(values).then((resp) => {
          if (resp.success) {
            callback(true);
          } else {
            message.error(`预约异常:${resp.errorMessage}`);
          }
          setSubmitting(false);
        });
      }}
    >
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
      {manager && (
        <ProFormText
          placeholder={'请输入'}
          name="mark"
          label="团队标识"
          rules={[
            {
              required: true,
              message: '必填项',
            },
          ]}
        />
      )}

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
      {isOperator && currentOrg.orgName !== undefined && (
        <ProFormText
          name="parentId"
          label="检测点"
          initialValue={currentOrg.orgName}
          readonly
        />
      )}
      <ProForm.Item
        label="预约模版"
        name="parentId"
        rules={[
          {
            required: true,
            message: '必填项',
          },
        ]}
      >
        <Upload
          accept={
            '.xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
          }
          maxCount={1}
          onChange={(file) => {
            setTemplate(file.file);
          }}
          customRequest={(option) => {
            option.onSuccess('');
          }}
        >
          <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
        <div className={styles.upload_label}>
          上传受测者信息，支持扩展名：xls{' '}
          <a href="./team_reserve_template.xlsx" download="团队模版.xlsx">
            （团队预约模版）
          </a>
          <a href="./school_reserve_template.xlsx" download="体育中考.xlsx">
            （体育中考模版）
          </a>
        </div>
      </ProForm.Item>
    </ProForm>
  );
};

export default TeamReserveForm;
