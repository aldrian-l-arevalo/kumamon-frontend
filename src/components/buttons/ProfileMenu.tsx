import React, { useMemo, useState } from "react";
import { ConfigProvider, Dropdown, Button, type MenuProps, Avatar } from "antd";
import { DownOutlined, LaptopOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type ProfileMenuProps = {
  username?: string;
  disabled?: boolean;
};

export const ProfileMenu: React.FC<ProfileMenuProps> = ({
  username = "Profile",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const getInitials = (name: string) => {
    const cleaned = name.trim().replace(/\s+/g, " ");
    if (!cleaned) return "??";

    const parts = cleaned.split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    const first = parts[0][0] ?? "";
    const last = parts[parts.length - 1][0] ?? "";
    return (first + last).toUpperCase();
  };

  const initials = useMemo(() => getInitials(username), [username]);
  const items: MenuProps["items"] = [
    {
      key: "ipSelector",
      icon: <LaptopOutlined />,
      label: "IP Selector",
      onClick: () => navigate("/ip-select"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      onClick: () => navigate("/login"),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorText: "#FFFFFF",
            colorBgContainer: "#131313",
            defaultBg: "#cfc0c0",
            defaultHoverBg: "rgba(255,255,255,0.10)",
            defaultBorderColor: "transparent",
            defaultHoverBorderColor: "#ffffff",
            defaultActiveBorderColor: "#ffffffbd",
            borderRadius: 38,
            controlHeight: 38,
            paddingInline: 7,
          },
          Menu: {
            itemColor: "#ffffff",
            itemHoverColor: "#ffffff",
            itemBg: "#141414",
            itemHoverBg: "rgba(255,255,255,0.10)",
            borderRadius: 12,
          },
        },
      }}
    >
      <Dropdown
        trigger={["click"]}
        menu={{ items }}
        placement="bottomRight"
        disabled={disabled}
        open={open}
        onOpenChange={(nextOpen) => setOpen(nextOpen)}
      >
        <Button
          type="default"
          style={{
            width: 184,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Avatar
              size={28}
              style={{
                backgroundColor: "rgba(255,255,255,0.12)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: 12,
              }}
            >
              {initials}
            </Avatar>
            <span
              style={{
                lineHeight: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {username}
            </span>
          </span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              transform: open
                ? "rotate(180deg) scale(1.05)"
                : "rotate(0deg) scale(1)",
              transition: "transform 160ms ease",
              transformOrigin: "center",
            }}
          >
            <DownOutlined style={{ fontSize: 12 }} />
          </span>
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
};
