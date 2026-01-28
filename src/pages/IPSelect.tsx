import { Card, Col, ConfigProvider, Row } from "antd";
import useGetIPList from "../hooks/useGetIPList";
import { useNavigate } from "react-router-dom";

function IPSelect() {
  const { ipList } = useGetIPList();
  const navigate = useNavigate();

  const customTheme = {
    components: {
      Card: {
        bodyPadding: 0,
      },
    },
  };

  return (
    <ConfigProvider theme={customTheme}>
      <div className="px-8">
        <Row gutter={[0, 48]}>
          <Col span={24}>
            <p className="text-base font-medium">Select Relevant IP</p>
          </Col>
          <Col span={24}>
            <Row gutter={[50, 60]}>
              {ipList.map(({ id, name, imgUrl, lastSync }) => {
                return (
                  <Col key={id} sm={24} md={12} lg={12} xl={8}>
                    <Card
                      hoverable
                      variant="borderless"
                      className="max-w-[467px] max-h-[356px]"
                      styles={{
                        body: {
                          backgroundColor: "#FAFAFA",
                        },
                      }}
                      style={{ borderRadius: "8px" }}
                      cover={
                        <img
                          alt="Kumamon"
                          src={imgUrl}
                          className="h-[300px] object-contain bg-[#ECECEC] py-8"
                        />
                      }
                      onClick={() => navigate("/")}
                    >
                      <div className="px-1 pt-5">
                        <p className="text-base font-semibold">{name}</p>
                        <p className="text-xs font-normal text-[#838383]">
                          {lastSync}
                        </p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
};

export default IPSelect;
