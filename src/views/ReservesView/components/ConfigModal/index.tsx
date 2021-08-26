import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { AccessTime, Euro, People, Group } from '@material-ui/icons';

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
};

const ConfigModal: React.FC<Props> = ({ handleCloseModal }) => {
  const [acceptReserves, setAcceptReserves] = useState(true);
  const [weekDays, setWeekDays] = useState([
    { weekDay: 'segunda-feira', selected: false },
    { weekDay: 'terça-feira', selected: false },
    { weekDay: 'quarta-feira', selected: false },
    { weekDay: 'quinta-feira', selected: false },
    { weekDay: 'sexta-feira', selected: false },
    { weekDay: 'sábado', selected: false },
    { weekDay: 'domingo', selected: false },
  ]);
  const classes = useStyles();

  const handleAcceptReserve = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptReserves(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
          <h1>Configurações</h1>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleCloseModal}>
            <HighlightOffIcon fontSize={'large'} />
          </IconButton>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FormControlLabel
            value="top"
            control={
              <Switch
                color="primary"
                onChange={handleAcceptReserve}
                checked={acceptReserves}
              />
            }
            label="Aceita reservas"
            labelPlacement="top"
          />
          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'minPersons'}>
                  {'Nº mínimo de pessoas/reserva'}
                </InputLabel>
                <Input
                  id={'minPersons'}
                  type={'number'}
                  // value={''}
                  name={'min'}
                  onChange={() => {}}
                  inputProps={{ min: 0 }}
                  disabled={!acceptReserves}
                  endAdornment={
                    <InputAdornment position="end">
                      <People fontSize={'small'} />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'maxPersons'}>
                  {'Nº máximo de pessoas/reserva'}
                </InputLabel>
                <Input
                  id={'maxPersons'}
                  type={'number'}
                  // value={''}
                  name={'max'}
                  onChange={() => {}}
                  inputProps={{ min: 0 }}
                  disabled={!acceptReserves}
                  endAdornment={
                    <InputAdornment position="end">
                      <People fontSize={'small'} />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'limitTimeReservation'}>
                  {'Hora limite de reserva'}
                </InputLabel>
                <Input
                  id={'maxPersons'}
                  type={'time'}
                  // value={''}
                  name={'max'}
                  onChange={() => {}}
                  disabled={!acceptReserves}
                  endAdornment={
                    <InputAdornment position="end"></InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'late'}>
                  {'Tempo de atraso permitido'}
                </InputLabel>
                <Input
                  id={'maxPersons'}
                  type={'number'}
                  // value={''}
                  name={'max'}
                  onChange={() => {}}
                  inputProps={{ min: 0 }}
                  disabled={!acceptReserves}
                  endAdornment={
                    <InputAdornment position="end">
                      <AccessTime fontSize={'small'} />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'totalPersons'}>
                  {'Total de pessoas'}
                </InputLabel>
                <Input
                  id={'totalPersons'}
                  type={'number'}
                  // value={''}
                  name={'total'}
                  inputProps={{ min: 0 }}
                  onChange={() => {}}
                  disabled={!acceptReserves}
                  endAdornment={
                    <InputAdornment position="end">
                      <Group fontSize={'small'} />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'signal'}>{'Valor do sinal'}</InputLabel>
                <Input
                  id={'maxPersons'}
                  type={'number'}
                  // value={''}
                  name={'max'}
                  inputProps={{ min: 0 }}
                  onChange={() => {}}
                  disabled={!acceptReserves}
                  endAdornment={
                    <InputAdornment position="end">
                      <Euro fontSize={'small'} />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <h3>Dia da semana que aceita reservas</h3>
              <FormGroup row>
                {weekDays.map((weekDay, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={weekDay.selected}
                        onChange={() => {
                          let wekDays = weekDays;
                          wekDays.map((w, i) => {
                            if (index === i) {
                              w.selected = !w.selected;
                            }
                          });
                          setWeekDays([...wekDays]);
                        }}
                        name={weekDay.weekDay}
                        disabled={!acceptReserves}
                        color={'primary'}
                      />
                    }
                    label={weekDay.weekDay}
                  />
                ))}
              </FormGroup>
            </div>
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
                Editar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};
export default ConfigModal;
