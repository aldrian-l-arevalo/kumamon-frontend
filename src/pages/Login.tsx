import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Form, Row, Col } from "antd";
import type { LoginFormValues } from "../types";
import LoginHeader from "../components/layout/LoginHeader";
import { LoginTitle } from "../components/typography/LoginTitle";
import { StyledInput } from "../components/input/StyledInput";
import { StyledPasswordInput } from "../components/input/StyledPasswordInput";
import { StyledButton } from "../components/buttons/StyledButton";
import { StyledTypographyLink } from "../components/typography/StyledTypographyLink";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const { Content } = Layout;

  const onFinish = (values: LoginFormValues) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    setLoading(false);
    navigate("/ip-select");
  };

  const troubleSignInText = "Trouble signing in?";
  const signInText = "Sign in";
  return (
    <div className="min-h-screen">
      <Layout className="min-h-[100vh]">
        <LoginHeader />
        <Layout>
          <Content className="px-4 mt-[-64px] bg-[#FAFAFA]">
            <div
              className="min-h-screen content-center place-items-center"
              style={{ textAlign: "-webkit-center" }}
            >
              <Row gutter={[16, 48]}>
                <Col span={24}>
                  <LoginTitle />
                </Col>
                <Col span={24}>
                  <Form<LoginFormValues>
                    layout="vertical"
                    name="login"
                    className="max-w-[366px]"
                    initialValues={{ remember: true }}
                    requiredMark={false}
                    onFinish={onFinish}
                  >
                    <Form.Item
                      name="email"
                      rules={[
                        { required: true, message: "Email is required" },
                        { type: "email", message: "Enter a valid email" },
                      ]}
                    >
                      <StyledInput placeholder="Email" allowClear />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        { required: true, message: "Password is required" },
                      ]}
                    >
                      <StyledPasswordInput placeholder="Password" />
                    </Form.Item>
                    <StyledButton htmlType="submit" block loading={loading}>
                      {signInText}
                    </StyledButton>
                  </Form>
                  <StyledTypographyLink
                    className="mt-8"
                    txtColor="#AFAFAF"
                    onClick={() => navigate("/login")}
                  >
                    {troubleSignInText}
                  </StyledTypographyLink>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Login;
