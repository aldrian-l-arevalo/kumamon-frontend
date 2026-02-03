import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Crumb, UploadFileDetails, UploadStatus } from "../types";
import ClickableBreadcrumb from "../components/navigation/ClickableBreadcrumb";
import { StyledTypographyLink } from "../components/typography/StyledTypographyLink";
import { StyledInput } from "../components/input/StyledInput";
import { StyledButton } from "../components/buttons/StyledButton";
import UploadIcon from "../components/icons/UploadIcon";
import DashboardCard from "../components/container.tsx/DashboardCard";
import ToolTippedButton from "../components/buttons/ToolTippedButton";
import AnalysisTabs from "../components/container.tsx/AnalysisTabs";
import { customTheme } from "../theme/dashboardTheme";
import { formatFileSize } from "../utils/convert";
import { DeleteOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  Progress,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import { draggerStyle } from "../styles/draggerStyle";
import LabeledDetail from "../components/typography/LabeledDetail";

function Dashboard() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<JSON | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  

  const [form] = Form.useForm<UploadFileDetails>();
  const timerRef = useRef<number | null>(null);

  const { Dragger } = Upload;
  const { Item } = Form;
  const { Paragraph, Text } = Typography;

  const submissionTxt = "New Submission";
  const analysisStatus = "compliant";
  const analysisRemarks =
    "Issues found in Copyright and Character_Name: incorrect copyright year (2013 instead of 2010), Japanese text used instead of romanized English in copyright notice, and character name misspelled as 'Kumamonn' with extra 'n'.";

  const options = [
    { label: "Packaging", value: "packaging" },
    { label: "Category B", value: "categoryB" },
    { label: "Category C", value: "categoryC" },
  ];

  const stopSimulation = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopSimulation();
  }, [stopSimulation]);

  const startSimulationUpload = useCallback(
    (file: File) => {
      stopSimulation();

      setUploadedFile(file);
      setUploadStatus("uploading");
      setUploadPercent(0);

      form.setFieldsValue({ fileName: file.name });

      let p = 0;

      timerRef.current = window.setInterval(() => {
        p += 8;
        const next = Math.min(100, p);
        setUploadPercent(next);

        if (next >= 100) {
          stopSimulation();
          setUploadStatus("done");

          console.log("Simulated upload complete:", {
            name: file.name,
            type: file.type,
            sizeBytes: file.size,
            lastModified: new Date(file.lastModified).toISOString(),
            fakeServerId: crypto.randomUUID?.() ?? "demo-id",
          });
        }
      }, 120);
    },
    [form, stopSimulation],
  );

  const draggerProps: UploadProps = {
    name: "File",
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    accept: ".png,.jpg,.jpeg,.pdf",
    beforeUpload(file) {
      startSimulationUpload(file);
      return false;
    },
    onDrop(e) {
      console.log("Dropped files:", e.dataTransfer.files);
    },
  };

  const handleAnalyzeFile = useCallback((data: JSON) => {
    setAnalysisResult(data);
    console.log("analysisResult (new): ", data);
  }, []);

  const onFinish = (values: UploadFileDetails) => {
    const fileMeta = {
      name: uploadedFile?.name || "",
      type: uploadedFile?.type || "",
      sizeBytes: uploadedFile?.size || 0,
      sizeKB: +(uploadedFile?.size || 0 / 1024).toFixed(2),
      lastModified: new Date(uploadedFile?.lastModified || 0).toISOString(),
    };
    console.log("Uploaded file meta:", fileMeta);
    console.log("Form values:", values);
    handleAnalyzeFile(JSON.parse('{"test": "data"}'));
  };

  const onCancel = useCallback(() => {
    stopSimulation();
    form.resetFields();
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadPercent(0);
    setAnalysisResult(null);
  }, [form, stopSimulation]);

  const breadCrumbItems = useMemo<Crumb[]>(() => {
    return [
      {
        key: "newSubmission",
        label: "New Submission",
        size: undefined,
        onClick: onCancel,
        disabled: false,
      },
      ...(uploadedFile
        ? [
            {
              key: `file-${uploadedFile.name}-${uploadedFile.lastModified}`,
              label: uploadedFile.name,
              size: uploadedFile.size,
              disabled: true,
            },
          ]
        : []),
    ];
  }, [uploadedFile, onCancel]);

  const fileDetails = (
    <Paragraph className="font-medium text-sm">
      {uploadedFile?.name}
      <span className="text-[#838383]">
        {" (" + formatFileSize(uploadedFile?.size) + ")"}
      </span>
    </Paragraph>
  );

  return (
    <ConfigProvider theme={customTheme}>
      {!analysisResult ? (
        <Row
          gutter={[0, 28]}
          className="w-full px-[32px] md:px-[40px] pb-[32px] min-h-[calc(100vh-65px)]"
        >
          <Col span={24} className="pt-[32px]">
            <ClickableBreadcrumb items={breadCrumbItems} />
          </Col>
          <Col span={24} className="xl:px-[267px]">
            <Card style={{ backgroundColor: "#8383831F" }}>
              <Row className="w-full" gutter={[0, 40]}>
                <Col span={24} style={{ textAlign: "-webkit-center" }}>
                  <Paragraph className="text-xl font-bold !mt-[51px]">
                    {submissionTxt}
                  </Paragraph>
                </Col>
                <Col span={24} className="xl:px-[178px]">
                  <Row gutter={[0, 49]}>
                    <Col span={24}>
                      {!uploadedFile && uploadPercent !== 100 ? (
                        // Initial State
                        <Dragger
                          {...draggerProps}
                          className="text-center w-full max-h-[460px]"
                          style={draggerStyle}
                        >
                          <Row>
                            <Col span={24} className="mb-[32px]">
                              <UploadIcon />
                            </Col>
                            <Col span={24}>
                              <span className="text-base font-semibold">
                                <StyledTypographyLink txtColor="#003693">
                                  {"Click here "}
                                </StyledTypographyLink>
                                {" to upload you file or drag and drop"}
                              </span>
                            </Col>
                            <Col span={24}>
                              <p className="text-sm font-medium text-[#838383]">
                                {"Supported format: PNG, JPEG, PDF"}
                              </p>
                            </Col>
                          </Row>
                        </Dragger>
                      ) : uploadPercent < 100 ? (
                        // Uploading State
                        <DashboardCard style={draggerStyle}>
                          <Row>
                            <Col span={24} className="mb-[32px]">
                              <UploadIcon />
                            </Col>
                            <Col span={24}>
                              {fileDetails}
                              <Progress
                                type="line"
                                percent={uploadPercent}
                                status={
                                  uploadStatus === "error"
                                    ? "exception"
                                    : "active"
                                }
                                size={[0, 15]}
                                strokeColor="#B680FD"
                              />
                            </Col>
                          </Row>
                        </DashboardCard>
                      ) : (
                        <DashboardCard style={draggerStyle}>
                          <Row>
                            <Col span={24} className="mb-[32px]">
                              <UploadIcon />
                            </Col>
                            <Col span={24}>
                              <Card className="!bg-[#EBEBEB] !rounded-lg outline-[1px] outline-[#D1D1D1]">
                                <Row>
                                  <Col
                                    span={20}
                                    className="text-left font-medium text-sm"
                                  >
                                    {fileDetails}
                                    {/* TODO: Conditions on the text */}
                                    <Paragraph className="!text-[#62A35D] !m-0">
                                      {"Upload Complete"}
                                    </Paragraph>
                                  </Col>
                                  <Col
                                    span={4}
                                    className="!text-right"
                                    onClick={onCancel}
                                  >
                                    <DeleteOutlined
                                      style={{
                                        fontSize: 24,
                                        color: "#838383",
                                        cursor: "pointer",
                                      }}
                                    />
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          </Row>
                        </DashboardCard>
                      )}
                    </Col>
                    <Col span={24} className="pb-[27px]">
                      <Form<UploadFileDetails>
                        form={form}
                        layout="vertical"
                        name="uploadDetails"
                        onFinish={onFinish}
                        initialValues={{
                          productCategory: "packaging",
                        }}
                      >
                        <Row gutter={[0, 49]}>
                          <Col span={24}>
                            <Row gutter={[16, 16]}>
                              <Col span={24}>
                                <Item name="fileName" label="File Name">
                                  <StyledInput
                                    readOnly
                                    placeholder="File Name"
                                    allowClear
                                  />
                                </Item>
                              </Col>
                              <Col sm={24} md={12} className="w-full">
                                <Item
                                  name="productCategory"
                                  label="Product Category or Use"
                                >
                                  <Select options={options} />
                                </Item>
                              </Col>
                              <Col sm={24} md={12} className="w-full">
                                <Item name="Licensee" label="Licensee">
                                  <StyledInput
                                    placeholder="Licensee"
                                    allowClear
                                  />
                                </Item>
                              </Col>
                            </Row>
                          </Col>
                          <Col span={24}>
                            <StyledButton block htmlType="submit">
                              {"Submit & Run AI"}
                            </StyledButton>
                          </Col>
                        </Row>
                      </Form>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={24} style={{ textAlign: "-webkit-center" }}>
            <Row className="h-[calc(100vh-64px)]">
              {/* Left side */}
              <Col span={showInfo ? 12 : 18} className="bg-[#FAFAFA] ">
                <Row className="px-[24px] py-[40px]">
                  <Col span={24}>
                    <ClickableBreadcrumb items={breadCrumbItems} />
                  </Col>
                  <Col
                    span={24}
                    className="px-[24px] mb-[22px] mt-[20px] bg-[#FFFFFF] rounded-2xl w-full h-[648px]"
                  >
                    <Button
                      className="!absolute !top-[24px] !right-[24px] z-10 flex items-center justify-center !w-[44px] !h-[44px] !rounded-sm !bg-[#8383831F]"
                      icon={<img src="/icons/pencil.svg" alt="icon" className="w-[20px] h-[20px] "/>}
                    />
                    <img
                      src="/sampleImage.svg"
                      alt="Sample"
                      className="p-[47px] w-full h-full object-contain rounded-2xl"
                    />
                  </Col>
                  <Col span={24}>
                    <Row gutter={[24, 8]} className="text-left">
                      <Col span={4}>
                        <LabeledDetail label="Use" value="Packaging" />
                      </Col>
                      <Col span={4}>
                        <LabeledDetail label="Licensee" value="Licensee A" />
                      </Col>
                      <Col span={16}>image</Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {/* Right side */}
              <Col span={showInfo ? 12 : 6} className="bg-[#F5F5F5]">
                <Row gutter={[0, 24]} className="px-[22px] py-[27px]">
                  <Col span={24} className="text-right">
                    <ToolTippedButton
                      toolTipTitle={showInfo ? "Close Drawer" : "Open Drawer"}
                      btnValue=""
                      iconSrc={
                        showInfo
                          ? "/icons/drawerRightIcon.svg"
                          : "/icons/drawerLeftIcon.svg"
                      }
                      iconAlt="drawerIcon"
                      buttonProps={{
                        className: "!h-[33px] !w-[54px] mr-[8px]",
                        shape: "round",
                        style: { backgroundColor: "#030303", border: "none" },
                        onClick: () => {
                          setShowInfo(!showInfo);
                        },
                      }}
                    />
                    <ToolTippedButton
                      toolTipTitle="History"
                      btnValue="History"
                      iconSrc="/icons/historyIcon.svg"
                      iconAlt="historyIcon"
                      buttonProps={{
                        className: "!h-[33px] !w-[110px]",
                        shape: "round",
                        style: { backgroundColor: "#F0F0F0", border: "none" },
                      }}
                    />
                  </Col>
                  <Col
                    span={24}
                    className="text-left py-[13px] px-[12px] rounded-lg"
                    style={{
                      backgroundColor: "#F0F0F0",
                    }}
                  >
                    <Text
                      className="font-normal text-base"
                      style={{ margin: 0 }}
                    >
                      {"Status: "}
                      <span
                        className={
                          "font-semibold text-xl" +
                          " " +
                          (analysisStatus.toLowerCase() === "non-compliant"
                            ? "text-[#FF6B73]"
                            : "text-[#62A35D]")
                        }
                      >
                        {analysisStatus.toUpperCase()}
                      </span>
                    </Text>
                  </Col>
                  <Col
                    span={24}
                    className="px-[24px] py-[16px] bg-[#FFFFFF] rounded-lg"
                  >
                    <Row gutter={[0, 24]}>
                      <Col
                        span={24}
                        className="text-left mb-[16px] border-b-[1px] border-[#D1D1D1] pb-[16px]"
                      >
                        <Text>{analysisRemarks}</Text>
                      </Col>
                      {showInfo && (
                        <Col span={24}>
                          <AnalysisTabs />
                        </Col>
                      )}
                      <Col span={24} className="text-right">
                        <Button
                          className="!h-[24px]"
                          icon={
                            <img
                              src="/icons/feedbackIcon.svg"
                              alt="feedbackIcon"
                              className="!h-[24px] !w-[24px]"
                            />
                          }
                        >
                          {"Feedback"}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </ConfigProvider>
  );
}

export default Dashboard;
