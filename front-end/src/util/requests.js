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
export async function getWorkspaceInfo(workspaceId){
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/workspaces/${workspaceId}`);
}

/**
 * Request a workspace's stored text
 * 
 * @param {*} workspaceId The workspace's id you'd like to retrieve
 */
export async function getWorkspaceText(workspaceId){
  return await axios.get(`${process.env.REACT_APP_BACKEND_SERVER}/texts/byWorkspace/${workspaceId}`);
}