import { Card, Col, ConfigProvider, Row, Upload } from "antd";
import { StyledTypographyLink } from "../../typography/StyledTypographyLink";
import type { UploadProps } from "antd";
import type { UploadInstructionProps } from "../../../types";
import StatesHeader from "./StatesHeader";

const { Dragger } = Upload;

const UploadInstructions: React.FC<UploadInstructionProps> = ({
  onFileSelected,
}) => {
  const customTheme = {
    token: {
      padding: 0,
    },
    components: {
      Card: {
        bodyPadding: 70,
      },
    },
  };

  const draggerProps: UploadProps = {
    name: "File",
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    accept: ".png,.jpg,.jpeg,.pdf",
    beforeUpload(file) {
      onFileSelected(file);
      return false;
    },
    onDrop(e) {
      console.log("Dropped files:", e.dataTransfer.files);
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div className="xl:px-[276px]">
        <Dragger
          {...draggerProps}
          className="text-center max-w-[834px] max-h-[460px]"
        >
          <Card
            className="content-center text-center !p-[70px] "
            style={{ backgroundColor: "#8383831F" }}
          >
            <StatesHeader />
            <Row>
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
          </Card>
        </Dragger>
      </div>
    </ConfigProvider>
  );
};
export default UploadInstructions;
