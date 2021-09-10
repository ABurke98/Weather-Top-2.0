"use strict";

const low = require("lowdb");                          //Utilising fileSync as well as lowdb, for useful function that we can use relating to data stores.
const FileSync = require("lowdb/adapters/FileSync");

class JsonStore {
  constructor(file, defaults) {
    const adapter = new FileSync(file);
    this.db = low(adapter);
    this.db.defaults(defaults).value();
  }
                                           //Most of these functions are taking in our collection list and manipulating it in various ways, saving/deleting/updating etc.
  save() {
    this.db.write();
  }

  add(collection, obj) {
    this.db
      .get(collection)
      .push(obj)
      .last()
      .value();
  }

  remove(collection, obj) {
    this.db
      .get(collection)
      .remove(obj)
      .value();
  }

  removeAll(collection) {
    this.db
      .get(collection)
      .remove()
      .value();
  }

  findAll(collection) {
    return this.db.get(collection).value();
  }

  findOneBy(collection, filter) {
    const results = this.db
      .get(collection)
      .filter(filter)
      .value();
    return results[0];
  }

  findByIds(collection, ids) {
    return this.db
      .get(collection)
      .keyBy("id")
      .at(ids)
      .value();
  }

  findBy(collection, filter) {
    return this.db
      .get(collection)
      .filter(filter)
      .value();
  }
}

module.exports = JsonStore;
