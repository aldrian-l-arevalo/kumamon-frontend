// import { Col, Row } from "antd";
// import InfoBar from "../typography/infoBar";
// import ResultCard from "../cards/ResultsCard";

// const ResultsPane = () => {
//   const infoType = "non-compliant";
//   const analysisResults = [
//     {
//       key: "Copyright",
//       value:
//         "1 issue found and 1 failed read. Product illustration found on page 1 does not have any Copyright markings. Unable to read copyright information on page 2 due to some issues on the pixel quality.",
//     },
//     {
//       key: "Logo",
//       value:
//         "Any form of logo invert, including left-right mirroring is strictly prohibited.",
//     },
//   ];

//   return (
//     <Row gutter={[0, 16]} className="p-6">
//       <Col span={24}>
//         <InfoBar type={infoType} />
//       </Col>

//       <Col span={24}>
//         <ResultCard
//           message="This design is compliant with the established brand guidelines."
//           analysisResults={analysisResults}
//           onFeedbackClick={() => {
//             console.log("Feedback clicked");
//           }}
//         />
//       </Col>
//     </Row>
//   );
// };

// export default ResultsPane;
