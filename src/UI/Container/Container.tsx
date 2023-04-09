import React, { FC, HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.scss";
import cn from "classnames";
interface IContainer {
  children: ReactNode;
}
export const Container: FC<HTMLAttributes<HTMLDivElement> & IContainer> = ({
  children,
  className,
}) => {
  return <div className={cn(className, styles.container)}>{children}</div>;
};
