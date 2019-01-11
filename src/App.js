import React, { Component } from 'react';
import PostEditor from './components/pages/PostEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <PostEditor />
        </main>
      </div>
    );
  }
}

export default App;
