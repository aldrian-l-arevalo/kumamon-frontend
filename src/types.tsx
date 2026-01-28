export interface LoginFormValues {
  email: string;
  password: string;
}

export interface NotFoundProps {
  isAuthenticated: boolean;
}

export interface IIPInstance {
  id: string;
  name: string;
  imgUrl: string;
  lastSync: string;
}

export interface LoginTitleProps {
  color?: string;
}

export interface ProfileMenuProps {
  label?: string;
  disabled?: boolean;
}

export interface UploadFileDetails {
  fileName?: string;
  productCategory: string;
  licensee?: string;
}

export interface Crumb {
  key: string;
  label: string;
  size: number | undefined;
  onClick?: () => void;
  disabled?: boolean;
}

export interface Props {
  items: Crumb[];
}

export interface LabeledDetailProps {
  label?: string;
  value?: string;
}

export interface InfoBarProps {
  type?: string;
}

export type UploadStatus = "idle" | "uploading" | "done" | "error";

export interface ResultCardProps {
  message: string;
  onFeedbackClick?: () => void;
  feedbackLabel?: string;
  analysisResults?: Array<{ key: string; value: string }>;
  className?: string;
}

export type UploadInstructionProps = {
  onFileSelected: (file: File) => void;
};

export interface CancelUploadProps {
  onCancel: () => void;
  file?: File | null;
  uploadPercent?: number;
  uploadStatus?: UploadStatus;
}

export interface CancelAnalysisProps {
  onCancel: () => void;
}


export interface FileAnalysisProps {
  file: File;
  onFileAnalysis: (data: JSON) => void;
}

export type BreadCrumbItem =
  | {
      key: string;
      label: React.ReactNode;
      onClick: () => void;
      disabled?: boolean;
    }
  | { key: string; label: React.ReactNode; disabled: true; onClick?: never };

export type FileSizeUnit = "B" | "KB" | "MB" | "GB" | "TB" | "PB" | "EB";
