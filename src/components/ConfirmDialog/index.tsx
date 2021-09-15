import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export type DialogHandler = {
  open: (title: string, text: string, action: () => void) => void;
};

type PropsType = {};

const ConfirmDialog: React.ForwardRefRenderFunction<DialogHandler, PropsType> =
  (props, ref) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [visible, setVisible] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({
      title: '',
      text: '',
      action: () => {},
    });

    const open = useCallback(
      (title: string, text: string, action: () => void) => {
        setVisible(true);
        setConfirmDialog({ title: title, text: text, action: action });
      },
      [setVisible, setConfirmDialog],
    );

    useImperativeHandle(
      ref,
      () => ({
        open,
      }),
      [visible],
    );

    const handleClose = () => {
      setVisible(false);
    };

    const handleConfirm = () => {
      confirmDialog.action();
      setVisible(false);
    };

    return (
      <Dialog
        fullScreen={fullScreen}
        open={visible}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default memo(forwardRef(ConfirmDialog));
