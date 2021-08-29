import React, { useState } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  TextField,
} from '@material-ui/core';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Palette } from '../../../../utils/palette';
/*
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import TimePicker from '@material-ui/lab/TimePicker';*/
import TimePicker from 'react-time-picker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      width: '30ch',
    },
    addressField: {
      width: '62ch',
    },
  }),
);

type Props = {
  data: any;
};

const RestaurantInfoCard: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [checked, setChecked] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [breakfastChecked, setBreakfastChecked] = useState(false);
  const [lunchChecked, setLunchChecked] = useState(false);
  const [dinnerChecked, setDinnerChecked] = useState(false);
  const [value, setValue] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z'),
  );

  const handleCheckWeekDay = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    let newChecked = [...checked];
    newChecked[currentIndex] = newChecked[currentIndex] === 0 ? 1 : 0;
    setChecked(newChecked);
  };
  const handleCloseModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Card raised={true}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <h2
          style={{
            paddingLeft: '20px',
          }}>
          Informação do Restaurante
        </h2>
        <Button
          style={{
            marginRight: '10px',
            height: '90%',
            backgroundColor: Palette.primaryBackgroundColor,
            color: Palette.primaryTextColor,
          }}
          variant="contained"
          startIcon={
            <AddCircleIcon style={{ color: Palette.primaryTextColor }} />
          }
          onClick={() => {
            handleCloseModal();
          }}>
          Editar informações
        </Button>
      </div>
      <form>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '0px 20px',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor={'name'}>Nome do restaurante</InputLabel>
                <Input
                  id={'name'}
                  type={'text'}
                  //value={}
                  name={'name'}
                  //onChange={}
                  disabled={true}
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
                <InputLabel htmlFor={'phone'}>Contacto</InputLabel>
                <Input
                  id={'phone'}
                  type={'number'}
                  //value={}
                  name={'phone'}
                  //onChange={}
                  disabled={true}
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
                <InputLabel htmlFor={'facebook'}>Facebook</InputLabel>
                <Input
                  id={'facebook'}
                  type={'text'}
                  //value={}
                  name={'facebook'}
                  //onChange={}
                  disabled={true}
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
                <InputLabel htmlFor={'instagram'}>Instagram</InputLabel>
                <Input
                  id={'instagram'}
                  type={'text'}
                  //value={}
                  name={'instagram'}
                  //onChange={}
                  disabled={true}
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

            <FormControl className={clsx(classes.margin, classes.addressField)}>
              <InputLabel htmlFor={'localization'}>
                Localização do restaurante
              </InputLabel>
              <Input
                id={'localization'}
                type={'text'}
                //value={}
                name={'localization'}
                //onChange={}
                disabled={true}
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
          <div
            style={{
              position: 'relative',
              bottom: '0px',
              //right: '150px',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <h3>QR Code da aplicação</h3>
              <img
                style={{
                  width: '100px',
                  height: '100px',
                }}
                src={'https://miro.medium.com/max/1280/0*zPG9dqz508rmRR70.'}
              />
            </div>
          </div>
        </div>
      </form>

      <Modal
        open={openModal}
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
            <h1>Editar Informações</h1>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleCloseModal}>
              <HighlightOffIcon fontSize={'large'} />
            </IconButton>
          </div>
          <form onSubmit={() => {}}>
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor={'1'}>123</InputLabel>
              <Input
                id={'1'}
                type={'text'}
                value={'123'}
                name={'1'}
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

      <div style={{ width: '100%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <List style={{ display: 'flex', flexDirection: 'row' }}>
            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={breakfastChecked}
                  tabIndex={-1}
                  onClick={() => setBreakfastChecked(!breakfastChecked)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'breakfast' }}
                  onChange={() => setBreakfastChecked(!breakfastChecked)}
                />
              </ListItemIcon>
              <ListItemText id={'breakfast'} primary={'Pequeno-Almoço'} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={lunchChecked}
                  tabIndex={-1}
                  onClick={() => setLunchChecked(!lunchChecked)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'lunch' }}
                  onChange={() => setLunchChecked(!lunchChecked)}
                />
              </ListItemIcon>
              <ListItemText id={'lunch'} primary={'Almoço'} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={dinnerChecked}
                  tabIndex={-1}
                  onClick={() => setDinnerChecked(!dinnerChecked)}
                  disableRipple
                  inputProps={{ 'aria-labelledby': 'dinner' }}
                  onChange={() => setDinnerChecked(!dinnerChecked)}
                />
              </ListItemIcon>
              <ListItemText id={'dinner'} primary={'Jantar'} />
            </ListItem>
          </List>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {[0, 1, 2, 3, 4, 5, 6].map(value => {
            const weekDay = (value: number) => {
              switch (value) {
                case 0:
                  return 'Segunda-feira';
                case 1:
                  return 'Terça-feira';
                case 2:
                  return 'Quarta-feira';
                case 3:
                  return 'Quinta-feira';
                case 4:
                  return 'Sexta-feira';
                case 5:
                  return 'Sábado';
                case 6:
                  return 'Domingo';
                default:
                  return;
              }
            };

            return (
              <div
                key={value}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <Checkbox
                    checked={checked[value] === 1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': weekDay(value) }}
                    onClick={() => handleCheckWeekDay(value)}
                  />

                  <p>{weekDay(value)}</p>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  {breakfastChecked && (
                    <div
                      style={{
                        flex: 1,
                        margin: '10px 0px 10px 0px',
                        textAlign: 'center',
                      }}>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p>até</p>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    margin: '10px 0px 10px 0px',
                    textAlign: 'center',
                  }}>
                  {lunchChecked && (
                    <div>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p>até</p>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{
                    flex: 1,
                    margin: '10px 0px 10px 0px',
                    textAlign: 'center',
                  }}>
                  {dinnerChecked && (
                    <div>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                      <p>até</p>
                      <TimePicker
                        disableClock={true}
                        clearIcon={null}
                        onChange={() => {}}
                        value={new Date()}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default RestaurantInfoCard;
