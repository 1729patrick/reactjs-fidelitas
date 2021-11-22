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
import { MenuItem } from '@mui/material';

const reserveType = ['breakfast', 'lunch', 'dinner'];

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
  move: any;
  auxDrop: any;
  confirmed: {}[];
  inReview: {}[];
  setConfirmed: any;
  setInReview: any;
  sourceIndex: string;
  destinationIndex: number;
  actualSource: any;
  actualDestination: string;
  destinationToStatus: (
    destinationId: number,
  ) => 'canceled' | 'inReview' | 'confirmed' | undefined;
  destinationIdToState: (id: number) => any;
};

const AnswerReserveModal: React.FC<Props> = ({
  handleCloseModal,
  dataRef,
  onUpdate,
  move,
  auxDrop,
  confirmed,
  inReview,
  setConfirmed,
  setInReview,
  sourceIndex,
  destinationIndex,
  actualSource,
  actualDestination,
  destinationToStatus,
  destinationIdToState,
}) => {
  const classes = useStyles();

  const [time, setTime] = useState(dataRef?.current.time);

  const [date, setDate] = useState(dataRef?.current.date);

  const [message, setMessage] = useState('');
  const [type, setType] = useState(dataRef?.current.type);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    if (onUpdate) {
      const dataToUpdate = { time, date, message, type };
      if (sourceIndex === 'inReview') {
        const result = move(
          inReview,
          destinationIdToState(destinationIndex),
          actualSource,
          actualDestination,
        );
        // @ts-ignore-start

        setInReview([...result[+actualSource.droppableId]]);
        // @ts-ignore-start
        auxDrop(+actualDestination.droppableId, result);
        onUpdate(
          inReview[actualSource.index],
          destinationToStatus(destinationIndex),
          dataToUpdate,
        );
      }
      if (sourceIndex === 'confirmed') {
        const result = move(
          confirmed,
          destinationIdToState(destinationIndex),
          actualSource,
          actualDestination,
        );
        // @ts-ignore-start

        setConfirmed([...result[+actualSource.droppableId]]);
        // @ts-ignore-start
        auxDrop(+actualDestination.droppableId, result);
        onUpdate(
          confirmed[actualSource.index],
          destinationToStatus(destinationIndex),
          dataToUpdate,
        );
      }
    }
  };
  console.log('dataRef', dataRef);
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
              id={'type'}
              type={'text'}
              name={'Tipo'}
              value={type && type}
              onChange={handleTypeChange}
              label={'Tipo'}
              autoFocus
              select>
              {reserveType.map((type: string, index: number) => (
                <MenuItem key={index} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id={'message'}
              type={'text'}
              name={'Horas'}
              onChange={handleMessageChange}
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
