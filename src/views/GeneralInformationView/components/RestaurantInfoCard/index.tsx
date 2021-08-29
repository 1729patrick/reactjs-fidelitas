import React, { useRef, useState } from 'react';
import {
  Box,
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
  Typography,
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
import CreateUpdateModal from '../../../../components/CreateUpdateModal';

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

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  type: string;
  isEditable: boolean;
}
const headCells: HeadCell[] = [
  {
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Primeiro nome',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Ultimo nome',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
    type: 'email',
    isEditable: true,
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Contacto',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Contacto',
    type: 'text',
    isEditable: true,
  },
];

const RestaurantInfoCard = () => {
  const [openModal, setOpenModal] = useState(false);
  const modalDataRef = useRef();
  const handleOpenModal = (data?: any) => {
    if (data) {
      modalDataRef.current = data;
    }
    setOpenModal(!openModal);
  };

  return (
    <Card raised={true}>
      <div>
        <Box
          display="flex"
          mb={3}
          mt={3}
          justifyContent="space-between"
          style={{ padding: '0px 10px 0px 10px' }}>
          <Typography variant="h6">Informação do Restaurante</Typography>
          {openModal && (
            <CreateUpdateModal
              handleCloseModal={() => handleOpenModal()}
              fields={headCells}
              dataRef={modalDataRef}
              open={openModal}
              title={'Informações'}
            />
          )}
          <Button
            onClick={() =>
              handleOpenModal({
                title: 'Flavours Spot',
                description: 'Hamburgueria Premium',
                phoneNumber: '913060881',
                email: 'flavourspot@gmail.com',
                address: 'Rua bonfim nº2, Setúbal',
              })
            }
            style={{
              background: Palette.primaryBackgroundColor,
              color: Palette.primaryTextColor,
              boxShadow: 'none',
            }}>
            Editar
          </Button>
        </Box>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '10px',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3>Nome</h3>
            <p>Flavour Spot</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3>Descrição</h3>
            <p>Hamburgueria Premium</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '10px',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3>Contacto</h3>
            <p>913060881</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3>Email</h3>
            <p>flavourspot@gmail.com</p>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '10px',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3>Endereço</h3>
            <p>Rua bonfim nº2, Setúbal</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RestaurantInfoCard;
