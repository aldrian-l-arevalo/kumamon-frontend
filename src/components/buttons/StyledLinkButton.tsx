import React from "react";
import { Button, ConfigProvider } from "antd";

export type StyledLinkButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "type" | "size"
> & {
  underline?: boolean;
};

export const StyledLinkButton: React.FC<StyledLinkButtonProps> = ({
  underline = true,
  style,
  children,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            paddingBlock: 0,
            paddingInline: 0,
            defaultBorderColor: "transparent",
            primaryShadow: "none",
          },
        },
      }}
    >
      <Button
        {...props}
        type="text"
        style={{
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "16px",
          letterSpacing: "0%",
          color: "#AFAFAF",
          textDecoration: underline ? "underline" : "none",
          textDecorationStyle: "solid",
          textUnderlineOffset: 0,
          textDecorationThickness: "from-font",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "transparent",
          border: "none",
          boxShadow: "none",
          cursor: props.disabled ? "not-allowed" : "pointer",
          height: "auto",
          ...style,
        }}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
};
