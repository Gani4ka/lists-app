export type DialogProps = {
  title?: string;
  description?: string;
  customContent: React.ReactNode;
  buttonTitle?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmButtonCallback?: () => void;
};
