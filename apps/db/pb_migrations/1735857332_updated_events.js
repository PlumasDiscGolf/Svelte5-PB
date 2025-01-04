/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "bool768897924",
    "name": "registrationRequired",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "date2047386239",
    "max": "",
    "min": "",
    "name": "registrationDeadline",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  // add field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "number405181692",
    "max": null,
    "min": null,
    "name": "cost",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("bool768897924")

  // remove field
  collection.fields.removeById("date2047386239")

  // remove field
  collection.fields.removeById("number405181692")

  return app.save(collection)
})
