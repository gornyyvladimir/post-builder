import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PostEditor from './components/pages/PostEditor';

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <PostEditor />
      </>
    );
  }
}

export default App;
