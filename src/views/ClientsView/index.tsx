import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const clientsData = [
  {
    id: 1,
    firstName: 'patrick',
    lastName: 'forsthofer',
    email: 'teste1234@gmail.com',
    phoneNumber: '913060881',
    points: '20',
    numberOfVisits: '2',
    expense: 20,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    firstName: 'Tomas',
    lastName: 'Santos',
    email: 'teste1234@gmail.com',
    phoneNumber: '913060881',
    points: '10',
    numberOfVisits: '22',
    expense: 20,
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    firstName: 'Tiago',
    lastName: 'Neto',
    email: 'teste1234@gmail.com',
    phoneNumber: '913060881',
    points: '20',
    numberOfVisits: '42',
    expense: 20,
    createdAt: /*new Date(1996, 4, 23)*/ new Date('2014-08-18T21:11:54'),
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
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Primeiro nome',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'lastName',
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
    numeric: true,
    disablePadding: false,
    label: 'Contacto',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'points',
    numeric: true,
    disablePadding: false,
    label: 'Pontos',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'numberOfVisits',
    numeric: true,
    disablePadding: false,
    label: 'Numbero de visitas',
    type: 'number',
    isEditable: false,
  },
  {
    id: 'expense',
    numeric: true,
    disablePadding: false,
    label: 'Despesa',
    type: 'number',
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

const ClientsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable
        data={clientsData}
        fields={headCells}
        actions={true}
        title={'Cliente'}
      />
    </ResponsiveDrawer>
  );
};

export default ClientsView;
