import { currentUser } from '@/services/user';
import React, { useEffect } from 'react';
import { history } from 'umi';

const Redirector: React.FC = () => {

  useEffect(() => {
    currentUser().then(resp => {
      const isGroup = resp.data.roles.find(role => role.code === 'GROUP');
      if (isGroup) {
        history.push(`/doReserveTeam`);
      } else {
        history.push(`/doReserve`);
      }
    })
  }, []);

  return (
    <div></div>
  );
};

export default Redirector;
