"use strict"

var Q = require("q");

module.exports = function(){
  
  var api = {}

  api.config = {url:""}
  api.new = _new;
  api.set = _set;
  api.find = _find;
  api.all = _all;
  api.remove = _remove;

  return api;
};

function _new(record)
{
  var deferred = Q.defer();

  return deferred.promise;
}

function _set(record)
{
  var deferred = Q.defer();

  return deferred.promise;
}

function _find(record)
{
  var deferred = Q.defer();

  return deferred.promise;
}

function _all(records)
{
  var deferred = Q.defer();

  deferred.resolve([1,2,3], null);

  return deferred.promise;
}

function _remove(record)
{
  var deferred = Q.defer();

  return deferred.promise;
}

function _update(props, record)
{
  for(var p in props)
  {
    record[p] = props[p];
  }
}