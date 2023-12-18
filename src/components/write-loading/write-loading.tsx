import React from "react";
import styles from "./write-loading.module.css";

const WriteLoading = () => {
  return (
    <div className="w-fit h-auto">
      <div className="px-4">
        <div className="snippet" data-title={styles["dot-pulse"]}>
          <div className="stage">
            <div className={styles["dot-pulse"]}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteLoading;
