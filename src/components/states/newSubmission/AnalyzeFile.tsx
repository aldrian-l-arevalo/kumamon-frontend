import { Col, Row, Form, Select, ConfigProvider, Card } from "antd";
import type { FileAnalysisProps, UploadFileDetails } from "../../../types";
import { StyledInput } from "../../input/StyledInput";
import { StyledButton } from "../../buttons/StyledButton";
import StatesHeader from "./StatesHeader";
import { useEffect } from "react";

const { Item } = Form;

const AnalyzeFile: React.FC<FileAnalysisProps> = ({ file, onFileAnalysis }) => {
  const [form] = Form.useForm<UploadFileDetails>();
  const customTheme = {
    components: {
      Button: {
        borderRadius: 52,
        controlHeight: 52,
      },
      Select: {
        borderRadius: 20,
        controlHeight: 52,
        colorBgContainer: "#8383831F",
        colorBorder: "transparent",
        colorPrimaryHover: "transparent",
        colorPrimary: "transparent",
        borderRadiusLG: 20,
      },
    },
  };

  const options = [
    { label: "Packaging", value: "packaging" },
    { label: "Category B", value: "categoryB" },
    { label: "Category C", value: "categoryC" },
  ];

  useEffect(() => {
    form.setFieldsValue({
      fileName: file.name,
      productCategory: "packaging",
    });
  }, [file, form]);

  const onFinish = (values: UploadFileDetails) => {
    const fileMeta = {
      name: file.name,
      type: file.type,
      sizeBytes: file.size,
      sizeKB: +(file.size / 1024).toFixed(2),
      lastModified: new Date(file.lastModified).toISOString(),
    };
    console.log("Uploaded file meta:", fileMeta);
    console.log("Form values:", values);
    onFileAnalysis(JSON.parse('{"test": "data"}'));
  };

  return (
    <ConfigProvider theme={customTheme}>
      <Card
        className="content-center text-center !p-[30px] max-w-[834px] max-h-[700px]"
        style={{ backgroundColor: "#8383831F" }}
      >
        <StatesHeader />
        <Row>
          <Col span={24}>
            <Form<UploadFileDetails>
              form={form}
              layout="vertical"
              name="uploadDetails"
              onFinish={onFinish}
              initialValues={{
                productCategory: "packaging",
              }}
            >
              {/* TODO: Need atong trash icon */}
              <Row>
                <Col span={24} className="mb-4">
                  <Item name="fileName" label="File Name">
                    <StyledInput readOnly placeholder="File Name" allowClear />
                  </Item>
                </Col>
              </Row>
              <Row gutter={[20, 20]}>
                <Col span={12} className="mb-4">
                  <Item name="productCategory" label="Product Category or Use">
                    <Select options={options} />
                  </Item>
                </Col>
                <Col span={12} className="mb-4">
                  <Item name="Licensee" label="Licensee">
                    <StyledInput placeholder="Licensee" allowClear />
                  </Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} className="mb-4">
                  <StyledButton block htmlType="submit">
                    {"Submit & Run AI"}
                  </StyledButton>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </ConfigProvider>
  );
};

export default AnalyzeFile;
