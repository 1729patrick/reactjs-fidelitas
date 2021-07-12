import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import {
  Card,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import clsx from 'clsx';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
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
      width: '30ch',
    },
    addressField: {
      width: '62ch',
    },
  }),
);

const GeneralInformationView = () => {
  const classes = useStyles();
  return (
    <ResponsiveDrawer>
      <div>
        <Card raised={true}>
          <h2>Informação Geral</h2>
          <form>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}>
                  <InputLabel htmlFor={'name'}>Nome do restaurante</InputLabel>
                  <Input
                    id={'name'}
                    type={'text'}
                    //value={}
                    name={'name'}
                    //onChange={}
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

                <FormControl
                  className={clsx(classes.margin, classes.textField)}>
                  <InputLabel htmlFor={'phone'}>Contacto</InputLabel>
                  <Input
                    id={'phone'}
                    type={'number'}
                    //value={}
                    name={'phone'}
                    //onChange={}
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
              <FormControl
                className={clsx(classes.margin, classes.addressField)}>
                <InputLabel htmlFor={'localization'}>
                  Localização do restaurante
                </InputLabel>
                <Input
                  id={'localization'}
                  type={'text'}
                  //value={}
                  name={'localization'}
                  //onChange={}
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
          </form>
        </Card>

        <Card style={{ marginTop: '30px' }} raised={true}>
          <h2>Fotos de apresentação</h2>
        </Card>
      </div>
    </ResponsiveDrawer>
  );
};

export default GeneralInformationView;
