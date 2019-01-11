import React, { Component } from 'react';
import { Emojione, Twemoji } from 'react-emoji-render';
import { emojify } from 'react-emojione';
import { Picker } from 'emoji-mart';
import classNames from 'classnames';
import 'emoji-mart/css/emoji-mart.css';
import TextArea from '../../atoms/TextArea';
import styles from './PostEditor.module.css';

class PostEditor extends Component {
  state = {
    text: '',
    cursorPosition: 0,
    showPicker: false,
  };

  textareaRef = React.createRef();

  handleChange = event => {
    this.setState({ text: emojify(event.target.value, { output: 'unicode' }) });
  };

  addEmoji = emoji => {
    this.setState(prevState => {
      const textBefore = prevState.text.slice(0, prevState.cursorPosition);
      const textAfter = prevState.text.slice(prevState.cursorPosition);
      return { text: textBefore + emoji.native + textAfter };
    });
  };

  handleBlur = event => {
    this.setState({ cursorPosition: event.target.selectionStart });
  };

  handleClick = () => {
    console.log(this.textareaRef.current);
    this.textareaRef.current.select();
    document.execCommand('copy');
    alert('Copy success');
  };

  handleTogglePicker = () => {
    this.setState(prevState => ({ showPicker: !prevState.showPicker }));
  };

  // This ❤️ sentence includes :+1: a variety of emoji types :)

  render() {

    const displayMode = !this.state.showPicker ? 'none' : '';

    return (
      <>
        <Picker
          set='apple'
          onSelect={this.addEmoji}
          style={{ position: 'absolute', bottom: '20px', left: '20px', display: displayMode}}
        />
        <button onClick={this.handleTogglePicker}>Emoji</button>
        <div className={styles.wrapper}>
          <div className={styles.flexItem}>
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              onBlur={this.handleBlur}
              ref={this.textareaRef}
              className={styles.textarea}
            />
          </div>
          <div className={styles.flexItem}>
            <Twemoji svg className={styles.emojiText} text={this.state.text} />
          </div>
        </div>
        <button onClick={this.handleClick}>Copy</button>
      </>
    );
  }
}

export default PostEditor;
