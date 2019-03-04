import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleButton as toggleButtonCreator } from '../../redux/actions/actions';

const styles = theme => ({
  colorBar: {},
  colorChecked: {},
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

class CustomizedSwitches extends React.Component {
  handleChange = name => (event) => {
    const { toggleButtonCreator } = this.props;
    toggleButtonCreator(event.target.checked);
    // this.setState({ ...event.state, [name]: event.target.checked });
  };

  render() {
    const { classes, settings } = this.props;
    console.log(this.props);
    // const { checkedB } = this.state;

    return (
      <FormGroup row>
        <FormControlLabel
          control={(
            <Switch
              classes={{
                switchBase: classes.iOSSwitchBase,
                bar: classes.iOSBar,
                icon: classes.iOSIcon,
                iconChecked: classes.iOSIconChecked,
                checked: classes.iOSChecked,
              }}
              disableRipple
              checked={settings.button}
              onChange={this.handleChange('checkedB')}
              value="checkedB"
            />
          )}
          label="Disable"
        />
      </FormGroup>
    );
  }
}

CustomizedSwitches.propTypes = {
  classes: PropTypes.object.isRequired,
  checked: PropTypes.object.isRequired,
};

CustomizedSwitches.defaultProps = {
  checked: false,
  settings: {},
};


const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleButtonCreator }, dispatch);

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CustomizedSwitches));