import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import clsx from 'clsx';
import { AccessTime, Euro, Group, People } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: '45%',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '30ch',
    },
  }),
);

type Props = {
  handleCloseModal: () => void;
  dataRef: any;
};

const AnswerReserveModal: React.FC<Props> = ({ handleCloseModal, dataRef }) => {
  const classes = useStyles();

  const [formControl, setFormControl] = useState<{ [key: string]: any }>(
    dataRef?.current,
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormControl({
      ...formControl,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Modal
      open={true}
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
          <h1>Responder à reserva</h1>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => handleCloseModal()}>
            <HighlightOffIcon fontSize={'large'} />
          </IconButton>
        </div>
        <form onSubmit={() => {}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={'time'}
            type="time"
            defaultValue={formControl['hours']}
            name={'time'}
            onChange={handleChange}
            label={'Horas'}
            autoComplete={'time'}
            multiline
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={'date'}
            type={'date'}
            value={formControl['date']}
            name={'date'}
            onChange={handleChange}
            label={'Data'}
            autoComplete={'time'}
            multiline
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={'message'}
            type={'text'}
            //value={formControl['hours']}
            name={'Horas'}
            onChange={handleChange}
            label={'Mensagem'}
            //autoComplete={'time'}
            multiline
            autoFocus
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: '10px',
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
              onClick={handleCloseModal}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AnswerReserveModal;
