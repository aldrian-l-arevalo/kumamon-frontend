import React from "react";
import { Button, Tooltip } from "antd";
import type { ToolTippedButtonProps } from "../../types";

const ToolTippedButton: React.FC<ToolTippedButtonProps> = ({
  toolTipTitle,
  btnValue,
  tooltipProps,
  buttonProps,
  iconSrc = "",
  iconAlt = "",
  icon,
}) => {
  return (
    <Tooltip title={toolTipTitle} placement="bottomRight" {...tooltipProps}>
      <Button
        {...buttonProps}
        icon={
          icon ?? (
            <img
              src={iconSrc}
              alt={iconAlt}
              className="w-[16px] h-[16px] object-contain"
            />
          )
        }
        style={{
          ...buttonProps?.style,
        }}
      >
        {btnValue}
      </Button>
    </Tooltip>
  );
};

export default ToolTippedButton;
