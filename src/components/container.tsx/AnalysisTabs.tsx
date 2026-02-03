import React, { useMemo } from "react";
import { Tabs, type TabsProps } from "antd";
import { buildTabItemsFromValidation } from "../../utils/tabItems";
import { validationResult } from "../../test/validationResult";
import AnalysisContent from "../cards/AnalysisContent";

const AnalysisTabs: React.FC = () => {
  const tabData = useMemo(
    () => buildTabItemsFromValidation(validationResult, "en"),
    [],
  );

  const tabItems: TabsProps["items"] = useMemo(
    () => [
      {
        key: "1",
        label: "Text",
        children: (
          <AnalysisContent
            id={`task-${validationResult.task_id}-text`}
            categoryItems={tabData["1"]}
            onEditCategory={(categoryKey: string) =>
              console.log("Edit Text:", categoryKey)
            }
          />
        ),
      },
      {
        key: "2",
        label: "Design",
        children: (
          <AnalysisContent
            id={`task-${validationResult.task_id}-design`}
            categoryItems={tabData["2"]}
            onEditCategory={(categoryKey: string) =>
              console.log("Edit Design:", categoryKey)
            }
          />
        ),
      },
      {
        key: "3",
        label: "Brand Philosophy",
        children: (
          <AnalysisContent
            id={`task-${validationResult.task_id}-brand`}
            categoryItems={tabData["3"]}
            onEditCategory={(categoryKey: string) =>
              console.log("Edit Brand:", categoryKey)
            }
          />
        ),
      },
    ],
    [tabData],
  );

  return <Tabs defaultActiveKey="1" items={tabItems} />;
};

export default AnalysisTabs;
