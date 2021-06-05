import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const reservesData = [
  {
    id: 1,
    name: 20,
    hours: 0,
    date: 50,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    name: 10,
    hours: 51,
    date: 120,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    name: 30,
    hours: 121,
    date: 1000,
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
    numeric: true,
    disablePadding: false,
    label: 'Nome',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'hours',
    numeric: true,
    disablePadding: false,
    label: 'Horas',
    type: 'number',
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
      />
    </ResponsiveDrawer>
  );
};

export default ReservesView;
