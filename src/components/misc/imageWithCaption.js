/**
 * A component to present an image with a caption.
 */
import React from 'react';
import { CardMedia, Typography, Box } from '@mui/material';

function ImageWithCaption({ imageFile, number, caption, width, height }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: width,
          height: height,
        }}
      >
        <CardMedia
          component="img"
          width={width}
          height={height}
          image={imageFile}
          alt={caption}
        />
      </Box>
      <Box sx={{
          maxWidth: "1024px",
        }}>
      <Typography variant="body2" display="block" gutterBottom>
          <b>Figure {number}</b> {caption}
        </Typography>
      </Box>
    </Box>
  );
}

export default ImageWithCaption;
