const fs = require("fs");
const db = require("db.json");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) 
{
  // API GET Requests
  // API routing to get result from db.json as JSON file.
  app.get("/api/notes", (req, res) => { res.json(db)});
      
  // API POST Requests
  //Server will respon to post request by:
  app.post("/api/notes", function(req, res) {
    //create new note object
    let newNote = {
      id: noteID,
      title: req.body.title,
      text: req.body.text
    };
    //Read the entire db.json file
    fs.readFile("db.json", "utf8",(err,data) => {
      //error handling
      if (err) throw err;
      //use of "pointers" or referencing points hence const can be used, parsing data
      const notepad = JSON.parse(data);
      //push the newNote into existing notepad
      notepad.push(newNote);

      //Writing to db.json file (updating the server)
      fs.writeFile("db.json",JSON.stringify(notepad,null,2),err => {
        if (err) throw err;
        //send response and console log
        res.send(db);
        console.log("Wrote to notepad!")
      });
    });
  });
    
  app.delete("/api/notes/:id", (req, res) => {
    //set variable for note ID that will be looked up
    let noteID = req.params.id;
    //read the db.json file
    fs.readFile("db.json","utf8",(err,data)=> {
      //error handling
      if(err) throw err;
      //parse the data
      const notepad = JSON.parse(data);
      //check if note already exists by ID
      function checkID() {
        if (noteID) 
        {
          return;
        }
      }
      //removing the index of the note ID from notepad -> need to figure out how it actually deleted
      notepad = notepad.filter(checkID)
      //after removing, write to db.json
      fs.writeFile("db.json"),JSON.stringify(notepad,null,2), err => {
        if (err) throw err;
        res.send(db);
        console.log("Deleted note!")
      }

    })
  });
}


