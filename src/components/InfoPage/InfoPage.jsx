import React from "react";

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
   




<div className="infoContainer">
<div>
  <div className="infoContent">
<div>

  <h2>Technologies</h2>
<h4> HTML, JavaScript, PostreSQL, React, Redux, Node.js, Figma for my wireframing, CSS and Mui for Styling, and Multer for photo uploads</h4>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>

</div>

<h2>Challenge</h2>

The toughest challenge I overcame was learning Multer to send both a file and a title to Posgresql and then displaying the saved photo.
Now that you're able to create and share projects with everyone, I can't wait to build a feature where the users can send and receive messages about the projects that they are viewing or have created.

<h2>Thanks</h2>
I would like to say thanks to Edan Swartz for all the knowledge he has shared with me as well as my wife Jane for supporting me along this change in both our lives as I pursue this next step in my career.
My name is Justin and this is Zoetrope Gallery.
</div>
</div>
</div>
  );
}

export default InfoPage;
