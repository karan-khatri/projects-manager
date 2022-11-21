import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { useGlobalContext } from '../context';
import { useNavigate } from 'react-router-dom';

import SingleProject from './SingleProject';
import Loading from './Loading';
import { Typography } from '@mui/material';

const ProjectsSection = () => {
  const navigate = useNavigate();

  const { loading, user, token, getAllProjects, projects, projectsStatus, setProjectsStatus, sortByDate, sortByName, setSortByName, setSortByDate, searchTerm, setSearchTerm } = useGlobalContext();

  useEffect(() => {
    if (!(user && token)) {
      // showSnackbar('You must be logged in to view this page', 'error');
      navigate('/auth/login');
    } else {
      getAllProjects();
    }
  }, [projectsStatus, sortByDate, sortByName, searchTerm]); // eslint-disable-line

  return (
    <Grid container spacing={2} sx={{ pt: 4 }}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
          <Box minWidth={250} sx={{ mr: 3, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='sort-by-label'>Sort By</InputLabel>

              <Select
                labelId='sort-by-label'
                id='demo-simple-select'
                value={sortByName !== '' ? sortByName : ''}
                label='Sort By'
                defaultChecked={''}
                onChange={(e) => {
                  setSortByName(e.target.value);
                }}
              >
                <MenuItem value={''}>Select</MenuItem>
                <MenuItem value={'projectName'}>A-Z</MenuItem>
                <MenuItem value={'-projectName'}>Z-A</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box minWidth={250} sx={{ mr: 3, mb: 2 }}>
            <FormControl fullWidth>
              <InputLabel id='sort-by-label'>Sort By</InputLabel>

              <Select
                labelId='sort-by-label'
                id='demo-simple-select'
                value={sortByDate !== '' ? sortByDate : ''}
                label='Sort By'
                defaultChecked={'current'}
                onChange={(e) => {
                  setSortByDate(e.target.value);
                }}
              >
                <MenuItem value={''}>Select</MenuItem>
                <MenuItem selected value={'-startDate'}>
                  Newest First
                </MenuItem>
                <MenuItem value={'startDate'}>Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box minWidth={250} sx={{ mr: 3, mb: 2 }}>
            <TextField
              fullWidth
              placeholder='searchTerm'
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </Box>

          <Box maxWidth={250} width={'100%'} sx={{ ml: { xs: '', md: 'auto' } }}>
            <FormControl fullWidth>
              <InputLabel id='project-status-label'>Project Status</InputLabel>

              <Select
                labelId=''
                id='project-status'
                value={projectsStatus}
                label='Porject Status'
                defaultChecked={'current'}
                onChange={(e) => {
                  setProjectsStatus(e.target.value);
                  navigate(`/dashboard/projects/${e.target.value}`);
                }}
              >
                <MenuItem value={'current'}>Current</MenuItem>
                <MenuItem value={'archived'}>Archived</MenuItem>
                <MenuItem value={'completed'}>Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Button variant='contained' color='primary' onClick={() => navigate('/dashboard/projects/new')}>
          Add New Project
        </Button>
      </Grid>

      {loading ? (
        <Grid item xs={12}>
          <Loading />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <Typography variant='h3' sx={{ mb: 2 }} fontWeight={600} align='center'>
            Projects
          </Typography>
        </Grid>
      )}
      {!loading &&
        projects.map((project) => {
          const { _id: id, projectName, description, startDate, img, techStack, githubRepo, liveUrl, status } = project;

          return (
            <Grid key={id} item xs={12} md={4}>
              <SingleProject projectID={id} projectName={projectName} description={description} startDate={startDate} img={img} techStack={techStack} githubRepo={githubRepo} liveUrl={liveUrl} status={status} />
            </Grid>
          );
        })}
    </Grid>
  );
};
export default ProjectsSection;
