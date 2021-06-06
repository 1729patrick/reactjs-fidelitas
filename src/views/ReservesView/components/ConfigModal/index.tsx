import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import clsx from 'clsx';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
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
      width: '25ch',
    },
  }),
);

const ConfigModal = () => {
  const classes = useStyles();

  /* const [formControl, setFormControl] = useState<{ [key: string]: any }>(
    dataRef.current,
  );*/
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  /**
   * TO handle the data
   */
  /* useEffect(() => {
    console.log(dataRef);
    if (dataRef) {
      setSelectedDate(dataRef.current.expirationDate);
    }
  }, []);*/

  const handleChangeDate = (date: Date | null) => {
    setSelectedDate(date);
  };

  /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFormControl({
      ...formControl,
      [event.target.name]: event.target.value,
    });
  };*/

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <Modal
      open={true}
      // onClose={() => handleCloseModal()}
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
            //onClick={handleCloseModal}
          >
            <HighlightOffIcon fontSize={'large'} />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          {/*<FormControl
                className={clsx(classes.margin, classes.textField)}
            >
                <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                <Input
                    id={field.id}
                    type={field.type}
                    value={formControl[field.id]}
                    name={field.id}
                    onChange={handleChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}>
                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                          </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>*/}

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
