import React, { useRef, useState } from 'react';
import { Box, Button, Card, Typography } from '@material-ui/core';
import { Palette } from '../../../../../utils/palette';
import { translations } from '../../../../../components/Drawer';
import CreateUpdateModal from '../../../../../components/CreateUpdateModal';

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
    numeric: false,
    disablePadding: false,
    label: 'Contacto',
    type: 'text',
    isEditable: true,
  },
];

const UserInfoCard = () => {
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
          <Typography variant="h6">Informação do Utilizador</Typography>
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
                firstName: 'Patrick',
                lastName: 'Forsthofer',
                phoneNumber: '913060881',
                email: 'patrickforsthofer@gmail.com',
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
            <h3>Primeiro Nome</h3>
            <p>Patrick</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <h3>Último Nome</h3>
            <p>Forsthofer</p>
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
            <p>patrickforsthofer@gmail.com</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default UserInfoCard;
