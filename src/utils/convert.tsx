import type { FileSizeUnit } from "../types";

export function formatFileSize(
  bytes: number = 0,
  decimals = 2,
  base: 1000 | 1024 = 1024,
): string {
  const size = Number.isFinite(bytes) && bytes > 0 ? bytes : 0;

  const units: FileSizeUnit[] = ["B", "KB", "MB", "GB", "TB", "PB", "EB"];
  if (size === 0) return "0 B";

  const unitIndex = Math.min(
    Math.floor(Math.log(size) / Math.log(base)),
    units.length - 1,
  );

  const value = size / Math.pow(base, unitIndex);

  // Bytes as whole numbers; others use decimals
  const fixed = unitIndex === 0 ? 0 : decimals;

  // Trim trailing zeros nicely: "1.00" -> "1", "1.50" -> "1.5"
  const str = value
    .toFixed(fixed)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1");

  return `${str} ${units[unitIndex]}`;
}
