import React, { useEffect, useState } from 'react';
import { Button, Checkbox, List, Modal } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SmokingRoomsIcon from '@material-ui/icons/SmokingRooms';
import AccessibleForwardIcon from '@material-ui/icons/AccessibleForward';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import LocalParkingIcon from '@material-ui/icons/LocalParking';
import WifiIcon from '@material-ui/icons/Wifi';
import PaymentIcon from '@material-ui/icons/Payment';
import { useFacilities } from '../../../../../api/useFacilities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 900,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 8,
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      display: 'flex',
      flexDirection: 'column',
    },
    modalStyle: {
      overflow: 'scroll',
      display: 'block',

      position: 'absolute',
      top: '10%',
      left: '10%',
    },
  }),
);

type FacilityCheckBoxProps = {
  icon: React.ReactNode;
  text: string;
  handleChange: any;
};

const FacilityCheckBox: React.FC<FacilityCheckBoxProps> = ({
  icon,
  text,
  handleChange,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Checkbox onChange={handleChange} disableRipple />
      {text}
      {icon}
    </div>
  );
};

type PropsType = {
  open: boolean;
  handleCloseModal: () => void;
  facilityIcon: any;
};

const FacilitiesModal: React.FC<PropsType> = ({
  open,
  handleCloseModal,
  facilityIcon,
}) => {
  const classes = useStyles();
  const [checkFacilities, setCheckFacilities] = useState({
    wifi: false,
    smokingFriendly: false,
    alcoholicBeverage: false,
    goodForDinner: false,
    goodForLunch: false,
    paymentWithCard: false,
    paymentWithMoney: false,
    carPark: false,
    babyChair: false,
    reducedMobility: false,
  });
  const facilities = useFacilities();
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    facility: string,
  ) => {
    let facilities = { ...checkFacilities };
    // @ts-ignore
    facilities[facility] = event.target.checked;
    setCheckFacilities(facilities);
  };

  return (
    <Modal
      open={open}
      onClose={() => handleCloseModal()}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.modalStyle}>
      <div className={classes.paper}>
        <h2
          style={{
            paddingLeft: '20px',
          }}>
          Horário de Funcionamento
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {facilities.facilities &&
              facilities.facilities.map((facility: any) => (
                <FacilityCheckBox
                  key={facility.id}
                  icon={facilityIcon(facility.title).icon}
                  text={facilityIcon(facility.title).text}
                  handleChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(event, facilityIcon(facility.title).key)
                  }
                />
              ))}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: '5px' }}
            type="submit">
            Editar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FacilitiesModal;
