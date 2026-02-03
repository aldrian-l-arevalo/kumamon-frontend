import React from "react";
import { Card } from "antd";
import type { DashboardCardProps } from "../../types";



const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className = "",
  style,
}) => {
  return (
    <Card
      className={`text-center w-full max-h-[460px] ${className}`}
      style={{ backgroundColor: "#EBEBEB", ...style }}
    >
      {children}
    </Card>
  );
};

export default DashboardCard;
