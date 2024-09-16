import { useContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, FormLabel, 
    TextField, ToggleButtonGroup, ToggleButton, Typography, Tooltip } from '@mui/material';
import { GameContext } from '../context/game.context';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function PromptModal({ word, promptData, setPromptData }) {
  const { isPromptOpen, setIsPromptOpen, turnPlayer, reactionTypes, reactionEmojis } = useContext(GameContext)
  const defaultText = `${turnPlayer ? turnPlayer.name : '<player>'} was thinking about "${word ? word.toLowerCase() : '<word>'}" because`
  const [text, setText] = useState('')

  function handleInputChange(event) {
    setText(event.target.value)
  }

  function handleToggleChange(event, newReaction) {
    if (newReaction !== null) {
      setPromptData(prevState => ({ ...prevState, targetReaction: newReaction }));
    }
  }

  function OnOpen() {
    if (promptData) {
        setText(promptData?.promptText)
    } else {
        setPromptData({promptText: defaultText, targetReaction: 'funny'})
        setText(defaultText)
    }
  }

  function handleConfirm() {
    setPromptData(prevState => ({...prevState, promptText: text}));
    setIsPromptOpen(false)
  }

  function handleReset() {
    setIsPromptOpen(false)
    setPromptData(null)
    setText('')
  }

  return (
    <Dialog 
      open={isPromptOpen} 
      TransitionProps={{onEnter: OnOpen}}
      >
      <DialogTitle>Customize Prompt</DialogTitle>
      <DialogContent sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        }}>

        <FormControl>
            <FormLabel htmlFor="promptText">Choose a prompt for the GPT to complete</FormLabel>
            <TextField
                name="promptText"
                required
                fullWidth
                value={text}
                onChange={handleInputChange}
                multiline
                rows={3}
                slotProps={{
                    htmlInput: {maxLength: 50}
                }}
            />
        </FormControl>

        <FormControl>
            <FormLabel htmlFor="targetReaction">Choose the reaction you're aiming to get for the generated text</FormLabel>
            <ToggleButtonGroup
                name="targetReaction"
                value={promptData?.targetReaction}
                onChange={handleToggleChange}
                exclusive
                size='small'
            >
                {reactionTypes.map((reaction, index) =>
                    <Tooltip title={reaction} key={`${reaction}-target`}>
                        <ToggleButton value={reaction}>
                            <Typography variant="h4">{reactionEmojis[index]}</Typography>
                        </ToggleButton>
                    </Tooltip>
                )}
            </ToggleButtonGroup>
        </FormControl>
          
      </DialogContent>

      <DialogActions>
        <Button 
            onClick={handleConfirm} 
            sx={{ textTransform: 'none' }} 
            variant="contained"
            startIcon={<CheckCircleIcon />}
            >
                    Confirm
                </Button>
        <Button 
            onClick={handleReset} 
            sx={{ textTransform: 'none' }} 
            >
                    Reset
                </Button>
      </DialogActions>
        
    </Dialog>
  );
}

export default PromptModal;