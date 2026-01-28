import { Col, Layout, Row } from "antd";
import LanguageSwitcher from "../buttons/LanguageSwitcher";
import { LoginTitle } from "../typography/LoginTitle";
import { ProfileMenu } from "../buttons/ProfileMenu";

const { Header } = Layout;
//TODO: set as username
const ContentHeader = () => {
  return (
    <Header className="min-h-[52px] place-content-center" style={{paddingLeft: '40px', paddingRight: '40px'}}>
      <Row className="items-center">
        <Col span={8}>
          <LoginTitle color="white" />
        </Col>
        <Col span={8} offset={8}>
          <div className="flex justify-end items-center gap-3">
            <LanguageSwitcher />
            <ProfileMenu username="Amanda Wats" />
          </div>
        </Col>
      </Row>
    </Header>
  );
};

export default ContentHeader;
