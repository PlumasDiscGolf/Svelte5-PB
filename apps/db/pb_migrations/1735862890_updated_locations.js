/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1942858786")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool379482041",
    "name": "isCourse",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1942858786")

  // update field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "bool379482041",
    "name": "course",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
