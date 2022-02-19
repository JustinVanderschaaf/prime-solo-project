import React from "react";

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
      <div>
      
        <h2>Technologies</h2>
JavaScript React ,Redux, sagas, node, express, Multer for photo uploads Mui and CSS for styling
</div>

<h2>Challenge</h2>

The toughest challenge I overcame was learning multer to send both a file and a title to posgresql and then displaying the saved photo.
Excited for
Now that you're able to create and share projects with everyone, I can't wait to build a feature where the users can send and receive messages about the projects that they are viewing or have created.

<h2>Thanks</h2>
I would like to say thanks to Edan Swartz for all the knowledge he has shared with me as well as my wife Jane for supporting me along this change in both our lives as I pursue this next step in my career.
My name is Justin and this is Zoetrope Gallery.
      </div>
    </div>
  );
}

export default AboutPage;
