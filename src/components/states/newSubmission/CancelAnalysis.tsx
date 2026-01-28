import { Button, Card, ConfigProvider, Flex, Typography } from "antd";
import StatesHeader from "./StatesHeader";
import type { CancelUploadProps } from "../../../types";

const CancelAnalysis: React.FC<CancelUploadProps> = ({
  onCancel, //TODO: make this
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
          <Paragraph className="text-base font-semibold !mb-[50px]">
            {"Analyzing..."}
          </Paragraph>
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
    // <ConfigProvider theme={customTheme}>
    //   <Card
    //     className="content-center text-center !p-[70px] max-w-[834px] max-h-[502px]"
    //     style={{ backgroundColor: "#8383831F", textAlign: "-webkit-center" }}
    //   >
    //     <Flex vertical gap="small" className="max-w-[406px]">
    //       <StatesHeader />
    //       <Paragraph className="text-base font-semibold !mb-[50px]">{'Analyzing...'}</Paragraph>
    //       <Button
    //         block
    //         color="default"
    //         variant="filled"
    //         style={{
    //           color: "#FF6B73",
    //           borderRadius: "52px",
    //         }}
    //         onClick={onCancel}
    //       >
    //         {"Cancel Upload"}
    //       </Button>
    //     </Flex>
    //   </Card>
    // </ConfigProvider>
  );
};

export default CancelAnalysis;
