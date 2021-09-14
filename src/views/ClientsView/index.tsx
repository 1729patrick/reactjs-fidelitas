import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';
import { useClients } from '../../api/useClients';
import api from '../../utils/Api';
import { useSWRConfig } from 'swr';

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
    //  createdAt: new Date('2014-08-18T21:11:54'),
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
    //createdAt: new Date('2014-08-18T21:11:54'),
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
    // createdAt: /*new Date(1996, 4, 23)*/ new Date('2014-08-18T21:11:54'),
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
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Contacto',
    type: 'number',
    isEditable: true,
  },
  {
    id: 'visits',
    numeric: true,
    disablePadding: false,
    label: 'Numbero de visitas',
    type: 'number',
    isEditable: false,
  },
  {
    id: 'totalPurchases',
    numeric: true,
    disablePadding: false,
    label: 'Despesa',
    type: 'number',
    isEditable: true,
  },
  /*{
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Criado em',
    type: 'date',
    isEditable: false,
  },*/
];

const ClientsView = () => {
  const clients = useClients();
  const { mutate } = useSWRConfig();

  const onDelete = async (id: number) => {
    const achievement = await api.delete(`/restaurants/users/${id}`);
    if (achievement.status === 200) {
      mutate('/restaurants/users');
      return true;
    } else {
      return false;
    }
  };

  return (
    <ResponsiveDrawer>
      {clients.clients ? (
        <ResponsiveTable
          data={clients.clients}
          fields={headCells}
          actions={true}
          title={'Cliente'}
          clients={true}
          onDelete={onDelete}
        />
      ) : (
        <></>
      )}
    </ResponsiveDrawer>
  );
};

export default ClientsView;
