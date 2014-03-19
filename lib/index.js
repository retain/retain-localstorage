"use strict"

var Q = require("q");

module.exports = function(){
  
  _checkLocalStorage();

  var api = {}

  api.config = {name:""};
  api.new = _new;
  api.set = _set;
  api.find = _find;
  api.all = _all;
  api.remove = _remove;
  api._save = _save;
  api._records = _records
  api._get_records = _get_records
  api._get_record = _get_record

  return api;
};

function _getStorage(name)
{
  var store = window.localStorage.getItem(name)
  if(store)
  {
    return store.split(",")
  }

  return [];
}

function _checkLocalStorage()
{
  if( !window.localStorage ) 
  {
    throw "Environment does not support localStorage."
  }
}

function _records()
{
  if(!this._items)
  {
    this._items = _getStorage(this.config.name) || [];

    this._records = function()
    {
      return this._items;
    }
  }

  return this._items;
}

function _new(record)
{
  if(!record.id)
  {
    record.id = _guid()
  }

  window.localStorage.setItem(this.config.name+"-"+record.id, JSON.stringify(record));
  this._records().push({id:record.id.toString(), cid:record._cid});
  this._save();

  return Q(record);
}

function _set(record)
{
  var deferred = Q.defer();
  var found = this._get_record(record.id) || this._get_record(record._cid);

  if(!found)
  {
    deferred.reject(new Error("Couldn't find record with the ID " + record.id));
  }
  else
  {
    window.localStorage.setItem(this.config.name+"-"+JSON.stringify(record));
    deferred.resolve(record);
  }

  return deferred.promise;
}

function _find(record)
{
  var deferred = Q.defer();

  var id = record.id;
  var records = this._get_records();
  var found = this._get_record(id);

  if(found)
  {
    deferred.resolve(found);
  }
  else
  {
    deferred.reject(new Error("Couldn't find record with the ID " + record.id));
  }

  return deferred.promise;
}


function _all(records)
{
  if(!this._records().length)
  {
    this._items = records;
    this._save();
  }

  return Q(this._get_records());
}

function _remove(record)
{
  var total = this._records().length;
  var item = {};

  for (var i = total - 1; i >= 0; i--) 
  {
    item = this._records()[i];

    if(item.id === record.id || parseInt(item._cid) === record._cid)
    {
      this._items.splice(i,1);
    }
  };

  window.localStorage.removeItem(this.config.name+"-"+record.id);

  return Q(record);
}

function _get_record(id)
{
  var records = this._get_records();
  var found = null;

  for(var i = 0, total = records.length; i < total; i++)
  {
    if(records[i].id === id)
    {
      return records[i];
    }

    if(parseInt(records[i]._cid) === parseInt(id))
    {
      return records[i];
    }
  }

  return found;
}

function _update(props, record)
{
  for(var p in props)
  {
    record[p] = props[p];
  }
}

function _save()
{
  window.localStorage.setItem(this.config.name, this._records().join(","));
}

function _get_records()
{
  var items = [];
  var record = {};

  for(var i = 0, total = this._records().length; i < total; i++)
  {
    record = this._records()[i];
    var item = JSON.parse(window.localStorage.getItem(this.config.name+"-"+record.id));
    items.push(item);
  }

  return items;
}

function _guid()
{
  return (_S4() + _S4() + _S4() + _S4().substr(0,3) + _S4() + _S4() + _S4() + _S4()).toLowerCase()
}

function _S4() 
{
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}