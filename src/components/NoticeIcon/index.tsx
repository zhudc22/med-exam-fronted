import { useEffect, useState } from 'react';
import {  message } from 'antd';
import { groupBy } from 'lodash';
import { useRequest, history } from 'umi';
import { getNotices, unreadCount, updateReadStatus } from '@/services/notice';

import NoticeIcon from './NoticeIcon';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
};

const getNoticeData = (notices: API.Notice[]): Record<string, API.Notice[]> => {
  if (!notices || notices.length === 0 || !Array.isArray(notices)) {
    return {};
  }
  const newNotices = notices.map((notice) => {
    const newNotice = { ...notice };

    if (newNotice.id) {
      newNotice.key = newNotice.id;
    }

    // if (newNotice.isRead) {
    //   const color = {
    //     todo: '',
    //     processing: 'blue',
    //     urgent: 'red',
    //     doing: 'gold',
    //   }[newNotice.status];
    //   newNotice.extra = (
    //     <Tag
    //       color={color}
    //       style={{
    //         marginRight: 0,
    //       }}
    //     >
    //       {newNotice.extra}
    //     </Tag>
    //   ) as any;
    // }

    return newNotice;
  });
  return groupBy(newNotices, 'type');
};

const getUnreadData = (noticeData: Record<string, API.Notice[]>) => {
  const unreadMsg: Record<string, number> = {};
  Object.keys(noticeData).forEach((key) => {
    const value = noticeData[key];

    if (!unreadMsg[key]) {
      unreadMsg[key] = 0;
    }

    if (Array.isArray(value)) {
      unreadMsg[key] = value.filter((item) => item.isRead === 0).length;
    }
  });
  return unreadMsg;
};

const NoticeIconView = () => {
  const [notices, setNotices] = useState<API.Notice[]>([]);

  const { data: count } = useRequest(unreadCount);
  const { data, loading } = useRequest(getNotices, {
    formatResult: (res) => {
      return res.data?.map(it => ({ ...it, type: "notification" }));
    },
  });
  useEffect(() => {
    setNotices(data);
  }, [data]);

  const noticeData = getNoticeData(notices);
  const unreadMsg = getUnreadData(noticeData || {});

  const handleUpdateStatus = async (id: number) => {
    const hide = message.loading('正在更新');
    try {
      await updateReadStatus(id);
      hide();
      return true;
    } catch (error) {
      hide();
      return false;
    }
  };
  
  const changeReadState = (id: number) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.id === id) {
          notice.isRead = 1;
          handleUpdateStatus(id);
        }
        return notice;
      }),
    );
  };

  const clearReadState = (title: string, key: string) => {
    setNotices(
      notices.map((item) => {
        const notice = { ...item };
        if (notice.type === key) {
          notice.isRead = 1;
        }
        return notice;
      }),
    );
    message.success(`${'清空了'} ${title}`);
  };

  return (
    <NoticeIcon
      className={styles.action}
      count={count}
      onItemClick={(item) => {
        changeReadState(item.id!);
      }}
      onClear={(title: string, key: string) => clearReadState(title, key)}
      loading={loading}
      clearText="清空"
      viewMoreText="查看更多"
      onViewMore={() => {
        if (history.location.pathname === '/account/center') {
          history.replace('/account/center?key=notification')
        } else {
          history.push('/account/center?key=notification')
        }
      }}
      clearClose
    >
      <NoticeIcon.Tab
        tabKey="notification"
        count={unreadMsg.notification}
        list={noticeData.notification}
        title="通知"
        emptyText="你已查看所有通知"
        showViewMore
      />
      <NoticeIcon.Tab
        tabKey="message"
        count={0}
        list={noticeData.message}
        title="消息"
        emptyText="您已读完所有消息"
        showViewMore
      />
    </NoticeIcon>
  );
};

export default NoticeIconView;
