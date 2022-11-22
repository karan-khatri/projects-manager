import React, { useContext, useReducer } from 'react';
import axios from 'axios';
import reducer from './utils/reducer';

const AppContext = React.createContext();

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  searchTerm: '',
  projectsStatus: 'current',
  projects: [],
  sortByDate: '',
  sortByName: 'projectName',
  loading: false,
  showModal: false,
  modalProjectId: '',
  modalProject: {},
  isEditing: false,
  dialogProject: {},
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
  },
};

const baseURL = 'https://projects-manager-api-react.herokuapp.com/api/v1';

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authorizedRequest = axios.create({
    baseURL: 'https://projects-manager-api-react.herokuapp.com/api/v1',
  });

  authorizedRequest.interceptors.request.use(
    (config) => {
      config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authorizedRequest.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.statusCode === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    dispatch({ type: 'UPDATE_USER_AND_TOKEN', payload: { user, token } });
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const registerUser = async (name, email, password) => {
    dispatch({ type: 'LOADING_TRUE' });

    try {
      const response = await axios.post(`${baseURL}/auth/register/`, { name, email, password });
      showSnackbar('User Registered Successfully!', 'success');
      const { user, token } = response.data;
      addUserToLocalStorage({ user, token });
    } catch (error) {
      console.log(error);
      showSnackbar(error.response.data.msg, 'error');
      dispatch({ type: 'LOADING_FALSE' });
    }
  };

  const setLoadingTrue = () => {
    dispatch({ type: 'LOADING_TRUE' });
  };

  const loginUser = async (email, password, endPoint) => {
    dispatch({ type: 'LOADING_TRUE' });

    try {
      const response = await axios.post(`${baseURL}/auth/${endPoint}`, { email, password });
      showSnackbar('Logged in Successfully!');
      const { user, token } = response.data;
      console.log(user, token);
      if (user && token) addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({ type: 'LOADING_FALSE' });
      showSnackbar(error.response.data.msg, 'error');
    }
  };

  const logoutUser = () => {
    removeUserFromLocalStorage();
  };

  const setProjectsStatus = (status) => {
    dispatch({ type: 'SET_PROJECTS_STATUS', payload: status });
  };

  const setSortByName = (sort) => {
    dispatch({ type: 'SET_SORT_BY_NAME', payload: sort });
  };

  const setSortByDate = (sort) => {
    dispatch({ type: 'SET_SORT_BY_DATE', payload: sort });
  };

  const setSearchTerm = (searchTerm) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: searchTerm });
  };

  const setDialogProject = (project) => {
    dispatch({ type: 'SET_DIALOG_PROJECT', payload: project });
  };

  const openModal = () => {
    dispatch({ type: 'OPEN_MODAL' });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const showSnackbar = (message, severity) => {
    dispatch({ type: 'SHOW_SNACKBAR', payload: { message, severity } });
  };

  const closeSnackbar = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: 'CLOSE_SNACKBAR' });
  };

  const addProject = async (project) => {
    dispatch({ type: 'LOADING_TRUE' });

    try {
      await authorizedRequest.post('/projects/', project);
      showSnackbar('Project added successfully', 'success');
      dispatch({ type: 'LOADING_FALSE' });
    } catch (error) {
      console.log(error);
      showSnackbar(error.response.data.msg, 'error');
    }
  };

  const updateProject = async (project) => {
    dispatch({ type: 'LOADING_TRUE' });
    const { id, projectName, description, startDate, img, techStack, githubRepo, liveUrl, status } = project;
    try {
      await authorizedRequest.patch(`/projects/${id}`, { projectName, description, startDate, img, techStack, githubRepo, liveUrl, status });
      showSnackbar('Project updated successfully', 'success');
      getProjects();
      dispatch({ type: 'LOADING_FALSE' });
    } catch (error) {
      showSnackbar(error.response.data.msg, 'error');
    }
  };

  const getProjects = async () => {
    dispatch({ type: 'LOADING_TRUE' });

    const { projectsStatus, sortByDate, sortByName, searchTerm } = state;
    let url = `/projects/${projectsStatus}?`;
    let sort = '';

    if (sortByDate) {
      sort = sort + sortByDate + ',';
    }

    if (sortByName) {
      sort = sort + sortByName;
    }

    sort += '&';
    url = url + 'sort=' + sort;

    if (searchTerm) {
      url = url + `search=${searchTerm}&`;
    }

    const response = await authorizedRequest.get(url);
    const tempData = response.data;
    console.log(tempData);
    dispatch({ type: 'SHOW_PROJECTS', payload: tempData });
    dispatch({ type: 'LOADING_FALSE' });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        getAllProjects: getProjects,
        setProjectsStatus,
        setSortByDate,
        setSearchTerm,
        setSortByName,
        setDialogProject,
        openModal,
        closeModal,
        addProject,
        updateProject,
        showSnackbar,
        closeSnackbar,
        setLoadingTrue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
