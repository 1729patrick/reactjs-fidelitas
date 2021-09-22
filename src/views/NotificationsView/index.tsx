import React, { useEffect, useState } from 'react';
import ResponsiveDrawer from '../../components/Drawer';
import ResponsiveTable from '../../components/Table';
import { useNotifications } from '../../api/useNotifications';
import api from '../../utils/Api';
import { useSWRConfig } from 'swr';

const notificationData = [
  {
    id: 1,
    title: '1 Sangria grátis com 3 hambúrgueres',
    message: 'Venha jantar conosco ao sabor de uma bela sangria',
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
    id: 'description',
    numeric: true,
    disablePadding: false,
    label: 'Mensagem',
    type: 'text',
    isEditable: true,
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Tipo',
    type: 'select',
    isEditable: true,
  },
];

const NotificationsView = () => {
  const notifications = useNotifications();
  const { mutate } = useSWRConfig();

  const onSubmit = async (formControl: any) => {
    const notification = await api.post('/restaurants/notifications/add', {
      title: formControl['title'],
      description: formControl['description'],
      type: formControl['type'],
    });

    if (notification.status === 200) {
      mutate('/restaurants/notifications');
      return true;
    } else {
      return false;
    }
  };

  const onDelete = async (id: number) => {
    const achievement = await api.delete(`/restaurants/notifications/${id}`);
    if (achievement.status === 200) {
      mutate('/restaurants/notifications');
      return true;
    } else {
      return false;
    }
  };

  return (
    <ResponsiveDrawer>
      {notifications.notifications ? (
        <ResponsiveTable
          data={notifications.notifications}
          fields={headCells}
          actions={true}
          title={'Notificação'}
          notifications={true}
          onSubmit={onSubmit}
          onDelete={onDelete}
        />
      ) : (
        <></>
      )}
    </ResponsiveDrawer>
  );
};

export default NotificationsView;
