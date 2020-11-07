export default {
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff'
    }
  },
  spreadThis: {
    typography: {
      useNextVariants: true
    },
    form:{
      textAlign: 'center'
    },
    pageTitle: {
      margin: '20px auto'
    },
    button:{
      marginTop: '40px',
      position: 'relative',
    },
    textField: {
      margin: '0 10px 10px 0'
    },
    customError:{
      color: 'red',
      fontSize: '0.8rem'
    },
    progress:{
      width: "30px",
      height: "30px",
      display: "block",
      margin: "10px auto 0",
    },
    
    profile: {
      padding: '20px',
      textAlign: 'center',
  
      '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%'
          }
      },
      '& .profile-image': {
          width: 200,
          height: 200,
          objectFit: 'cover',
          maxWidth: '100%',
          borderRadius: '50%'
      },
      '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
          verticalAlign: 'middle'
          },
          '& a': {
          color: '#00bcd4'
          }
      },
      '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
      },
      '& svg.button': {
          '&:hover': {
          cursor: 'pointer'
          }
      }
    },
  },
};