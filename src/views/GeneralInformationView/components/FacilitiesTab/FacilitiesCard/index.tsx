import React, { useState } from 'react';
import { Box, Button, Card, Typography } from '@material-ui/core';
import CreateUpdateModal from '../../../../../components/CreateUpdateModal';
import { Palette } from '../../../../../utils/palette';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import WifiIcon from '@material-ui/icons/Wifi';
import PaymentIcon from '@material-ui/icons/Payment';
import FacilitiesModal from '../FacilitiesModal';

type FacilityProps = {
  icon: React.ReactNode;
  text: string;
};

const Facility: React.FC<FacilityProps> = ({ icon, text }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      {text}
      {icon}
    </div>
  );
};

const FacilitiesCard = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <Card raised={true}>
      <Box
        display="flex"
        mb={3}
        mt={3}
        justifyContent="space-between"
        style={{ padding: '0px 10px 0px 10px' }}>
        <Typography variant="h6">Facilidades</Typography>
        {openModal && (
          <FacilitiesModal open={openModal} handleCloseModal={handleModal} />
        )}
        <Button
          onClick={() => handleModal()}
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
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 0px 10px 0px',
          }}>
          <Facility icon={<SmokingRoomsIcon />} text={'Zona para fumadores'} />
          <Facility
            icon={<LocalParkingIcon />}
            text={'Parque de estacionamento'}
          />
          <Facility icon={<WifiIcon />} text={'WiFi'} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '10px 0px 10px 0px',
          }}>
          <Facility
            icon={<AccessibleForwardIcon />}
            text={'Acesso a mobilidade reduzida'}
          />
          <Facility icon={<ChildFriendlyIcon />} text={'Cadeira para bebés'} />
          <Facility icon={<PaymentIcon />} text={'Multibanco'} />
        </div>
      </div>
    </Card>
  );
};
export default FacilitiesCard;
