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
import { LocalizationProvider, MobileDatePicker, TimePicker } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';

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
  onUpdate?: (...args: any) => Promise<boolean>;
};

const AnswerReserveModal: React.FC<Props> = ({
  handleCloseModal,
  dataRef,
  onUpdate,
}) => {
  const classes = useStyles();

  const [time, setTime] = useState();

  const [date, setDate] = useState();

  const [message, setMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (onUpdate) onUpdate();
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
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
          <form onSubmit={onSubmit}>
            <TimePicker
              label="Horas"
              value={time}
              ampm={false}
              onChange={(newValue: any) => {
                setTime(newValue);
              }}
              renderInput={params => (
                // @ts-ignore
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  {...params}
                />
              )}
            />
            <MobileDatePicker
              disablePast
              label="Data"
              openTo="day"
              views={['year', 'month', 'day']}
              value={date}
              onChange={(newValue: any) => {
                setDate(newValue);
              }}
              renderInput={params => (
                // @ts-ignore
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  {...params}
                />
              )}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={'message'}
              type={'text'}
              name={'Horas'}
              onChange={handleChange}
              label={'Mensagem'}
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
    </LocalizationProvider>
  );
};

export default AnswerReserveModal;
