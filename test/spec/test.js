var assert = chai.assert;
var retain = require("retain")
var retainLocalStorage = require("../../lib/index.js")

describe("RetainLocalStorage", function()
{
  var Movies = retain();
  var enterTheVoid = null;
  var collectionName = "movies";

  Movies.attrs({
    name:String,
    watched:Boolean
  })

  before(function()
  {
    window.localStorage.clear();
  });

  it("it should add retain-localstorage as a plugin", function(done)
  {
    Movies.use(retainLocalStorage, {name:collectionName});
    done();
  })
  
  it("it should create a new movie", function(done)
  {
    var PI = Movies.new(function(res, err)
      {
        if(res)
        {
          var item = window.localStorage.getItem(collectionName+"-"+res.id);
          item = JSON.parse(item);
          assert.equal(item.id, res.id);
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
        var items = window.localStorage.getItem(collectionName);
        items = JSON.parse(items);
        assert.equal(items.length, res.length);
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
        var item = window.localStorage.getItem(collectionName+"-"+res.id);
        item = JSON.parse(item);
        assert.equal(item.id, res.id);
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
        var item = window.localStorage.getItem(collectionName+"-"+res.id);
        item = JSON.parse(item);
        assert.equal(item._keys.name, "PI");
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
        var item = window.localStorage.getItem(collectionName+"-"+res.id);
        assert.equal(item, null);
        done();
      }

    });

  })

});