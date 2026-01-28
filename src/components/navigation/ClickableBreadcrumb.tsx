import React from "react";
import { Breadcrumb } from "antd";
import type { Props } from "../../types";
import { formatFileSize } from "../../utils/convert";

const ClickableBreadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <Breadcrumb
      items={items.map((c) => ({
        title: (
          <button
            type="button"
            disabled={c.disabled}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              c.onClick?.();
            }}
            className={[
              "text-[#424242] font-medium text-base",
              c.disabled
                ? "hover:no-underline font-medium"
                : "hover:text-[#003693] hover:font-semibold cursor-pointer hover:underline ",
            ].join(" ")}
          >
            {c.label}
            {c.size && (
              <span className="text-[#838383]">
                {" (" + formatFileSize(c.size) + ")"}
              </span>
            )}
          </button>
        ),
      }))}
    />
  );
};

export default ClickableBreadcrumb;
