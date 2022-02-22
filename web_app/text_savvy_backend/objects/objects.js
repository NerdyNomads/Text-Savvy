const Account = {
  external_log: false,
  is_created: false,
  email: '',
  username: '',
  password: ''
};

const Workspace = {
  name: '',
  owner: '',
  collaborators: [],
  is_public: false,
  workspace_create_date: new Date(),
  workspace_update_date: '',
  workspace_delete_date: '',
  text_content_list: []
};

const Text_Content = {
  name: '',
  text: '',
  source: '',
  text_create_date: new Date(),
  text_update_date: '',
  text_delete_date: ''
};

// Exporting objects
export { Account, Workspace, Text_Content };