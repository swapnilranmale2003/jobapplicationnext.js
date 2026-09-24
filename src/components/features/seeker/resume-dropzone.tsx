"use client";

import { useCallback, useRef, useState, type DragEvent } from "react";
import { Button, Icon } from "@/components/ui";
import { cn, formatDate } from "@/utils";
import styles from "./resume-dropzone.module.css";

type UploadStage = "idle" | "uploading" | "parsing" | "done";

type ResumeDropzoneProps = {
  /** Called once the simulated upload + parsing finishes. */
  onReplaced: (fileName: string) => void;
  currentFileName: string;
  uploadedAt: string;
};

const MAX_SIZE_LABEL = "PDF only, max 5 MB";

/** Drag-and-drop resume uploader that simulates AI parsing with a staged timeline. */
export function ResumeDropzone({ onReplaced, currentFileName, uploadedAt }: ResumeDropzoneProps) {
  const [stage, setStage] = useState<UploadStage>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [pendingName, setPendingName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSimulation = useCallback((fileName: string) => {
    setPendingName(fileName);
    setStage("uploading");
    window.setTimeout(() => {
      setStage("parsing");
      window.setTimeout(() => {
        setStage("done");
        onReplaced(fileName);
      }, 900);
    }, 600);
  }, [onReplaced]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const file = files?.[0];
      if (!file) return;
      runSimulation(file.name);
    },
    [runSimulation],
  );

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    handleFiles(event.dataTransfer.files);
  };

  if (stage === "uploading" || stage === "parsing") {
    return (
      <div className={styles.progress}>
        <div className={styles.spinner} aria-hidden />
        <div>
          <p className={styles.progressTitle}>
            {stage === "uploading" ? "Uploading…" : "AI is parsing your resume…"}
          </p>
          <p className={styles.progressFile}>{pendingName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.current}>
        <div className={styles.currentIcon}>
          <Icon name="fileText" size={20} />
        </div>
        <div className={styles.currentText}>
          <p className={styles.currentName}>{currentFileName}</p>
          <p className={styles.currentMeta}>Uploaded {formatDate(uploadedAt)}</p>
        </div>
      </div>

      <div
        className={cn(styles.dropzone, dragOver && styles.dropzoneActive)}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <Icon name="uploadCloud" size={26} className={styles.dropIcon} />
        <p className={styles.dropTitle}>Drag &amp; drop a new resume here</p>
        <p className={styles.dropHint}>{MAX_SIZE_LABEL}</p>
        <Button variant="secondary" size="sm" icon="upload" onClick={() => inputRef.current?.click()}>
          Browse files
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className={styles.hiddenInput}
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>
    </div>
  );
}
