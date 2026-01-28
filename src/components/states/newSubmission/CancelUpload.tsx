import { Button, Card, ConfigProvider, Flex, Progress, Typography } from "antd";
import StatesHeader from "./StatesHeader";
import type { CancelUploadProps } from "../../../types";
import { formatFileSize } from "../../../utils/convert";

const CancelUpload: React.FC<CancelUploadProps> = ({
  onCancel,
  file,
  uploadPercent,
  uploadStatus,
}) => {
  const customTheme = {
    token: {
      padding: 0,
    },
    components: {
      Card: {
        bodyPadding: 0,
      },
      Button: {},
    },
  };

  const { Paragraph } = Typography;

  return (
    <ConfigProvider theme={customTheme}>
      <Card
        className="content-center text-center !p-[70px] max-w-[834px] max-h-[502px]"
        style={{ backgroundColor: "#8383831F", textAlign: "-webkit-center" }}
      >
        <Flex vertical gap="small" className="max-w-[406px]">
          <StatesHeader />
          <Paragraph className="font-medium text-sm">
            {file?.name}
            <span className="text-[#838383]">
              {" (" + formatFileSize(file?.size) + ")"}
            </span>
          </Paragraph>

          <Progress
            percent={uploadPercent}
            showInfo
            status={uploadStatus === "error" ? "exception" : "active"}
            className="!mb-[50px]"
            size={[406, 15]}
            strokeColor="#B680FD"
          />
          <Button
            block
            color="default"
            variant="filled"
            style={{
              color: "#FF6B73",
              borderRadius: "52px",
            }}
            onClick={onCancel}
          >
            {"Cancel Upload"}
          </Button>
        </Flex>
      </Card>
    </ConfigProvider>
  );
};

export default CancelUpload;
