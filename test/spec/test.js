var assert = chai.assert;
var retain = require("retain")
var retainLocalStorage = require("../../lib/index.js")

describe("RetainLocalStorage", function()
{
  var Movies = retain();
  var enterTheVoid = null;

  Movies.attrs({
    name:String,
    watched:Boolean
  })

  it("it should add retain-localstorage as a plugin", function(done)
  {
    Movies.use(retainLocalStorage, {name:"movies"});
    done();
  })
  
  it("it should create a new movie", function(done)
  {
    var PI = Movies.new(function(res, err)
      {
        if(res)
        {
          done();
        }
      });
  });

  it("it should get all the movies", function(done)
  {
    var movie = Movies.all(function(res, err)
    {
      if(res)
      {
        done();
      }

    });

  })

  it("it should find the created movie", function(done)
  {
    var movie = Movies.find(1,function(res, err)
    {
      if(res)
      {
        done();
      }

    });
  })

  it("it should set the movie properties", function(done)
  {
    var movie = Movies.find(1);
    movie.set({name:"PI", watched:true},function(res, err)
    {
      if(res)
      {
        done();
      }

    });
  })

  it("it should remove the movie", function(done)
  {
    var movie = Movies.find(1);
    movie.remove(function(res, err)
    {
      if(res)
      {
        console.log("window", window.localStorage);
        done();
      }

    });
  })

});