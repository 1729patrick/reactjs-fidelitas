import React, { useState } from 'react';
import {
  Button,
  Card,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
} from '@material-ui/core';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

const InfoCard = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

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
          Informação Geral
        </h2>
        <Button
          style={{
            marginRight: '10px',
            height: '90%',
          }}
          variant="contained"
          startIcon={<AddCircleIcon />}
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
    </Card>
  );
};

export default InfoCard;
