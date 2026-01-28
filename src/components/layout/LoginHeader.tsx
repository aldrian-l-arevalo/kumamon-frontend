import { Layout } from "antd";
import LanguageSwitcher from "../buttons/LanguageSwitcher";

const { Header } = Layout;

const LoginHeader = () => {
  return (
    <Header style={{ backgroundColor: "#FAFAFA" }}>
      <div className="text-right">
        <LanguageSwitcher />
      </div>
    </Header>
  );
};

export default LoginHeader;
