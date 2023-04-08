import { ClassNameFunc } from "./common-types";

export const classNames: ClassNameFunc = (classes) => {
  return classes.filter(Boolean).join(" ");
};
