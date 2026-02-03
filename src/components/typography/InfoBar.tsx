// import React from "react";

// export type InfoBarType = "compliant" | "non-compliant" | "neutral";

// export interface InfoBarProps {
//   type?: InfoBarType;
//   label?: string; // optional override text
//   className?: string;
// }

// const STYLE_MAP: Record<
//   InfoBarType,
//   { dot: string; text: string; bg: string }
// > = {
//   compliant: {
//     dot: "#62A35D",
//     text: "#62A35D",
//     bg: "#F0F0F0",
//   },
//   "non-compliant": {
//     dot: "#FF6B73",
//     text: "#FF6B73",
//     bg: "#F0F0F0",
//   },
//   neutral: {
//     dot: "#9E9E9E",
//     text: "#424242",
//     bg: "#F0F0F0",
//   },
// };

// export const InfoBar: React.FC<InfoBarProps> = ({
//   type = "neutral",
//   label,
//   className = "",
// }) => {
//   const styles = STYLE_MAP[type];
//   const computedLabel =
//     label ??
//     (type === "compliant"
//       ? "COMPLIANT"
//       : type === "non-compliant"
//         ? "NON-COMPLIANT"
//         : "STATUS");

//   return (
//     <div
//       className={[
//         "w-full h-[40px] rounded-lg px-4 flex items-center gap-3 ",
//         className,
//       ].join(" ")}
//       style={{ backgroundColor: styles.bg }}
//     >
//       <span
//         className="inline-block rounded-full"
//         style={{ width: 8, height: 8, backgroundColor: styles.dot }}
//       />
//       <span
//         className="font-semibold tracking-wide"
//         style={{ color: styles.text }}
//         aria-hidden="true"
//       >
//         {computedLabel}
//       </span>
//     </div>
//   );
// };

// export default InfoBar;
