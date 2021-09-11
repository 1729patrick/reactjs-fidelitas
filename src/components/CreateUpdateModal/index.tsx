import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Modal from '@material-ui/core/Modal';
import clsx from 'clsx';
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import DateFnsUtils from '@date-io/date-fns';
import api from '../../utils/Api';
import { useAuth } from '../../contexts/Auth';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';

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
  open?: boolean;
  handleCloseModal: () => void;
  fields: any;
  title?: string;
  dataRef?: any;
  actionTitle?: string;
  onSubmit?: (obj: any) => void;
};

const CreateUpdateModal: React.FC<Props> = ({
  open = false,
  handleCloseModal,
  fields,
  title,
  dataRef,
  actionTitle,
  onSubmit,
}) => {
  const classes = useStyles();

  const [formControl, setFormControl] = useState<{ [key: string]: any }>(
    dataRef?.current,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedTime, setSelectedTime] = useState<Date | null>();
  const { user } = useAuth();
  /**
   * TO handle the data
   */
  useEffect(() => {
    if (dataRef.current) {
      console.log(dataRef);
      //setSelectedDate(dataRef.current[0]);
    }
  }, []);

  const handleChangeDate = (date: Date | null) => {
    setSelectedDate(date);
  };
  const handleChangeTime = (time: Date | null) => {
    setSelectedTime(time);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormControl({
      ...formControl,
      [event.target.name]:
        event.target.name === 'image' && event.target.files
          ? event.target.files[0]
          : event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formControl);
    }
  };

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
          <h1>
            {actionTitle} {title}
          </h1>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => handleCloseModal()}>
            <HighlightOffIcon fontSize={'large'} />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          {fields.map((field: any, index: number) => {
            if (
              field.isEditable &&
              (field.type === 'text' ||
                field.type === 'number' ||
                field.type === 'checkbox' ||
                field.type === 'email')
            ) {
              return (
                <TextField
                  key={index}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id={field.id}
                  type={field.type}
                  value={(formControl && formControl[field.id]) || ''}
                  name={field.id}
                  onChange={handleChange}
                  label={field.label}
                  autoComplete={field.type}
                  multiline={field.type === 'text'}
                  inputProps={{ min: field.id === 'price' && 0 }}
                  InputProps={{
                    endAdornment: field.id === 'price' && (
                      <InputAdornment position={'end'}>
                        <EuroSymbolIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              );

              /* Inputs !== text field
                              return (
                                <FormControl
                                  className={clsx(classes.margin, classes.textField)}
                                  key={index}>
                                  <InputLabel htmlFor={field.id}>{field.label}</InputLabel>
                                  <Input
                                    id={field.id}
                                    type={field.type}
                                    value={formControl[field.id]}
                                    name={field.id}
                                    onChange={handleChange}
                                    endAdornment={
                                      <InputAdornment position="end">
                                        {<IconButton
                                              aria-label="toggle password visibility"
                                              onClick={handleClickShowPassword}
                                              onMouseDown={handleMouseDownPassword}>
                                              {showPassword ? <Visibility/> : <VisibilityOff/>}
                                          </IconButton>
            }}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              );
            */
            }
            if (
              field.isEditable &&
              (field.type === 'date' || field.type === 'time')
            ) {
              /*
              return (
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  key={index}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {field.type == 'date' ? (
                      <KeyboardDatePicker
                        margin="normal"
                        id={field.id}
                        label={field.label}
                        format="dd/MM/yyyy"
                        value={selectedDate}
                        onChange={handleChangeDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    ) : (
                      <KeyboardTimePicker
                        margin="normal"
                        id={field.id}
                        label={field.label}
                        value={selectedTime}
                        onChange={handleChangeTime}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    )}
                  </MuiPickersUtilsProvider>
                </FormControl>
              );
            */
            }
            if (
              field.isEditable &&
              (field.type === 'file' || field.type === 'image')
            ) {
              return (
                <>
                  <InputLabel
                    style={{
                      color: '0,0,0,0.54',
                      paddingLeft: 8,

                      fontSize: '0.8rem',
                      fontFamily: 'Helvetica',
                      fontWeight: 400,
                      lineHeight: 1,
                      letterSpacing: '0.00938em',
                    }}
                    htmlFor={field.id}>
                    Imagem
                  </InputLabel>
                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    key={index}>
                    {formControl && formControl[field.id] && (
                      <img
                        src={formControl[field.id]}
                        style={{ width: 50, height: 50 }}
                      />
                    )}
                    <Input
                      id={field.id}
                      type={'file'}
                      name={field.id}
                      onChange={handleChange}
                      style={{ borderStyle: 'none', borderBottom: 0 }}
                    />
                  </FormControl>
                </>
              );
            }
          })}
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
              {actionTitle}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateUpdateModal;
