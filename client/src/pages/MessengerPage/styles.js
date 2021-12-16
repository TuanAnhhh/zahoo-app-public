import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme)=> ({
    messenger: {
        height:"100vh",
        display:"flex",
    },
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em'
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
        }
      },

}))