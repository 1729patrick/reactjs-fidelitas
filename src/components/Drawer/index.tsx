import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Restaurant,
  PeopleAlt,
  Loyalty,
  Schedule,
  Star,
  NotificationsActive,
} from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

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
        backgroundColor: 'green',
      },
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
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const translations: any = {
  clients: 'Clientes',
  // menu: 'Ementa',
  products: 'Produtos',
  discounts: 'Descontos',
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
  const history = useHistory();
  const location = useLocation();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
      case 'Descontos':
        history.push('/discounts');
        break;
      case 'Reservas':
        history.push('/reserves');
        break;
      case 'Sistema de Pontuação':
        history.push('/points');
        break;
      case 'Informações Gerais':
        history.push('/generalInformations');
        break;
      case 'Notificações':
        history.push('/notifications');
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
        <h1>FIDELITAS</h1>
      </div>
      <Divider />
      <List>
        {[
          'Informações Gerais',
          // 'Ementa',
          'Produtos',
          'Clientes',
          'Descontos',
          'Reservas',
          //  'Sistema de Pontuação',
          'Notificações',
        ].map((text, index) => (
          <ListItem button key={text} onClick={() => handleDrawerOption(text)}>
            <ListItemIcon>{drawerIcon(index)}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
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
            <Typography variant="h6" noWrap>
              {translations[location.pathname.substring(1)]}
            </Typography>
          </div>
          <div>
            <IconButton>
              <AccountCircleIcon style={{ color: 'black', fontSize: 30 }} />
            </IconButton>
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
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default ResponsiveDrawer;
