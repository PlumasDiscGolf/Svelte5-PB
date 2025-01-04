/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "bool3147237882",
    "name": "onlineRegistration",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(18, new Field({
    "hidden": false,
    "id": "bool1742714537",
    "name": "onsiteRegistration",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(19, new Field({
    "hidden": false,
    "id": "bool3009955877",
    "name": "lateRegsitrationFee",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("bool3147237882")

  // remove field
  collection.fields.removeById("bool1742714537")

  // remove field
  collection.fields.removeById("bool3009955877")

  return app.save(collection)
})
