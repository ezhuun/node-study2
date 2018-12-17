// routes/index.js

module.exports = function(app, Book)
{
  //get all books
  app.get("/api/books", function(req, res){
    Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    });
  }); //end app

  //get single books
  app.get("/api/books/:book_id", function(req, res){
    res.end();
  }); //end app

  //get book by name
  app.get("/api/books/name/:name", function(req, res){
    Book.find({name: req.params.name}, {_id: 0},  function(err, books){
        if(err) return res.status(500).json({error: err});
        if(books.length === 0) return res.status(404).json({error: 'book not found'});
        res.json(books);
    });
  }); //end app

  //create book
  app.post("/api/books", function(req, res){
    var book = new Book();
    book.name = req.body.name;

    book.save(function(err){
      if(err){
        console.log(err);
        res.json({result:0});
        return;
      }
      res.json({result:1});
    });
  }); //end app

  //update the book
  app.put("/api/books/:book_id", function(req, res){
    Book.findById(req.params.book_id, function(err, book){
      if(err) return res.status(500).json({error: err});
      if(!book) return res.status(404).json({error: 'book not found'});

      if(req.body.name)book.name=req.body.name;

      book.save(function(err){
        if(err) return res.status(500).json({error: "failed to update"});
        res.json({message:"book updated"});
      });
    });
  }); //end app

  //delete book
  app.delete("/api/books/:book_id", function(req, res){
    Book.remove({_id:req.params.book_id}, function(err, book){
      if(err) return res.status(500).json({error:"database failure"});      

      res.status(204).end();
    });
  }); //end app
};
