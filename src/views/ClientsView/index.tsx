import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const clientsData = [
  {
    id: 1,
    firstName: 'patrick',
    lastName: 'forsthofer',
    email: 'teste1234@gmail.com',
    points: '20',
    numberOfVisits: '2',
    createdAt: '21/04/2020',
  },
  {
    id: 2,
    firstName: 'Tomas',
    lastName: 'Santos',
    email: 'teste1234@gmail.com',
    points: '10',
    numberOfVisits: '22',
    createdAt: '22/04/2020',
  },
  {
    id: 3,
    firstName: 'Tiago',
    lastName: 'Neto',
    email: 'teste1234@gmail.com',
    points: '20',
    numberOfVisits: '42',
    createdAt: '23/04/2020',
  },
];
interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}
const headCells: HeadCell[] = [
  {
    id: 'firstName',
    numeric: false,
    disablePadding: false,
    label: 'Primeiro nome',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Ultimo nome',
  },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'points', numeric: true, disablePadding: false, label: 'Pontos' },
  {
    id: 'numberOfVisits',
    numeric: true,
    disablePadding: false,
    label: 'Numbero de visitas',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
  },
];

const ClientsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable data={clientsData} fields={headCells} actions={true} />
    </ResponsiveDrawer>
  );
};

export default ClientsView;
