/* global chrome */
import { addNewAccount, getAccountByAuth0Id } from "./requests";

const getAccountFromDatabase = async (auth0Id) => {
  let result = await getAccountByAuth0Id(auth0Id);
  return result?.data[0];
};

const sendAuth0IdToExtension = async (auth0Id) => {
  if (chrome.runtime !== undefined) {
    window.localStorage.setItem("auth0Id", auth0Id);
    chrome.runtime.sendMessage(`${process.env.REACT_APP_EXTENSION_ID}`, { messageFromWeb: window.localStorage });
  }
};

export const getCurrentAccountId = async (user) => {
  let userId = user.sub;
  let auth0Id = userId.replace("|", "-");	// Must replace "|" to allow for GET query
  let account = await getAccountFromDatabase(auth0Id);

  sendAuth0IdToExtension(auth0Id);

  // If the account was not found in the database, then it's new and must be posted.
  if (account) {
    return account._id;
  } else {
    let newAccount = await addNewAccount(auth0Id,user);
    return newAccount.data._id;
  }
};
