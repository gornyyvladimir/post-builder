import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import styles from './ImageEditor.module.css';
import download from 'downloadjs';

const SCALE = 2;

class ImageEditor extends Component {
  initialState = {
    vertical: 0,
    horizontal: 0,
    scale: 1,
    width: 540,
    height: 540,
    file: null,
  };

  state = this.initialState;

  captureRef = React.createRef();

  handleChange = (value, type) => {
    this.setState({ [type]: value });
  };

  handleUpload = event => {
    if (this.state.file) {
      URL.revokeObjectURL(this.state.file);
    }
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleClick = () => {
    const prevState = this.state;
    this.setState(
      state => ({ scale: SCALE, width: state.width * SCALE, height: state.height * SCALE }),
      () => {
        html2canvas(this.captureRef.current).then(canvas => {
          const img = canvas.toDataURL('image/png');
          download(img, 'original', 'image/png');
          this.setState(prevState);
        });
      },
    );
  };

  render() {
    const { vertical, horizontal, file, width, height, scale } = this.state;
    return (
      <div>
        <div style={{ width: width, height: height }} className={styles.capture} id="capture" ref={this.captureRef}>
          <div className={styles.imageWrapper} id="image">
            <div
              style={{
                backgroundPosition: `${horizontal}% ${vertical}%`,
                backgroundImage: file ? `url(${file})` : null,
              }}
              className={styles.backgroundImage}
            />
            <div className={styles.frontImage} />
          </div>
          <div style={{ transform: `scale(${scale})` }} className={styles.textWrapper} id="text">
            <div className={styles.description}>
              <h1 className={styles.title} contentEditable="true">
                Таиланд из Казани
              </h1>
              <p className={styles.text} contentEditable="true">
                Горящие туры на вылет с 19 по 31 января
              </p>
              <h2 className={styles.price} contentEditable="true">
                От 52 900 рублей
              </h2>
            </div>
            <div className={styles.sale}>
              <h2 className={styles.discount} contenteditable="true">
                -0%
              </h2>
            </div>
          </div>
        </div>
        <input type="file" onChange={this.handleUpload} />
        <label>
          Vertical
          <input
            value={vertical}
            type="range"
            min="0"
            max="100"
            onChange={event => this.handleChange(event.target.value, 'vertical')}
          />
        </label>
        <label>
          Horizontal
          <input
            value={horizontal}
            type="range"
            min="0"
            max="100"
            onChange={event => this.handleChange(event.target.value, 'horizontal')}
          />
        </label>
        <button type="button" onClick={this.handleClick}>
          Capture
        </button>
        <div id="result" />
      </div>
    );
  }
}

export default ImageEditor;
