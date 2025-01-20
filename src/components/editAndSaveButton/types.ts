export interface ButtonProps {
  cbEdit?: () => void;
  cbSave: () => void;
  formRef: React.RefObject<HTMLElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  archived: boolean;
}
