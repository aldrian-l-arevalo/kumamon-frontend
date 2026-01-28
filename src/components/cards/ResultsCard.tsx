import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import type { ResultCardProps } from "../../types";

const { Paragraph } = Typography;

export const ResultCard: React.FC<ResultCardProps> = ({
  message,
  onFeedbackClick,
  feedbackLabel = "Feedback",
  analysisResults = [],
  className = "",
}) => {
  return (
    <Card
      className={["w-full rounded-xl text-left", "shadow-sm", className].join(
        " ",
      )}
      styles={{
        body: {
          padding: 24,
        },
      }}
    >
      <Paragraph
        className="m-0 font-semibold"
        style={{ color: "#4A4A4A", fontSize: 16, lineHeight: "24px" }}
      >
        {message}
      </Paragraph>
      <Divider className="my-6" style={{ borderColor: "#E6E6E6" }} />
      {analysisResults.map(({ key, value }, index) => (
        <Row key={index} className="mb-10">
          <Col span={24}>
            <Paragraph key={index} className="mb-2 text-base font-semibold">
              {key}
            </Paragraph>
          </Col>
          <Col span={24}>
            <Paragraph key={index} className="mb-2 text-sm font-normal">
              {value}
            </Paragraph>
          </Col>
        </Row>
      ))}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onFeedbackClick}
          className={[
            "inline-flex items-center gap-2",
            "text-sm",
            "hover:opacity-80 cursor-pointer",
          ].join(" ")}
          style={{ color: "#9B9B9B" }}
        >
          <MessageOutlined />
          <span>{feedbackLabel}</span>
        </button>
      </div>
    </Card>
  );
};

export default ResultCard;
