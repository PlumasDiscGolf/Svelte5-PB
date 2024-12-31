/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number25009842",
    "max": null,
    "min": null,
    "name": "lengthInFeet",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_955655590")

  // update field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number25009842",
    "max": null,
    "min": null,
    "name": "length",
    "onlyInt": true,
    "presentable": false,
    "required": true,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
