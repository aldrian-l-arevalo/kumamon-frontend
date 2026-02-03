import { Button, Col, Row, Tag, Typography } from "antd";
import type { AnalysisProps } from "../../types";

const AnalysisContent: React.FC<AnalysisProps> = ({
  id,
  categoryItems = [],
  onEditCategory,
}) => {
  const { Text } = Typography;

  return (
    <Row gutter={[0, 16]} id={id}>
      {categoryItems.map(({ key, title, status, result }) => (
        <Col
          span={24}
          key={key}
          className="border-b-[1px] border-[#D1D1D1] pb-[16px]"
        >
          <Row>
            <Col span={22} className="text-left">
              <Text className="font-semibold text-base mr-2">{title}</Text>
              <Tag
                color={status === "NG" ? "#FF6B73" : "#62A35D"}
                variant="solid"
              >
                {status}
              </Tag>
            </Col>
            <Col span={2}>
              <Button
                className="!w-[26px] !h-[26px] !rounded-sm !bg-[#8383831F]"
                icon={<img src="/icons/pencil.svg" alt="icon" />}
                onClick={() => onEditCategory?.(key)}
              />
            </Col>
            <Col span={24} className="text-left mt-[16px]">
              <Text className="text-sm font-normal">{result}</Text>
            </Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
};

export default AnalysisContent;
