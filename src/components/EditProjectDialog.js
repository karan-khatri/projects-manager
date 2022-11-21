import { useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useGlobalContext } from '../context';

const EditProjectDialog = () => {
  const { isEditing, dialogProject, closeModal, updateProject, getAllProjects } = useGlobalContext();

  const projectNameRef = useRef(null);
  const descriptionRef = useRef(null);
  const startDateRef = useRef(null);
  const statusRef = useRef(null);
  const imgUrlRef = useRef(null);
  const techStackRef = useRef(null);
  const githubRepoRef = useRef(null);
  const liveUrlRef = useRef(null);

  let date = '';
  let parsedTechStack = '';

  if (dialogProject.startDate) {
    date = dialogProject.startDate.split('T')[0];
  }

  if (dialogProject.techStack) {
    parsedTechStack = dialogProject.techStack.map((tech) => tech).join(', ');
  }

  const handleSubmit = () => {
    const updatedProject = {
      id: dialogProject?.projectID,
      projectName: projectNameRef.current.value,
      description: descriptionRef.current.value,
      startDate: startDateRef.current.value,
      status: statusRef.current.value,
      imgUrl: imgUrlRef.current.value,
      techStack: techStackRef.current.value.split(', '),
      githubRepo: githubRepoRef.current.value,
      liveUrl: liveUrlRef.current.value,
    };

    updateProject(updatedProject);
    getAllProjects();
  };

  return (
    <div>
      <Dialog
        open={isEditing}
        onClose={() => {
          closeModal();
        }}
      >
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <TextField margin='normal' id='name' label='Project Name' type='text' defaultValue={dialogProject?.projectName} inputRef={projectNameRef} fullWidth />

          <TextField multiline margin='normal' id='description' label='Description' type='text' defaultValue={dialogProject?.description} inputRef={descriptionRef} fullWidth />

          <TextField margin='normal' id='startDate' label='Start Date' type='date' inputRef={startDateRef} defaultValue={date} fullWidth />

          <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
            <InputLabel id='project-status-label'>Project Status</InputLabel>

            <Select labelId='project-status-label' id='project-status' label='Porject Status' defaultValue={dialogProject?.status} inputRef={statusRef}>
              <MenuItem value={'current'}>Current</MenuItem>
              <MenuItem value={'archived'}>Archived</MenuItem>
              <MenuItem value={'completed'}>Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField margin='normal' id='img' label='Image URL' type='url' inputRef={imgUrlRef} defaultValue={dialogProject?.img} fullWidth />

          <TextField margin='normal' id='techStack' label='Tech Stack' type='text' inputRef={techStackRef} defaultValue={parsedTechStack} fullWidth />

          <TextField margin='normal' id='githubRepo' label='Github Repo' type='url' inputRef={githubRepoRef} defaultValue={dialogProject?.githubRepo} fullWidth />

          <TextField margin='normal' id='liveUrl' label='Live URL' type='url' inputRef={liveUrlRef} defaultValue={dialogProject?.liveUrl} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditProjectDialog;
