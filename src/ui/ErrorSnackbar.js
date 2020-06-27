import React, { useState } from 'react'
import {IconButton, Snackbar} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
// import { useDispatch } from 'react-redux'

export default function ErrorSnackbar({stateError}) {
  const [close, setClose] = useState(false)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
      open={stateError !== null && close === false}
      autoHideDuration={5000}
      onClose={() => {setClose(true)}}
      message={stateError}
      action={
      <IconButton size="small" aria-label="close" color="inherit" onClick={() => {setClose(true)}}>
          <CloseIcon fontSize="small" />
      </IconButton>
      }
    />
  )
}
