import React, { useState, useEffect } from 'react';
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Card, Row, Col, message, Upload, Modal } from 'antd';
import ProForm, { ProFormSelect } from '@ant-design/pro-form';
import { getAccessToken } from '@/utils/authority';
import { getBase64 } from '@/utils/str';
import { save, reports, remove } from '@/services/jzwq';

const { confirm } = Modal;

export type Props = {
  loading?: boolean;
  data?: API.Jzwq;
  orderId: string;
  readonly?: boolean;
};

const Page: React.FC<Props> = (props) => {
  const { loading, data, orderId, readonly } = props;

  const [form] = Form.useForm();
  if (!loading) {
    form.setFieldsValue(data);
  }
  const doSubmit = async (values) => {
    const resp = await save({ ...values, orderId });
    if (resp.success) {
      message.success('保存成功');
    } else {
      message.error('保存失败');
    }
    return resp.success;
  };

  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [previewTitle, setPreviewTitle] = useState<string>();
  const [fileList, setFileList] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const { success, data: reportFiles } = await reports(orderId);
      if (success) {
        setFileList(
          reportFiles.map((it) => ({
            id: it.id,
            uid: it.id,
            name: it.name,
            url: it.url,
            lastModified: it.updateTime,
          })),
        );
      }
    };
    fetchData();
  }, [orderId]);

  const handleChange = info => {
    const { fileList: newFileList } = info;

    if (info.file.status === 'uploading') {
      setFileList([...newFileList]);
      return;
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
      setFileList([...newFileList]);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    } else if (info.file.status === 'removed') {
      confirm({
        title: '删除报告',
        icon: <ExclamationCircleOutlined />,
        content: (
          <p>
            是否删除<strong>{info.file.name}</strong>?
          </p>
        ),
        okType: 'danger',
        onOk() {
          let fileId = info.file.id;
          if (fileId === undefined) {
            fileId = info.file.response?.data[0]?.id;
          }
          if (fileId === undefined) {
            message.error(`${info.file.name} 删除失败.`);
            return;
          }
          remove(fileId).then((resp) => {
            if (resp.success) {
              message.success(`${info.file.name} 删除成功`);
              setFileList([...newFileList]);
            } else {
              message.error(`${info.file.name} 删除失败,${resp.errorMessage}.`);
            }
          });
        },
        onCancel() { },
      });
    }
  };
  const handleCancel = () => setPreviewVisible(false);
  const handlePreview = async (file) => {
    let previewData = file.url;
    if (!file.url && !file.preview) {
      previewData = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreview(previewData);
    setPreviewTitle(file.name);
  };

  return (
    <Card bordered={false} size="small">
      <ProForm
        form={form}
        layout="vertical"
        // labelCol={{ span: 6 }}
        hideRequiredMark
        submitter={{
          searchConfig: {
            submitText: '保存',
          },
          submitButtonProps: { style: { float: 'right' }, disabled: readonly },
          resetButtonProps: false,
        }}
        onFinish={doSubmit}
      // onFinishFailed={onFinishFailed}
      >
        <Row gutter={16} justify="center">
          <Col span={24}>
            <Upload
              accept={'.png,.jpg,.jpeg'}
              action={`/api/check/check-spinal-files-po/upload?orderId=${orderId}`}
              headers={{ Authorization: getAccessToken() }}
              listType="picture-card"
              onPreview={handlePreview}
              fileList={fileList}
              onChange={handleChange}
              multiple={true}
              maxCount={3}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>上传文件</div>
              </div>
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              onCancel={handleCancel}
              footer={null}
            >
              <img style={{ width: '100%' }} src={preview} />
            </Modal>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <ProFormSelect
              placeholder="请选择"
              label="评估结果"
              name="report"
              request={async () => [
                { label: '正常', value: 0 },
                { label: '一级异常', value: 1 },
                { label: '二级异常', value: 2 },
                { label: '三级异常', value: 3 },
              ]}
              rules={[
                {
                  required: true,
                  message: '必选项',
                },
              ]}
              width="sm"
            />
          </Col>
        </Row>
      </ProForm>
    </Card>
  );
};

export default Page;
