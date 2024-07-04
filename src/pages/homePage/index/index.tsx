import '@/pages/homePage/MyRouteStyles.less';
import slogan from '@/pages/homePage/images/slogan.png';
import background from '@/pages/homePage/images/indexbg.jpg';
import Head from '@/pages/homePage/components/Head';
import logo from '@/pages/homePage/images/logo.png';

const CompanyPage = () => {
  const pageStyle = {
    background: `url(${background}) no-repeat center top fixed`,
    backgroundSize: 'cover',
    OBackgroundSize: 'cover',
    WebkitBackgroundSize: 'cover',
    width: '100%',
    height: '100%',
  };
  return (
    <div style={pageStyle}>
      <Head imgs={{ logo }} />
      <div className="mainbox">
        <div className="sloganbox">
          <div className="slogan">
            <img src={slogan} alt="Slogan" />
            <div className="yuyue">
              <a href="/medexam/reverseRedirect">立即预约</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
