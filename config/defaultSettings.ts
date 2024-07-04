// import { Settings as LayoutSettings } from '@ant-design/pro-layout';
//
// const Settings: LayoutSettings & {
//   pwa?: boolean;
//   logo?: string;
// } = {
//   navTheme: 'light',
//   // 拂晓蓝
//   // primaryColor: '#1890ff',
//   primaryColor: '#E6442A',
//   layout: 'mix',
//   contentWidth: 'Fluid',
//   fixedHeader: false,
//   fixSiderbar: true,
//   colorWeak: false,
//   title: '检测平台',
//   pwa: false,
//   logo: '/img/logo-white.png',
//   iconfontUrl: '',
// };
//
// export default Settings;

import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'dark', // 导航栏主题，深色主题
  primaryColor: '#1890ff', // 主要颜色，使用鲜艳的蓝色
  layout: 'mix', // 布局类型，保持混合菜单
  contentWidth: 'Fixed', // 内容宽度，使用定宽布局
  fixedHeader: true, // 固定头部
  fixSiderbar: true, // 固定侧边菜单
  colorWeak: false, // 不开启色弱模式
  title: '检测平台', // 网站标题
  pwa: true, // 启用 PWA
  logo: '/img/logo-white.png',
  iconfontUrl: '', // iconfont 地址
};

export default Settings;
