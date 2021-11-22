import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import Toolbar from '@material-ui/core/Toolbar';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';

import {
  Restaurant,
  PeopleAlt,
  Loyalty,
  Schedule,
  NotificationsActive,
} from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Breadcrumbs,
  Menu,
  MenuItem,
  MenuProps,
  withStyles,
} from '@material-ui/core';
import { Palette } from '../../utils/Palette';
import Link from '@material-ui/core/Link';
import { useAuth } from '../../contexts/Auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: 'white',
        color: 'black',
      },
      backgroundColor: 'white',
      color: 'black',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      background: Palette.primaryBackgroundColor,
      paddingRight: 20,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      paddingTop: 64,
    },
    listItem: {
      borderRadius: '0px 200px 200px 0px',
      '& > *': {
        color: Palette.primaryTextColor,
      },
      '&:hover': {
        backgroundColor: 'white',
        '& > *': {
          color: 'black',
        },
      },
    },
    menuProfile: {
      '& > *': {
        border: '1px solid black',
      },
    },
  }),
);

export const translations: any = {
  clients: 'Clientes',
  // menu: 'Ementa',
  products: 'Produtos',
  achievements: 'Desafios',
  reserves: 'Reservas',
  points: 'Sistema de Pontuação',
  generalInformations: 'Informações Gerais',
  notifications: 'Notificações',
};

type Props = {
  children?: JSX.Element;
};

const ResponsiveDrawer: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const history = useHistory();
  const location = useLocation();
  const { logout, user } = useAuth();
  console.log('iser', user);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSettings = () => {
    history.push('/generalInformations');
  };

  const handleLogin = () => {
    logout();
    history.push('/');
  };

  const handleDrawerOption = (val: string) => {
    switch (val) {
      case 'Clientes':
        history.push('/clients');
        break;
      /* case 'Ementa':
        history.push('/menu');
        break;*/
      case 'Produtos':
        history.push('/products');
        break;
      case 'Desafios':
        history.push('/achievements');
        break;
      case 'Reservas':
        history.push('/reserves');
        break;
      case 'Sistema de Pontuação':
        history.push('/points');
        break;
      case 'Dashboard':
        history.push('/dashboard');
        break;
      case 'Notificações':
        history.push('/notifications');
        break;
      case 'Encomendas':
        history.push('/parcels');
        break;
      default:
        history.push('/clients');
    }
  };

  const drawerIcon = (index: number) => {
    switch (index) {
      case 0:
        return <InfoIcon />;
      case 1:
        return <Restaurant />;
      case 2:
        return <PeopleAlt />;
      case 3:
        return <Loyalty />;
      case 4:
        return <Schedule />;
      case 5:
        return <DeliveryDiningIcon />;
      case 6:
        return <NotificationsActive />;
      default:
        return '';
    }
  };

  const drawer = (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h1 style={{ color: 'white' }}>FIDELITAS</h1>
      </div>
      <List>
        {[
          'Dashboard',
          // 'Ementa',
          'Produtos',
          'Clientes',
          'Desafios',
          'Reservas',
          'Encomendas',
          //  'Sistema de Pontuação',
          'Notificações',
        ].map((text, index) => (
          <ListItem
            button
            key={text}
            onClick={() => handleDrawerOption(text)}
            className={classes.listItem}>
            <ListItemIcon>{drawerIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      keepMounted
      {...props}
    />
  ));

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} elevation={0}>
        <Toolbar
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb">
              <Link color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Link color="inherit" href={location.pathname.substring(1)}>
                {translations[location.pathname.substring(1)]}
              </Link>
            </Breadcrumbs>
          </div>
          <div>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              size={'small'}>
              <h6>{user && user.firstName}</h6>
              <AccountCircleIcon
                style={{ color: Palette.primaryBackgroundColor, fontSize: 30 }}
              />
            </IconButton>
            <StyledMenu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleSettings}>Configurações</MenuItem>
              <MenuItem onClick={handleLogin}>Terminar Sessão</MenuItem>
            </StyledMenu>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default ResponsiveDrawer;
