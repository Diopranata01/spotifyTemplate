import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CircularProgressWithLabel = (props) => {
    return (
        <Box position="relative" display="inline-flex">
          <CircularProgress variant="determinate" {...props} />
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="caption" component="div" color="text.inherit">
              {`${Math.round(props.value)}%`}
            </Typography>
          </Box>
        </Box>
      );
};

export default CircularProgressWithLabel;