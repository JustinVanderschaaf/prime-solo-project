import React from "react";

function AboutPage() {
  return (
    <div className="aboutContainer">
      <div className="aboutContainerTop">
      <h4>
        On a regular basis I find myself talking to friends and family about
        this cool new project I'm working on or they tell me about how far along
        their garden has come over the last two years. Then we spend the next 20
        mins awkwardly sending photos back and forth via text or email or try to
        describe the growth of the project over the course of time but feeling
        like it’s not really getting the idea across. That's why I created
        Zoetrope Gallery.
      </h4>
      </div>
      <div className="aboutContainerBot">
      <p>This app was designed to be easy to use.</p>
      
      <ul>
        <li>log in or register as a new user to enter the application</li>
        <li>
          once inside you will see a list off every project in the application
        </li>
        <li>
          toggle the projects to before and after as well as filter the projects
          by username and category
        </li>
        <li>
          clicking create new project will bring you to a form to start the
          creation event.
        </li>
        <li>
          when you click submit for new project you will be redirected to the
          main page with the newest project at the top.
        </li>
        <li>
          you can click into the projects from main page to view others or
          view/edit your own
        </li>
        <li>
          inside the project you have the ability to upload new photos, delete
          photos, set your before/after pics or delete the entire project
        </li>
        <li>
          There is also tabs at the top of the project page that lets you
          navigate between pages to look at you summary page just click the tab
        </li>
        <li>
          In the summary tab you can view or edit you own table that hold the
          information on the materials needed for the project
        </li>
      </ul>
      </div>
    </div>
  );
}

export default AboutPage;
