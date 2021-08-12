import React from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';

const notificationData = [
  {
    id: 1,
    title: '20 almoços gratis',
    message: 'são para esquecer ',
    color: 'red',
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 2,
    title: '20 almoços gratis',
    message: 'osteus problemas',
    color: 'blue',
    createdAt: new Date('2014-08-18T21:11:54'),
  },
  {
    id: 3,
    title: '20 almoços gratis',
    message: 'vais perceber',
    color: 'yellow',
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
    id: 'title',
    numeric: false,
    disablePadding: false,
    label: 'Título',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'message',
    numeric: true,
    disablePadding: false,
    label: 'Mensagem',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'color',
    numeric: true,
    disablePadding: false,
    label: 'Cor',
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

const NotificationsView = () => {
  return (
    <ResponsiveDrawer>
      <ResponsiveTable
        data={notificationData}
        fields={headCells}
        actions={true}
        title={'Notificação'}
        notifications={true}
      />
    </ResponsiveDrawer>
  );
};

export default NotificationsView;
