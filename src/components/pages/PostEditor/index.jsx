import React, { Component } from 'react';
import { Twemoji } from 'react-emoji-render';
import { emojify } from 'react-emojione';
import { Picker } from 'emoji-mart';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/FavoriteOutlined';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FaceIcon from '@material-ui/icons/TagFaces';
import CommentIcon from '@material-ui/icons/ModeCommentOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import red from '@material-ui/core/colors/red';
import AppBar from '../../organisms/AppBar';
import 'emoji-mart/css/emoji-mart.css';
import instagramPost from './instagram.png';
import postTemplates from './templates';

const styles = theme => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  button: {
    margin: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  templateButton: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  container: {
    padding: theme.spacing.unit * 2,
  },
  textField: {
    width: '100%',
  },
  textFieldWrapper: {
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '100%', // 1:1
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  company: {
    fontWeight: '500',
    marginRight: '4px',
  },
  emojiText: {
    whiteSpace: 'pre-wrap',
  },
});

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

  handleClick = (event) => {
    // window.a = {text: this.textareaRef.current.value};
    const text = this.textareaRef.current.value.replace(/\n{2,}/g, '\n⠀\n');
    prompt("Copy to clipboard: Ctrl+C, Enter", text);
    // this.textareaRef.current.select();
    // document.execCommand('copy');
    // alert('Copy success');
  };

  handleTogglePicker = () => {
    this.setState(prevState => ({ showPicker: !prevState.showPicker }));
  };

  handleClickAway = () => {
    this.setState(prevState => ({ showPicker: false }));
  };

  handleTemplateClick = text => {
    this.setState({ text });
  };

  // This ❤️ sentence includes :+1: a variety of emoji types :)

  render() {
    const { classes } = this.props;

    return (
      <>
        <header>
          <AppBar />
        </header>
        <main>
          <Grid className={classes.root} container>
            <Grid item xs={12} sm={10}>
              <Grid container spacing={24} className={classes.container}>
                <Grid item xs={12} sm={8}>
                  {postTemplates.map((item, index) => (
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.templateButton}
                      onClick={() => this.handleTemplateClick(item)}
                      key={index}
                    >
                      {`Template ${index + 1}`}
                    </Button>
                  ))}
                  <div className={classes.textFieldWrapper}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Description editor"
                      multiline
                      rows="22"
                      rowsMax="28"
                      className={classes.textField}
                      value={this.state.text}
                      onChange={this.handleChange}
                      onBlur={this.handleBlur}
                      inputRef={this.textareaRef}
                      margin="none"
                      helperText={`${this.state.text.length} characters, max 2000`}
                      variant="outlined"
                    />
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                      <div>
                        {this.state.showPicker && (
                          <Picker
                            set="apple"
                            onSelect={this.addEmoji}
                            style={{ position: 'absolute', top: '0', right: '0', zIndex: '1300' }}
                          />
                        )}
                      </div>
                    </ClickAwayListener>
                  </div>
                  <div className={classes.buttons}>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={this.handleClick}>
                      Copy
                    </Button>
                    <IconButton color="primary" aria-label="Emoji" onClick={this.handleTogglePicker}>
                      <FaceIcon />
                    </IconButton>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="Nautilus logo" className={classes.avatar}>
                          N
                        </Avatar>
                      }
                      action={
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title="nautilustour"
                      subheader="Kazan, Tatarstan"
                    />
                    <CardMedia className={classes.media} image={instagramPost} title="Instagram post" />
                    <CardContent>
                      <Typography component="div">
                        <Typography className={classes.company} component="span" inline>
                          nautilustour
                        </Typography>
                        <Twemoji svg className={classes.emojiText} text={this.state.text} />
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                      <IconButton aria-label="Add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="Comment">
                        <CommentIcon />
                      </IconButton>
                      <IconButton aria-label="Share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </main>
      </>
    );
  }
}

export default withStyles(styles)(PostEditor);
