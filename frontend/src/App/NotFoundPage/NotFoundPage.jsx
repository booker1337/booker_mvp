import React from "react";
import "./NotFoundPage.css";
import book from "./book.png";
import notepad from "./notepad.png";

export default function NotFoundPage() {
  return (
    <div className="NotFound container-fluid padding">
    <div class="row padding">
        <div class="col-lg-6 mt-5">
          <img src={notepad} alt="notepad" class="imgNotepad" />;
          <img src={book} alt="book" class="imgBook" />;
        </div>
        <div class="col-lg-6">
          <div class="mt-5">
            <h1>OOPS! PAGE</h1>
            <h1>NOTE FOUND.</h1>
          </div>
          <div class="mt-5">
            <h3>What did the sketchbook say to the novel?</h3>
            <h3>Sorry, we're drawing a blank.</h3>
            <button class="btn btn-primary mt-5 button404">Back to Home</button>
          </div>
        </div>
    </div>
    </div>
  );
}