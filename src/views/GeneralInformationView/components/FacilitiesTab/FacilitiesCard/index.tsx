import React, { useState } from 'react';
import { Box, Button, Card, Typography } from '@material-ui/core';
import CreateUpdateModal from '../../../../../components/CreateUpdateModal';
import { Palette } from '../../../../../utils/Palette';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WifiIcon from '@mui/icons-material/Wifi';
import PaymentIcon from '@mui/icons-material/Payment';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import EuroIcon from '@mui/icons-material/Euro';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FacilitiesModal from '../FacilitiesModal';

import { useRestaurantFacilities } from '../../../../../api/useRestaurantFacilities';

const facilityIcon = (title: string) => {
  switch (title) {
    case 'wifi':
      return {
        text: 'WiFi',
        icon: <WifiIcon />,
        key: 'wifi',
      };
    case 'smokingFriendly':
      return {
        text: 'Zona para fumadores',
        icon: <SmokingRoomsIcon />,
        key: 'smokingFriendly',
      };
    case 'paymentWithCard':
      return {
        text: 'Pagamentos em Multibanco',
        icon: <PaymentIcon />,
        key: 'paymentWithCard',
      };
    case 'paymentWithMoney':
      return {
        text: 'Pagamento em Dinheiro',
        icon: <EuroIcon />,
        key: 'paymentWithMoney',
      };
    case 'carPark':
      return {
        icon: <LocalParkingIcon />,
        text: 'Parque de Estacionamento',
        key: 'carPark',
      };
    case 'babyChair':
      return {
        icon: <ChildFriendlyIcon />,
        text: 'Cadeira para Bebés',
        key: 'babyChair',
      };
    case 'reducedMobility':
      return {
        icon: <AccessibleForwardIcon />,
        text: 'Acesso a Mobilidade Reduzida',
        key: 'reducedMobility',
      };
    case 'goodForDinner':
      return {
        icon: <DinnerDiningIcon />,
        text: 'Bom para Jantares',
        key: 'goodForDinner',
      };
    case 'goodForLunch':
      return {
        icon: <LunchDiningIcon />,
        text: 'Bom para Almoços',
        key: 'goodForLunch',
      };
    default:
      return { icon: <DoneAllIcon />, text: title, key: 'nokey' };
  }
};

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
  const restaurantFacilities = useRestaurantFacilities();
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
          <FacilitiesModal
            open={openModal}
            handleCloseModal={handleModal}
            facilityIcon={facilityIcon}
          />
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
          {restaurantFacilities.restaurantFacilities &&
            restaurantFacilities.restaurantFacilities?.map(
              (restaurantFacility: any) => (
                <Facility
                  key={restaurantFacility.id}
                  icon={facilityIcon(restaurantFacility.title).icon}
                  text={facilityIcon(restaurantFacility.title).text}
                />
              ),
            )}
        </div>
      </div>
    </Card>
  );
};
export default FacilitiesCard;
