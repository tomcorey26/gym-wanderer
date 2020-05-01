import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { useMeQuery, useLogoutMutation } from '@gw/controllers';
import { setAccessToken } from '../../accessToken';
import { useNavStyles } from './NavStyles';
import { useDropdownMenu } from '../../hooks';

export const Navbar = () => {
  const classes = useNavStyles();
  const history = useHistory();
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

  const clearMenu = () => {
    handleMenuClose();
    handleAlertMenuClose();
    handleMobileMenuClose();
  };
  const IsLoggedIn = !loading && data && data.me;
  const loggedInWithoutGym = IsLoggedIn && !data?.me?.gym;
  const loggedInWithGym = IsLoggedIn && data?.me?.gym;

  let body: any = null;
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <span>{data.me.username}</span>;
  } else {
    // body = <span>not logged in</span>;
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
      {IsLoggedIn && (
        <NavLink to={`/user/${data?.me?.id}`} style={menuItemStyle}>
          <MenuItem onClick={clearMenu}>My Profile</MenuItem>
        </NavLink>
      )}
      {!IsLoggedIn && [
        <NavLink key={1} to="/login" style={menuItemStyle}>
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
        </NavLink>,
        <NavLink key={2} to="/register" style={menuItemStyle}>
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
        </NavLink>,
      ]}
      {!loading && data && data.me ? (
        <MenuItem
          onClick={async () => {
            handleMenuClose();
            history.push('/');
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
      {data && data.me && data.me.alerts && data.me.alerts.length > 0 ? (
        data.me.alerts.map((alert, i) => (
          <NavLink key={i} to={alert.link} style={menuItemStyle}>
            <MenuItem onClick={clearMenu}>{alert.message}</MenuItem>
          </NavLink>
        ))
      ) : (
        <MenuItem>No new alerts</MenuItem>
      )}
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
      {IsLoggedIn ? (
        <>
          <MenuItem onClick={handleAlertMenuOpen}>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge
                badgeContent={data?.me?.alerts?.length || 0}
                color="secondary"
              >
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
        </>
      ) : (
        <>
          <StyledLink
            to="/register"
            color="black"
            onClick={handleMobileMenuClose}
          >
            <MenuItem>
              <IconButton color="inherit">
                <AccountBoxIcon />
              </IconButton>
              <p>Create Account</p>
            </MenuItem>
          </StyledLink>

          <StyledLink to="/login" color="black" onClick={handleMobileMenuClose}>
            <MenuItem>
              <IconButton color="inherit">
                <LockOpenIcon />
              </IconButton>
              <p>Login</p>
            </MenuItem>
          </StyledLink>
        </>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link style={{ color: 'white', textDecoration: 'none' }} to="/">
              Gym Wanderer
            </Link>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!IsLoggedIn && (
              <>
                <div style={{ marginRight: 16 }}>
                  <StyledLink to="/register">
                    <h2>Create Account</h2>
                  </StyledLink>
                </div>
                <div>
                  <StyledLink to="/login">
                    <h2>Login</h2>
                  </StyledLink>
                </div>
              </>
            )}

            {IsLoggedIn && (
              <>
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
            {IsLoggedIn && (
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
            )}
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

export const StyledLink: React.FC<any> = ({
  children,
  to,
  color = 'white',
  ...props
}) => (
  <Link {...props} to={to} style={{ color: color, textDecoration: 'none' }}>
    {children}
  </Link>
);
