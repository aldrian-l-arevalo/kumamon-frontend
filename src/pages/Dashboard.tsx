import { useCallback, useMemo, useRef, useState } from "react";
import { Col, Row } from "antd";
import ClickableBreadcrumb from "../components/navigation/ClickableBreadcrumb";
import UploadInstructions from "../components/states/newSubmission/UploadInstruction";
import AnalyzeFile from "../components/states/newSubmission/AnalyzeFile";
import CancelUpload from "../components/states/newSubmission/CancelUpload";
import type { Crumb, UploadStatus } from "../types";
import CancelAnalysis from "../components/states/newSubmission/CancelAnalysis";

function Dashboard() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadPercent, setUploadPercent] = useState<number>(0);
  const [analysisResult, setAnalysisResult] = useState<JSON | null>(null);

  const timerRef = useRef<number | null>(null);

  const stopSimulation = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startSimulationUpload = (file: File) => {
    stopSimulation();
    setUploadedFile(file);
    setUploadStatus("uploading");
    setUploadPercent(0);

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
  };

  const handleAnalyzeFile = (data: JSON) => {
    setAnalysisResult(data);
    console.log("analysisResult: ", analysisResult);
  };

  const onCancel = useCallback(() => {
    stopSimulation();
    setUploadedFile(null);
    setUploadStatus("idle");
    setUploadPercent(0);
    setAnalysisResult(null);
  }, [stopSimulation]);

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

  return (
    <Row gutter={[0, 28]} className="w-full px-[40px]">
      <Col span={24}>
        <ClickableBreadcrumb items={breadCrumbItems} />
      </Col>
      {!analysisResult ? (
        <Col span={24} style={{ textAlign: "-webkit-center" }}>
          {!uploadedFile ? (
            <UploadInstructions onFileSelected={startSimulationUpload} />
          ) : uploadStatus === "done" && uploadedFile ? (
            <AnalyzeFile
              file={uploadedFile}
              onFileAnalysis={handleAnalyzeFile}
            />
          ) : (
            <CancelUpload
              onCancel={onCancel}
              file={uploadedFile}
              uploadPercent={uploadPercent}
              uploadStatus={uploadStatus}
            />
          )}
        </Col>
      ) : (
        <Col span={24} style={{ textAlign: "-webkit-center" }}>
          <CancelAnalysis onCancel={onCancel} />
        </Col>
      )}
    </Row>
  );
}

export default Dashboard;
