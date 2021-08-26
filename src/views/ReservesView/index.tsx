import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const RESERVE_STATE = {
  CONFIRMED: 'confirmada',
  PENDING: 'Pendente',
  REFUSED: 'Recusada',
};

const reservesData = [
  {
    id: 1,
    name: 20,
    adults: 3,
    babies: 0,
    hours: new Date('2014-08-18T21:12:54'),
    date: new Date('2014-08-18T21:11:54'),
    reserveState: RESERVE_STATE.REFUSED,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    name: 10,
    adults: 3,
    babies: 0,
    hours: new Date('2014-08-18T21:11:54').toLocaleTimeString().substring(0, 5),
    date: new Date('2014-08-18T21:11:54'),
    reserveState: RESERVE_STATE.PENDING,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    name: 30,
    adults: 3,
    babies: 0,
    hours: new Date('2014-08-18T20:11:54'),
    date: new Date('2014-08-18T21:11:54'),
    reserveState: RESERVE_STATE.CONFIRMED,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
];
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
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nome',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'numberOfAdults',
    numeric: true,
    disablePadding: false,
    label: 'Nº de adultos',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'numberOfBabies',
    numeric: true,
    disablePadding: false,
    label: 'Nº de bebés',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'hours',
    numeric: true,
    disablePadding: false,
    label: 'Horas',
    type: 'time',
    isEditable: true,
  },
  {
    id: 'date',
    numeric: true,
    disablePadding: false,
    label: 'Data',
    type: 'date',
    isEditable: true,
  },
  {
    id: 'reserveState',
    numeric: false,
    disablePadding: false,
    label: 'Estado',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
    type: 'date',
    isEditable: false,
  },
];
const ReservesView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable
        data={reservesData}
        fields={headCells}
        actions={true}
        title={'Reserva'}
        reserve={true}
      />
    </ResponsiveDrawer>
  );
};

export default ReservesView;
