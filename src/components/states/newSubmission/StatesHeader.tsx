import { Avatar, Col, Row, Typography } from "antd";

const StatesHeader: React.FC = () => {
  const submissionTxt = "New Submission";
  const uploadImg = "/upload.svg";
  const { Paragraph } = Typography;

  return (
    <Row className="justify-center">
      <Col span={24}>
        <Paragraph className="text-xl font-bold !mb-[25px]">
          {submissionTxt}
        </Paragraph>
      </Col>
      <Col span={24} className="mb-4">
        <Avatar
          style={{ backgroundColor: "#E7E7E7", color: "#E7E7E7" }}
          size={64}
          icon={
            <img
              alt="upload"
              src={uploadImg}
              className="!h-[28px] !w-[23px] object-contain"
            />
          }
        />
      </Col>
    </Row>
  );
};

export default StatesHeader;
