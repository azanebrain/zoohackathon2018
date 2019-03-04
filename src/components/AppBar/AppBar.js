import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Switch from '../Switch/Switch';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 0,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  render() {
    const {
      classes,
      count: { count },
      settings,
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Switch button={settings.button} />
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Material-UI
            </Typography>
            <div className={classes.grow} />
            <div>
              <IconButton
                aria-owns="material-appbar"
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Badge badgeContent={count} color="secondary">
                  <AccountCircle />
                </Badge>
              </IconButton>
              <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                <CloseIcon onClick={window.close} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


PrimarySearchAppBar.defaultProps = {
  count: 0,
};

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number,
};

export default withStyles(styles)(PrimarySearchAppBar);
