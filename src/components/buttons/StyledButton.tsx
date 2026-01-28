import React from "react";
import { Button, ConfigProvider } from "antd";

export type StyledButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "type" | "size"
> & {
  width?: number;
};

export const StyledButton: React.FC<StyledButtonProps> = ({
  style,
  children,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            controlHeight: 52,
            borderRadius: 52,
            paddingBlock: 16,
            paddingInline: 26,
            colorPrimary: "#030303",
            colorTextLightSolid: "#FFFFFF",
            defaultBorderColor: "transparent",
            primaryShadow: "none",
          },
        },
      }}
    >
      <Button
        {...props}
        type="primary"
        style={{
          height: 52,
          borderRadius: 52,
          padding: "16px 26px",
          gap: 10,
          opacity: 1,
          transform: "rotate(0deg)",
          background: "#030303",
          color: "#FFFFFF",
          border: "1px solid transparent",
          boxShadow: "none",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        }}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
