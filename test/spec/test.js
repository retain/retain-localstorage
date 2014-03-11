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
    Movies.use(retainLocalStorage, {})
    done();
  })
  
  it("it should get all the movies", function(done)
  {
    Movies.all(function(res, err)
    {
      if(res)
      {
        done();
      }
    });
  });

});