import type { CategoryItem, Lang, TabKey, ValidationResult } from "../types";
import { mapCategoryRecord } from "./convert";

export const buildTabItemsFromValidation = (
  validationResult: ValidationResult,
  lang: Lang = "en" //TODO: make dynamic based on user preference
): Record<TabKey, CategoryItem[]> => {
  const first = validationResult.results?.[0]?.result;

  return {
    "1": mapCategoryRecord(first?.Text_Category, lang, "text"),
    "2": mapCategoryRecord(first?.Design_Category, lang, "design"),
    "3": mapCategoryRecord(first?.Brand_Philosophy_Category, lang, "brand"),
  };
};