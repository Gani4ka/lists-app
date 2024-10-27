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
}: DialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className={styles.openButton} onClick={() => setOpen(true)}>
          {buttonTitle}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.dialogOverlay}>
          <Dialog.Content className={styles.dialogContent}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>{description}</Dialog.Description>
            {customContent}
            <Dialog.Close asChild>
              <Button className={styles.cancelButton}>Cancel</Button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
