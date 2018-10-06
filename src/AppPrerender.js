import React from 'react';
import ReactDOMServer from 'react-dom/server'

import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';

import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Theme from './Theme';
import Loading from './components/Loading';

  const flexToolbar = {
    display: 'flex',
    justifyContent: 'space-between'
  }
  // title: {
  //   flex: 1,
  //   textDecoration: "none",
  //   color: theme.palette.common.white
  // }

const sheetsRegistry = new SheetsRegistry();

const sheetsManager = new Map();
const generateClassName = createGenerateClassName();

const Shell =  (props) => {
  return (
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={Theme} sheetsManager={sheetsManager}>
        <CssBaseline />
      <AppBar>
        <Toolbar style={flexToolbar}>
          <Typography variant="title" color="inherit">React Users</Typography>
        </Toolbar>
      </AppBar>
      <Loading/>
      </MuiThemeProvider>
    </JssProvider>
  )
}


const prerender = () => {
  const html = ReactDOMServer.renderToString(<Shell/>);
  const css = sheetsRegistry.toString()
  return `<style id="css-server-side">${css}</style>${html}`;
}


export default prerender;
