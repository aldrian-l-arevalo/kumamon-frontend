import { Outlet } from "react-router-dom";
import { Layout as AntLayout } from "antd";
import ContentHeader from "./ContentHeader";

const Layout = () => {
  const { Content } = AntLayout;

  return (
    <div className="min-h-screen">
      <AntLayout className="min-h-[100vh]">
        <ContentHeader />
        <AntLayout>
          <Content className="bg-[#FAFAFA]">
            <div >
              <Outlet />
            </div>
          </Content>
        </AntLayout>
      </AntLayout>
    </div>
  );
};

export default Layout;
