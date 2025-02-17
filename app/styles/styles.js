import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF0000',
            dark: "darkred"
        },
        secondary: {
            main: '#FFFFFF',
        },
    },

});

function ClickableFile({ fileResponse, handleDownload }) {
    return (
      <div
        onClick={() => handleDownload(fileResponse.id)}
        style={{
          cursor: 'pointer',
          color: 'black',
          textDecoration: 'none',
        }}
        onMouseOver={(e) => {
          e.target.style.color = 'blue';
          e.target.style.textDecoration = 'underline';
        }}
        onMouseOut={(e) => {
          e.target.style.color = 'black';
          e.target.style.textDecoration = 'none';
        }}
      >
        {fileResponse.fileName}
      </div>
    );
  }

export default theme;