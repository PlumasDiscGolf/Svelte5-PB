/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update field
  collection.fields.addAt(19, new Field({
    "hidden": false,
    "id": "bool3009955877",
    "name": "lateRegistration",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // update field
  collection.fields.addAt(19, new Field({
    "hidden": false,
    "id": "bool3009955877",
    "name": "lateRegsitration",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
