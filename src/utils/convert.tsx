import type { ApiCheck, CategoryItem, FileSizeUnit, Lang } from "../types";

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
  const fixed = unitIndex === 0 ? 0 : decimals;
  const str = value
    .toFixed(fixed)
    .replace(/\.0+$/, "")
    .replace(/(\.\d*?)0+$/, "$1");

  return `${str} ${units[unitIndex]}`;
}

export const toTitle = (rawKey: string) =>
  rawKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export const toUiStatus = (apiStatus?: string): "OK" | "NG" => {
  return apiStatus?.toLowerCase() === "ok" ? "OK" : "NG";
};

export const getReasonText = (check?: ApiCheck, lang: Lang = "en") => {
  if (!check) return "No data available.";
  const base =
    check.reason?.[lang] ?? check.reason?.en ?? "No reason provided.";
  return check.https_url ? `${base} (Ref: ${check.https_url})` : base;
};

export const mapCategoryRecord = (
  record: Record<string, ApiCheck> | undefined,
  lang: Lang,
  prefix: string,
): CategoryItem[] => {
  if (!record) return [];
  return Object.entries(record).map(([rawKey, check]) => ({
    key: `${prefix}-${rawKey}`,
    title: toTitle(rawKey),
    status: toUiStatus(check.status),
    result: getReasonText(check, lang),
  }));
};
