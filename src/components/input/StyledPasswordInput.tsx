import React from "react";
import { ConfigProvider, Input } from "antd";

export type StyledInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "size"
> & {
  width?: number;
};

export const StyledPasswordInput: React.FC<StyledInputProps> = ({
  width = 366,
  style,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 20,
        },
        components: {
          Input: {
            paddingBlock: 16,
            paddingInline: 26,
            controlHeight: 52,
            borderRadius: 20,
            colorBgContainer: "#8383831F",
            colorBorder: "transparent",
            activeBorderColor: "transparent",
            hoverBorderColor: "transparent",
          },
        },
      }}
    >
      <Input.Password
        {...props}
        style={{
          width,
          height: 52,
          borderRadius: 20,
          background: "#8383831F",
          padding: "16px 26px",
          gap: 10,
          opacity: 1,
          transform: "rotate(0deg)",
          border: "1px solid transparent",
          boxShadow: "none",
          ...style,
        }}
      />
    </ConfigProvider>
  );
};
