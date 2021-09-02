import React from 'react';
import { Button, IconButton, Modal, TextField } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 8,
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      display: 'flex',
      flexDirection: 'column',
    },
    modalStyle: {
      overflow: 'scroll',
      display: 'block',

      position: 'absolute',
      top: '10%',
      left: '10%',
    },
  }),
);

type PropsType = {
  open: boolean;
  handleCloseModal: () => void;
};

const NotificationModal: React.FC<PropsType> = ({ open, handleCloseModal }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => handleCloseModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className={classes.paper}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <h1>Enviar notificação</h1>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleCloseModal}>
            <HighlightOffIcon fontSize={'large'} />
          </IconButton>
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={'title'}
          type={'text'}
          //value={}
          name={'title'}
          onChange={() => {}}
          label={'Titulo'}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id={'message'}
          type={'text'}
          //value={}
          name={'message'}
          onChange={() => {}}
          label={'Mensagem'}
          multiline
          autoFocus
        />
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: '5px' }}
            type="submit">
            Enviar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: '5px' }}
            onClick={() => handleCloseModal()}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
