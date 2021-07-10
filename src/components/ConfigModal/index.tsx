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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '20%',
      left: '20%',
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
      width: '25ch',
    },
  }),
);

type Props = {
  handleCloseModal: () => void;
};

const ConfigModal: React.FC<Props> = ({ handleCloseModal }) => {
  const [acceptReserves, setAcceptReserves] = useState(false);
  const [weekDays, setWeekDays] = useState([
    { weekDay: 'segunda-feira', selected: true },
    { weekDay: 'terça-feira', selected: true },
    { weekDay: 'quarta-feira', selected: true },
    { weekDay: 'quinta-feira', selected: true },
    { weekDay: 'sexta-feira', selected: true },
    { weekDay: 'sábado', selected: true },
    { weekDay: 'domingo', selected: true },
  ]);
  const classes = useStyles();

  const handleAcceptReserve = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptReserves(!acceptReserves);
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
        <FormControlLabel
          value="top"
          control={<Switch color="primary" />}
          label="Aceita reservas"
          labelPlacement="top"
        />
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor={'minPersons'}>
                {'Nº mínimo de pessoas'}
              </InputLabel>
              <Input
                id={'minPersons'}
                type={'number'}
                // value={''}
                name={'min'}
                onChange={() => {}}
                endAdornment={
                  <InputAdornment position="end">
                    {/*<IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton> */}
                  </InputAdornment>
                }
              />
            </FormControl>

            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor={'maxPersons'}>
                {'Nº máximo de pessoas'}
              </InputLabel>
              <Input
                id={'maxPersons'}
                type={'number'}
                // value={''}
                name={'max'}
                onChange={() => {}}
                endAdornment={
                  <InputAdornment position="end">
                    {/*<IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton> */}
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor={'limitTimeReservation'}>
                {'Hora limite de reserva'}
              </InputLabel>
              <Input
                id={'maxPersons'}
                type={'number'}
                // value={''}
                name={'max'}
                onChange={() => {}}
                endAdornment={
                  <InputAdornment position="end">
                    {/*<IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton> */}
                  </InputAdornment>
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
                endAdornment={
                  <InputAdornment position="end">
                    {/*<IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton> */}
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor={'signal'}>{'Valor do sinal'}</InputLabel>
            <Input
              id={'maxPersons'}
              type={'number'}
              // value={''}
              name={'max'}
              onChange={() => {}}
              endAdornment={
                <InputAdornment position="end">
                  {/*<IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton> */}
                </InputAdornment>
              }
            />
          </FormControl>
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
                    color={'primary'}
                  />
                }
                label={weekDay.weekDay}
              />
            ))}
          </FormGroup>
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
    </Modal>
  );
};
export default ConfigModal;
