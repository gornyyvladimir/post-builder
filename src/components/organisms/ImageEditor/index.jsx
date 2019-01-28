import React, { Component } from 'react';
import html2canvas from 'html2canvas';
import styles from './ImageEditor.module.css';
import download from 'downloadjs';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
          if (this.props.handleFile) {
            this.props.handleFile(img);
          }
        });
      },
    );
  };

  render() {
    const { vertical, horizontal, file, width, height, scale } = this.state;
    return (
      <div className={styles.wrapper}>
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
              <h1 className={styles.title} contentEditable="true" suppressContentEditableWarning="true">
                Страна из Казани
              </h1>
              <p className={styles.text} contentEditable="true" suppressContentEditableWarning="true">
                Горящие туры на вылет <br />с 1 по 31 января
              </p>
              <h2 className={styles.price} contentEditable="true" suppressContentEditableWarning="true">
                От 30 000 рублей
              </h2>
            </div>
            <div className={styles.sale}>
              <h2 className={styles.discount} contentEditable="true" suppressContentEditableWarning="true">
                -30%
              </h2>
            </div>
          </div>
        </div>
        <div className={styles.itemWrapper}>
          <input type="file" onChange={this.handleUpload} />
        </div>
        <div className={styles.itemWrapper}>
          <Typography htmlFor="vertical" component="label">
            Vertical
          </Typography>
          <input
            value={vertical}
            type="range"
            min="0"
            max="100"
            id="vertical"
            onChange={event => this.handleChange(event.target.value, 'vertical')}
          />
        </div>
        <div className={styles.itemWrapper}>
          <Typography htmlFor="horizontal" component="label">
            Horizontal
          </Typography>
          <input
            value={horizontal}
            type="range"
            min="0"
            max="100"
            id="horizontal"
            onChange={event => this.handleChange(event.target.value, 'horizontal')}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="outlined" color="secondary" onClick={this.props.onClose}>
            Отмена
          </Button>
          <Button variant="outlined" color="primary" onClick={this.handleClick}>
            Сохранить
          </Button>
        </div>
      </div>
    );
  }
}

export default ImageEditor;
