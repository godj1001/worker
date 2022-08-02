import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
interface TimeBoxProps {
  content: string | ReactNode;
}

export const TimeBox = (props: TimeBoxProps) => {
  return <div className={styles.timeBox}></div>;
};
