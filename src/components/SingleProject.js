import { useState } from 'react';

import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ATag from '@mui/material/Link';
import Popover from '@mui/material/Popover';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useGlobalContext } from '../context';

const SingleProject = (project) => {
  const { projectName, description, startDate, img, techStack, githubRepo, liveUrl, status } = project;

  let date = '';
  if (startDate) {
    date = startDate.split('T')[0];
  }

  const { openModal, setDialogProject } = useGlobalContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditButtonClick = () => {
    setDialogProject(project);
    openModal();
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <Card sx={{ maxWidth: '100%', bgcolor: '#eee', mb: 2 }}>
      <CardHeader
        action={
          <>
            <IconButton aria-label='settings' aria-describedby={id} variant='contained' onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box minWidth={100}>
                  <Button variant='text' color='primary' onClick={handleEditButtonClick} fullWidth sx={{ textAlign: 'left', display: 'block' }}>
                    Edit Project
                  </Button>
                </Box>
                <Box minWidth={100}>
                  <Button variant='text' color='primary' fullWidth sx={{ textAlign: 'left', display: 'block' }}>
                    Add to Archive
                  </Button>
                </Box>
              </Box>
            </Popover>
          </>
        }
        title={projectName}
        subheader={date}
      />
      <CardMedia component='img' height='194' image={img} alt='Paella dish' />
      <CardContent>
        <Typography
          variant='body2'
          color='text.secondary'
          textOverflow={'ellipsis'}
          overflow='hidden'
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardContent>
        {techStack.map((item, index) => {
          return <Chip key={index} size='small' label={item} color='primary' sx={{ mr: 0.5, mb: 0.5 }} />;
        })}
      </CardContent>

      <CardActions disableSpacing sx={{ px: 2 }}>
        <Chip label={status} color='primary' />
        <Box sx={{ ml: 'auto' }}>
          <ATag href={githubRepo}>
            <IconButton aria-label='github link'>
              <GitHubIcon />
            </IconButton>
          </ATag>
          <ATag href={liveUrl}>
            <IconButton aria-label='external link'>
              <LaunchOutlinedIcon />
            </IconButton>
          </ATag>
        </Box>
      </CardActions>
    </Card>
  );
};

export default SingleProject;
