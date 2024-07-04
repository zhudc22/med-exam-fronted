import { DefaultFooter } from '@ant-design/pro-layout';
import styles from './index.less';

export default (props) => {
  const defaultMessage = '生命力康（天津）运动科技有限公司 All rights reserved.津ICP备2021007455号';
  return (
    <>
      {props.children}
      <DefaultFooter
        copyright={`2024 ${defaultMessage}`}
        links={false}
        className={styles.customFooter}
      />
    </>
  );
};
