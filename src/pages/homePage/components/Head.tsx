import { useState, useEffect } from 'react';
import '@/pages/homePage/MyRouteStyles.less';
const Head = ({ imgs }) => {
  const [nickname, setNickname] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('authority');
    if (token) {
      setLoading(true);
      fetch('/api/sys/user/info', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
        .then((resp) => resp.json())
        .then((body) => {
          if (body.success) {
            setNickname(body.data.nickName);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Failed to authenticate:', error);
        });
    }
  }, []);

  return (
    <div>
      <div className="topbox">
        <div className="mainbox">
          <div className="indexlogo">
            <img src={imgs.logo} alt="Logo" />
          </div>
          {loading && !nickname && <div className="loginbox">&nbsp;-&nbsp;</div>}
          {!loading && nickname && (
            <div className="loginbox">
              <a href="/medexam/account/center" className="gerenzhongxin">
                个人中心
              </a>
            </div>
          )}
          {!loading && !nickname && (
            <div className="toplogin">
              <div className="loginbox">
                <a href="/medexam/user/login?from=%2F&redirect=%2Findex%2Ehtml">登录</a> /{' '}
                <a href="/medexam/user/register?from=%2F&redirect=%2Findex%2Ehtml">注册</a>
              </div>
            </div>
          )}
          <div className="menubox">
            <ul>
              <li>
                <a href="/">首页</a>
              </li>
              <li>
                <a href="/home/introduction">项目介绍</a>
              </li>
              <li>
                <a href="jiancexiangmu.html">检测项目</a>
              </li>
              <li>
                <a href="shebeijieshao.html">设备介绍</a>
              </li>
              <li>
                <a href="shouquanxinxi.html">授权信息</a>
              </li>
              <li>
                <a href="gongsijieshao.html">公司介绍</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="cls" />
      </div>
    </div>
  );
};
export default Head;
