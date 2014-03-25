retain-localstorage
===================

Retain localStorage plugin

[![Build Status](https://travis-ci.org/giuliandrimba/retain-localstorage.png?branch=master)](https://travis-ci.org/giuliandrimba/retain-localstorage) 

### Config

* __name__: LocalStorage collection name.

* __Example:__

  ``` javascript
  var retain = require("retain");
  var retainLocalStorage = require("retain-localstorage");
  
  var Movies = retain();
  
  Movies.use(retainLocalStorage, {
        name: "movies"
      })
  ```

### Creating a plugin

[Retain](https://github.com/giuliandrimba/retain) use Promises internally to transfer data between the plugins.

To create a plugin, it is necessary to implement each of the following __Retain__ methods.

* __new__
* __all__
* __set__
* __find__
* __remove__

Each of theses methods must return a promise.

