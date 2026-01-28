import React from "react";
import { ConfigProvider, Typography } from "antd";

export type StyledTypographyLinkProps = Omit<
  React.ComponentProps<typeof Typography.Link>,
  "underline"
> & {
  blockCenter?: boolean;
  txtColor?: string;
};

export const StyledTypographyLink: React.FC<StyledTypographyLinkProps> = ({
  blockCenter = true,
  txtColor = "#000000",
  style,
  children,
  className,
  ...props
}) => {
  const baseClass = "styled-typography-link";

  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontSize: 16,
        },
      }}
    >
      <Typography.Link
        {...props}
        underline={false}
        className={`${baseClass}${className ? ` ${className}` : ""}`}
        style={{
          fontFamily:
            "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
          fontWeight: 500,
          fontSize: 16,
          lineHeight: "16px",
          letterSpacing: 0,
          textAlign: "center",
          color: txtColor,
          cursor: "pointer",
          userSelect: "none",

          ...(blockCenter
            ? {
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {}),
          ...style,
        }}
      >
        {children}
      </Typography.Link>

      <style>
        {`
          .${baseClass} {
            text-decoration: none !important;
          }
          .${baseClass}:hover {
            text-decoration: underline !important;
            text-decoration-style: solid;
            text-underline-offset: 0px;
          }
          .${baseClass}:focus-visible {
            outline: 2px solid rgba(175, 175, 175, 0.35);
            outline-offset: 2px;
            border-radius: 8px;
          }
        `}
      </style>
    </ConfigProvider>
  );
};
