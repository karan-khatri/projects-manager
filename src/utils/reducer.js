const reducer = (state, action) => {
  const { type, payload } = action;

  if (type === 'LOADING_TRUE') {
    return { ...state, loading: true };
  }
  if (type === 'LOADING_FALSE') {
    return { ...state, loading: false };
  }

  if (type === 'SHOW_PROJECTS') {
    return { ...state, projects: payload.projects };
  }

  if (type === 'OPEN_MODAL') {
    return { ...state, isEditing: true };
  }

  if (type === 'OPEN_MODAL_WITH_PROJECT_ID') {
    return { ...state, modalTaskId: payload, showModal: true };
  }

  if (type === 'SET_PROJECTS_STATUS') {
    return { ...state, projectsStatus: payload };
  }

  if (type === 'SET_SEARCH_TERM') {
    return { ...state, searchTerm: payload };
  }

  if (type === 'SET_SORT_BY_DATE') {
    return { ...state, sortByDate: payload };
  }

  if (type === 'SET_SORT_BY_NAME') {
    return { ...state, sortByName: payload };
  }

  if (type === 'SET_DIALOG_PROJECT') {
    return { ...state, dialogProject: payload };
  }

  if (type === 'CLOSE_MODAL') {
    return { ...state, isEditing: false, dialogProject: {} };
  }

  if (type === 'SET_MODAL_PROJECT') {
    return { ...state, modalTask: payload };
  }

  if (type === 'SHOW_SNACKBAR') {
    return { ...state, snackbar: { open: true, message: payload.message, severity: payload.severity } };
  }

  if (type === 'CLOSE_SNACKBAR') {
    return { ...state, snackbar: { open: false, message: state.snackbar.message, severity: state.snackbar.severity } };
  }

  if (type === 'UPDATE_USER_AND_TOKEN') {
    return { ...state, user: payload.user, token: payload.token };
  }

  if (type === 'CLEAR_MODAL_PROJECT_ID') {
    return { ...state, modalTaskId: '' };
  }

  if (type === 'SET_MODAL_PROJECT_ID') {
    return { ...state, modalTaskId: payload };
  }

  if (type === 'SET_MODAL_PROJECT') {
    return { ...state, modalTask: payload };
  }

  if (type === 'CLEAR_MODAL_PROJECT') {
    return { ...state, modalTask: {} };
  }

  throw new Error('No matching action');
};

export default reducer;
