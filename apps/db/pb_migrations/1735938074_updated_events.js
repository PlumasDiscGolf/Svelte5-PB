/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // add field
  collection.fields.addAt(21, new Field({
    "hidden": false,
    "id": "file1365248554",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "bannerImage",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1687431684")

  // remove field
  collection.fields.removeById("file1365248554")

  return app.save(collection)
})
