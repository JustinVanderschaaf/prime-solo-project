import React from "react";

import { useDispatch, useSelector } from "react-redux";

function ProjectList() {
  const projectImages= useSelector((store) => store.projectImageReducer);
  const user = useSelector((store) => store.user);
  console.log("this is user",user );
  console.log("projectPhotos is ", projectImages);

  return (
    <div className="container">
      <ul>
        {projectImages.map((photo) => (
          <li key={photo.url} className="photo">
            {photo.subtitle} <img src={`uploads/${photo.url}`} />{" "}
            {/* {user.id === photo.user_id && <Delete itemId={photo.id} />} */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
