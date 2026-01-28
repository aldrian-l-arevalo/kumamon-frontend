import { Typography } from "antd";
import type { LabeledDetailProps } from "../../types";

const LabeledDetail: React.FC<LabeledDetailProps> = ({
  label = "",
  value = "",
}) => {
  const { Paragraph } = Typography;

  return (
    <>
      <Paragraph className="text-sm font-regular" style={{color: '#838383', margin: 0}}>{label}</Paragraph>
      <Paragraph className="text-base font-semibold" style={{fontFamily: "Graphik"}}>{value}</Paragraph>
    </>
  );
};

export default LabeledDetail;
