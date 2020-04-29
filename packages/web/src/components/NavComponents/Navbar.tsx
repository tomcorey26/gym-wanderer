import React from 'react';
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { NavLink, Link } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '@gw/controllers';
import { setAccessToken } from '../../accessToken';
import { useNavStyles } from './NavStyles';
import { useDropdownMenu } from '../../hooks';

export const Navbar = () => {
  const classes = useNavStyles();

  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const [
    anchorEl,
    handleProfileMenuOpen,
    handleMenuClose,
    isMenuOpen,
  ] = useDropdownMenu();
  const [
    alertAnchorEl,
    handleAlertMenuOpen,
    handleAlertMenuClose,
    isAlertMenuOpen,
  ] = useDropdownMenu();

  const [
    mobileMoreAnchorEl,
    handleMobileMenuOpen,
    handleMobileMenuClose,
    isMobileMenuOpen,
  ] = useDropdownMenu();

  const IsLoggedIn = !loading && data && data.me;
  const loggedInWithoutGym = IsLoggedIn && !data?.me?.gym;
  const loggedInWithGym = IsLoggedIn && data?.me?.gym;

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <span>{data.me.email}</span>;
  } else {
    body = <span>not logged in</span>;
  }

  const menuItemStyle = {
    color: 'inherit',
    textDecoration: 'none',
  };

  const menuId = 'account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <NavLink to={`/user/${data?.me?.id}`} style={menuItemStyle}>
        <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      </NavLink>
      {!IsLoggedIn && [
        <NavLink key={1} to="/login" style={menuItemStyle}>
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </NavLink>,
        <NavLink key={2} to="/register" style={menuItemStyle}>
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
        </NavLink>,
      ]}
      <NavLink to="/bye" style={menuItemStyle}>
        <MenuItem onClick={handleMenuClose}>bye</MenuItem>
      </NavLink>
      {!loading && data && data.me ? (
        <MenuItem
          onClick={async () => {
            handleMenuClose();
            await logout();
            setAccessToken('');
            await client!.resetStore();
          }}
        >
          Logout
        </MenuItem>
      ) : null}
    </Menu>
  );

  // NOTIFCATIONS MENU
  const alertId = 'alert-menu';
  const renderAlerts = (
    <Menu
      anchorEl={alertAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={alertId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAlertMenuOpen}
      onClose={handleAlertMenuClose}
      style={{ maxHeight: 600 }}
    >
      {data &&
        data.me &&
        data.me.alerts &&
        data.me.alerts.map((alert, i) => (
          <NavLink key={i} to={alert.link} style={menuItemStyle}>
            <MenuItem onClick={handleMenuClose}>{alert.message}</MenuItem>
          </NavLink>
        ))}
    </Menu>
  );

  const mobileMenuId = 'account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleAlertMenuOpen}>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
              Gym Wanderer
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {IsLoggedIn && (
              <>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                  onClick={handleAlertMenuOpen}
                >
                  <Badge
                    badgeContent={
                      data && data.me && data.me.alerts
                        ? data.me.alerts.length
                        : null
                    }
                    color="secondary"
                  >
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </>
            )}
            {loggedInWithoutGym ? (
              <StyledLink to="/newgym">
                <IconButton color="inherit">Create Gym</IconButton>
              </StyledLink>
            ) : null}
            {loggedInWithGym ? (
              <StyledLink to={`/gyms/${data?.me?.gym?.id}`}>
                <IconButton color="inherit">
                  <span style={{ marginRight: 3 }}>My Gym</span>
                  <FitnessCenterIcon color="inherit" />
                </IconButton>
              </StyledLink>
            ) : null}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <span style={{ marginRight: 3 }}>{body}</span> <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderAlerts}
    </div>
  );
};

const StyledLink: React.FC<any> = ({ children, to, ...props }) => (
  <Link {...props} to={to} style={{ color: 'white', textDecoration: 'none' }}>
    {children}
  </Link>
);
