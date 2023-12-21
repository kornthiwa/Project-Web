// import React from 'react';
// import TextField from '@mui/material/TextField';
// import { makeStyles } from '@mui/material/styles';

// const useStyles = makeStyles({
//   root: {
//     border: '1px solid #dddddd',
//     overflow: 'hidden',
//     borderRadius: 5,
//     backgroundColor: '#ffffff',
//     '&:hover': {
//       backgroundColor: '#fff',
//     },
//     '&.Mui-focused': {
//       backgroundColor: '#fff',
//       boxShadow: `0 2px 4px 0 rgba(176, 73, 149, 0.21)`,
//       borderColor: '#b04995',
//     },
//     '&.Mui-error': {
//       borderColor: '#b04995',
//     },
//   },
//   textField: {
//     fontFamily: 'Muli',
//     '& .MuiInputLabel-root': {
//       color: '#8f8f8f',
//       fontSize: 12,
//       fontFamily: 'Muli',
//       top: 17,
//       left: 13,
//       transform: 'none', // No longer needed in MUI 5
//     },
//     '& .MuiInputLabel-root.Mui-error': {
//       color: '#b04995',
//     },
//     '& .MuiInput-underline:hover:not(.Mui-disabled):before': { // Adjusted for underline
//       borderBottom: `1px solid #b04995`,
//     },
//     '& .MuiInput-underline:after': { // Adjusted for underline
//       borderBottom: `1px solid #dddddd`,
//     },
//     '& input': {
//       color: 'black',
//       fontSize: 14,
//       fontWeight: 600,
//       padding: '26px 12px 0',
//       transition: 'padding 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
//     },
//     '& .MuiInput-filled .MuiInput-input': { // Adjusted for filled input
//       padding: '35px 12px 14px',
//     },
//     '& .Mui-focused .MuiInput-input': { // Adjusted for focused input
//       padding: '35px 12px 14px',
//     },
//     '& .MuiFormHelperText-root.Mui-error': {
//       color: '#b04995',
//       fontFamily: 'Muli',
//       fontSize: 12,
//     },
//   },
// });

// function CustomTextField({ label, input, meta: { touched, error }, ...other }) {
//   const classes = useStyles();

//   return (
//     <TextField
//       label={label}
//       error={touched && error}
//       helperText={touched && error}
//       fullWidth
//       variant="filled" // Adjusted for MUI 5 variant
//       classes={{ root: classes.root, input: classes.textField }}
//       {...input}
//       {...other}
//     />
//   );
// }

// export default CustomTextField;
