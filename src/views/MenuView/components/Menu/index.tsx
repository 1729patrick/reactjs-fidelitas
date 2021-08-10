import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff, ArrowForwardIos } from '@material-ui/icons';
import ResponsiveTable from '../../../../components/Table';

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
  type: string;
  isEditable: boolean;
}

type Props = {
  title: string;
  data: any;
  headCells: HeadCell[];
};

const Menu: React.FC<Props> = ({ title, data, headCells }) => {
  const [isHidden, setIsHidden] = useState<boolean>();
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2>{title}</h2>
        <IconButton
          aria-label="toggle visibility"
          onClick={() => setIsHidden(() => !isHidden)}>
          {isHidden ? (
            <ArrowForwardIos style={{ transform: 'rotate(90deg)' }} />
          ) : (
            <ArrowForwardIos style={{ transform: 'rotate(-90deg)' }} />
          )}
        </IconButton>
      </div>
      <div style={{ display: isHidden ? 'none' : 'initial' }}>
        <ResponsiveTable
          data={data}
          fields={headCells}
          actions={false}
          title={title}
        />
      </div>
    </div>
  );
};

export default Menu;
