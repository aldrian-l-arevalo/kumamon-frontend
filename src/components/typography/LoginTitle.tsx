import type { LoginTitleProps } from "../../types";

export const LoginTitle = ({ color = "black" }: LoginTitleProps) => {
  return (
    <div
      className="uppercase leading-none"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <span className="text-[30px] font-extrabold" style={{ color: "#B680FD" }}>
        {`IMAGE`}
      </span>
      <span
        className="text-[30px] font-extralight"
        style={{
          color: color,
          letterSpacing: "-0.04em",
          marginLeft: 6,
        }}
      >
        AI
      </span>
    </div>
  );
};
