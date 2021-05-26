import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

type Props = {
  open?: boolean;
};

const CreateUpdateModal: React.FC<Props> = ({ open = false }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={() => open}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description">
      <div className={classes.paper}>
        <p>ola</p>
      </div>
    </Modal>
  );
};

export default CreateUpdateModal;
