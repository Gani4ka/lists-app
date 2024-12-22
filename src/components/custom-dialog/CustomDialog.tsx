import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@radix-ui/themes';

import styles from './customDialog.module.css';
import { DialogProps } from './types';

export default function CustomDialog({
  title,
  description,
  buttonTitle,
  customContent,
  open,
  setOpen,
  confirmButtonCallback,
}: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {buttonTitle && (
          <Button className={styles.openButton} onClick={() => setOpen(true)}>
            {buttonTitle}
          </Button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay}>
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title className={styles.title}>{title}</Dialog.Title>
            <Dialog.Description className={styles.description}>
              {description}
            </Dialog.Description>
            <div className={styles.content}>{customContent}</div>
            <div className={styles.buttons}>
              <Dialog.Close asChild>
                <Button className={styles.cancelButton}>Cancel</Button>
              </Dialog.Close>
              {confirmButtonCallback && (
                <Dialog.Close asChild>
                  <Button
                    className={styles.confirmButton}
                    onClick={() => {
                      confirmButtonCallback();
                      setOpen(false);
                    }}
                  >
                    Confirm
                  </Button>
                </Dialog.Close>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
