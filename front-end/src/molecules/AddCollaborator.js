import React, {useEffect, useState} from "react";
import CollaboratorItem from "./CollaboratorItem";

import "./CollaboratorItem.css";

const componentName = "AddCollaborator";

const AddCollaborator = () => {


  const [ collaborators, setCollaborators ] = useState([]);

  useEffect(() => {

    // DO FETCH COLLABORATORS HERE
    const fakeCollabs = [ 
      // user1,
      // user2,
      // user3,
    ];

    //-----

    // reformat fakeCollabs to whatever structure we want
    // {
    //   email: "",
    //   id: "",
    //   pending: true or false
    // }

    setCollaborators(fakeCollabs);


  }, []);

  const renderCollaborators = () => collaborators.map( (co) =>
    <CollaboratorItem  key={Math.random()} text={co.email} pending={false}/>
  );

  return (
    <div className={`${componentName}`}>
      <div className={`${componentName}-add`}>
        {/* add collaborator input here */}
      </div>
      {renderCollaborators()}
    </div>
  );
};

export default AddCollaborator;
