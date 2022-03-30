import axios from "axios";

/**
 * Adds a new account to the database.
 * 
 * @param {*} auth0Id The Auth0 ID of the current user.
 * @param {*} user The user object containing the name and email to POST
 */
export async function addNewAccount(auth0Id, user) {
  const account = {
    auth0Id: auth0Id,
    name: user.name,
    email: user.email,
    workspaces: []
  };

  let response;

  await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/add/`, account)
    .then((res) => {
      response = res;
    });

  return response;
}

/**
 * Request a workspace's information
 * 
 * @param {*} workspaceId The workspace's id you'd like to retrieve
 */
export async function getWorkspaceInfo(workspaceId) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/${workspaceId}`);
}

/**
 * Request a workspace's stored text
 * 
 * @param {*} workspaceId The workspace's id you'd like to retrieve
 */
export async function getWorkspaceText(workspaceId) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/texts/byWorkspace/${workspaceId}`);
}

/**
 * Add a new workspace to the database for the given user.
 * 
 * @param {*} workspaceName The name of the workspace.
 * @param {*} accountId     The owner of the workspace.
 * @returns 
 */
export async function addNewWorkspace(workspaceName, accountId) {
  let response;
  const newWorkspace = {
    name: workspaceName,
    owner: accountId,
    collaborators: [],
    isPublic: false,
    texts: [],
    creationDate: Date.now(),
    updateDate: null,
    deleteDate: null
  };

  await axios.post(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/add/`, newWorkspace)
    .then((res) => {
      response = res;
    });
  
  return response;
}

/**
 * Update the given user's list of workspaces.
 * 
 * @param {*} id            The id of the user.
 * @param {*} workspaceIds  The new list of workspaces for the user.
 */
export async function updateAccountWorkspaces(id, workspaceIds) {
  await axios.patch(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/update/${id}`, {workspaces: workspaceIds});
}

/**
 * Update the given workspace.
 * 
 * @param {*} id        The id of the workspace.
 * @param {*} workspace This contains any new updates for the given workspace.
 */
export async function updateWorkspace(id, workspace) {
  await axios.patch(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/update/${id}`, workspace);
}

/**
 * Request for the workspaces that a user owns.
 * 
 * @param {*} accountId The id of the user.
 */
export async function getOwnedWorkspaces(accountId) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/byOwner/${accountId}/`);
}

/**
 * Request for the workspaces that a user is a collaborator of.
 * 
 * @param {*} email The email of the user, which is listed in a workspace's list of collaborators.
 */
export async function getCollabWorkspaces(email) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/byCollaborator/${email}/`);
}

/**
 * Request for a user's account based on the email given.
 * 
 * @param {*} email The email of the user.
 */
export async function getAccountByEmail(email) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/byEmail/${email}`);
}

/**
 * Request for a user's account based on the Auth0 id given.
 * 
 * @param {*} auth0Id The Auth0 id of the user.
 */
export async function getAccountByAuth0Id(auth0Id) {
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/accounts/auth0/${auth0Id}`);
}

/**
 * Delete the text with the given id.
 * 
 * @param {*} id The id of the text.
 */
export async function deleteText(id) {
  await axios.delete(`${process.env.REACT_APP_BACKEND_SERVER}/texts/${id}`);
}
