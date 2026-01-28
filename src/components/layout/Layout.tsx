import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import ContentHeader from "./ContentHeader";
import Sider from "antd/es/layout/Sider";
import ResultsPane from "./ResultsPane";

const Layout = () => {
  const { Content } = AntLayout;
  const siderStyle: React.CSSProperties = {
    textAlign: "center",
    lineHeight: "120px",
    color: "#fff",
    backgroundColor: "#F5F5F5",
  };

  return (
    <div className="min-h-screen">
      <AntLayout className="min-h-[100vh]">
        <ContentHeader />
        <AntLayout>
          <Content className="bg-[#FAFAFA]">
            <div className="p-[32px] min-h-[calc(100vh-65px)]">
              <Outlet />
            </div>
          </Content>
          {/* <Sider width="30%" style={siderStyle}>
            <ResultsPane />
          </Sider> */}
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
