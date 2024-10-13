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
            <div
              style={{
                display: 'flex',
                marginTop: 25,
                justifyContent: 'center',
                gap: '10px',
                width: '50%',
                alignSelf: 'center',
              }}
            >
              <Dialog.Close asChild>
                <Button className={styles.cancelButton} color="blue">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
