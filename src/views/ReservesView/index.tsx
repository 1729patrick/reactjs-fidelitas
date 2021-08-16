import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const reservesData = [
  {
    id: 1,
    name: 20,
    numberOfPersons: 3,
    hours: new Date('2014-08-18T21:12:54'),
    date: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    name: 10,
    numberOfPersons: 3,
    hours: new Date('2014-08-18T21:11:54').toLocaleTimeString().substring(0, 5),
    date: new Date('2014-08-18T21:11:54'),
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    name: 30,
    numberOfPersons: 3,
    hours: new Date('2014-08-18T20:11:54'),
    date: new Date('2014-08-18T21:11:54'),
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
    id: 'numberOfPersons',
    numeric: true,
    disablePadding: false,
    label: 'Nº de Pessoas',
    type: 'text',
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
