import React, { SyntheticEvent, useEffect, useState } from 'react';
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
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
  TimePicker,
} from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  MenuItem,
} from '@mui/material';
import { useProducts } from '../../api/useProducts';

const notificationsType = ['email', 'pushNotification', 'sms'];
const achievementsType = ['cash', 'product', 'discount'];
const challengesType = [
  'shareApp',
  'visitRestaurant',
  'purchasePrice',
  'purchaseEvaluation',
];
const productsType = [
  'starter',
  'main',
  'dessert',
  'salad',
  'side',
  'drink',
  'special',
];

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
  onSubmit?: (obj: any, date?: any, time?: any) => Promise<boolean>;
  onUpdate?: (obj: any, date?: any, time?: any) => Promise<boolean>;
  reserve?: boolean;
};

const CreateUpdateModal: React.FC<Props> = ({
  open = false,
  handleCloseModal,
  fields,
  title,
  dataRef,
  actionTitle,
  onSubmit,
  onUpdate,
  reserve,
}) => {
  const classes = useStyles();

  const [formControl, setFormControl] = useState<{ [key: string]: any }>(
    dataRef?.current,
  );
  const [selectedDate, setSelectedDate] = useState<any>();
  const [selectedTime, setSelectedTime] = useState<any>();
  const products = useProducts();
  /**
   * TO handle the data
   */

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormControl({
      ...formControl,
      [event.target.name]:
        event.target.name === 'image' && event.target.files
          ? event.target.files[0]
          : event.target.value,
    });
  };

  const handleChangeProductReward = (
    event: SyntheticEvent<Element, Event>,
    value: any,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<any> | undefined,
  ) => {
    setFormControl({
      ...formControl,
      productReward: value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent,
    date?: any,
    time?: any,
  ) => {
    event.preventDefault();

    let result = false;
    if (actionTitle === 'Adicionar') {
      if (onSubmit) {
        if (reserve) {
          result = await onSubmit(formControl, selectedDate, selectedTime);
        } else {
          result = await onSubmit(formControl);
        }
        if (result) {
          handleCloseModal();
        } else {
          console.log('errou');
        }
      }
    }

    if (actionTitle === 'Editar') {
      if (onUpdate) {
        if (reserve) {
          result = await onUpdate(formControl, selectedDate, selectedTime);
        } else {
          result = await onUpdate(dataRef.current.id, formControl);
        }
        if (result) {
          handleCloseModal();
        } else {
          console.log('errou');
        }
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
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
              }
              if (field.type === 'select') {
                return (
                  <>
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
                      // autoComplete={field.type}
                      select>
                      {field.id === 'type' &&
                        field.label === 'Tipo' &&
                        notificationsType.map(
                          (notificationType: string, index: number) => (
                            <MenuItem key={index} value={notificationType}>
                              {notificationType}
                            </MenuItem>
                          ),
                        )}
                      {field.id === 'type' &&
                        field.label === 'Menu' &&
                        productsType.map(
                          (productType: string, index: number) => (
                            <MenuItem key={index} value={productType}>
                              {productType}
                            </MenuItem>
                          ),
                        )}
                      {field.id === 'type' &&
                        field.label === 'Tipo de Desafio' &&
                        challengesType.map(
                          (challengeType: string, index: number) => (
                            <MenuItem key={index} value={challengeType}>
                              {challengeType}
                            </MenuItem>
                          ),
                        )}
                      {field.id === 'rewardType' &&
                        field.label === 'Tipo de Prémio' &&
                        achievementsType.map(
                          (achievementType: string, index: number) => (
                            <MenuItem key={index} value={achievementType}>
                              {achievementType}
                            </MenuItem>
                          ),
                        )}
                    </TextField>

                    {field.id === 'rewardType' &&
                      formControl[field.id] === 'product' && (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={products.products}
                          getOptionLabel={(options: any) => options.title}
                          fullWidth
                          onChange={handleChangeProductReward}
                          renderInput={params => {
                            return (
                              <TextField
                                {...params}
                                variant="outlined"
                                margin="normal"
                                label="Product"
                              />
                            );
                          }}
                        />
                      )}

                    {field.id === 'rewardType' &&
                      formControl[field.id] === 'cash' && (
                        <TextField
                          key={index}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id={'rewardValue'}
                          type={'number'}
                          value={
                            (formControl && formControl['rewardValue']) || ''
                          }
                          name={'rewardValue'}
                          onChange={handleChange}
                          label={'Valor'}
                          autoComplete={'number'}
                          inputProps={{ min: 0 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position={'end'}>
                                <EuroSymbolIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}

                    {field.id === 'rewardType' &&
                      formControl[field.id] === 'discount' && (
                        <TextField
                          key={index}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id={'rewardValue'}
                          type={'number'}
                          value={
                            (formControl && formControl['rewardValue']) || ''
                          }
                          name={'rewardValue'}
                          onChange={handleChange}
                          label={'Valor do Desconto'}
                          autoComplete={'number'}
                          inputProps={{ min: 0 }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position={'end'}>
                                <span style={{ fontWeight: 'bold' }}> %</span>
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                  </>
                );
              }

              if (field.isEditable && field.type === 'date') {
                return (
                  <MobileDatePicker
                    disablePast
                    label="Data"
                    openTo="day"
                    views={['year', 'month', 'day']}
                    value={selectedDate}
                    onChange={(newValue: any) => {
                      setSelectedDate(newValue);
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
                );
              }
              if (field.isEditable && field.type === 'time') {
                return (
                  <TimePicker
                    label="Horas"
                    value={selectedTime}
                    ampm={false}
                    onChange={(newValue: any) => {
                      setSelectedTime(newValue);
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
                );
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
    </LocalizationProvider>
  );
};

export default CreateUpdateModal;
