import { useRef } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useGlobalContext } from '../context';

const AddNewProject = () => {
  const { addProject } = useGlobalContext();

  const projectNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const startDateRef = useRef(null);
  const statusRef = useRef(null);
  const imgUrlRef = useRef(null);
  const techStackRef = useRef(null);
  const githubRepoRef = useRef(null);
  const liveUrlRef = useRef(null);

  const handleSubmit = () => {
    const project = {
      projectName: projectNameRef.current.value,
      description: descriptionRef.current.value,
      startDate: startDateRef.current.value,
      status: statusRef.current.value,
      imgUrl: imgUrlRef.current.value,
      techStack: techStackRef.current.value.split(', '),
      githubRepo: githubRepoRef.current.value,
      liveUrl: liveUrlRef.current.value,
    };

    addProject(project);
  };

  return (
    <Grid container justifyContent={'center'} sx={{ pt: 3 }}>
      <Grid item xs={12}>
        <Typography variant={'h4'} align='center'>
          Add New Project
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField margin='normal' id='name' label='Project Name' type='text' inputRef={projectNameRef} fullWidth />

        <TextField multiline margin='normal' id='description' label='Description' type='text' inputRef={descriptionRef} fullWidth />

        <TextField margin='normal' id='startDate' label='' type='date' inputRef={startDateRef} fullWidth />

        <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
          <InputLabel id='project-status-label'>Project Status</InputLabel>

          <Select labelId='project-status-label' id='project-status' label='Porject Status' defaultValue={'current'} inputRef={statusRef}>
            <MenuItem selected value={'current'}>
              Current
            </MenuItem>
            <MenuItem value={'archived'}>Archived</MenuItem>
            <MenuItem value={'completed'}>Completed</MenuItem>
          </Select>
        </FormControl>

        <TextField margin='normal' id='img' label='Image URL' type='url' inputRef={imgUrlRef} fullWidth />

        <TextField margin='normal' id='techStack' label='Tech Stack' type='text' inputRef={techStackRef} fullWidth />

        <TextField margin='normal' id='githubRepo' label='Github Repo' type='url' inputRef={githubRepoRef} fullWidth />

        <TextField margin='normal' id='liveUrl' label='Live URL' type='url' inputRef={liveUrlRef} fullWidth />

        <Button variant='contained' color='primary' sx={{ mt: 2 }} onClick={handleSubmit}>
          Add Project
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddNewProject;
