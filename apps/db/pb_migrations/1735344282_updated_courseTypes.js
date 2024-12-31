/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4253493341")

  // update collection data
  unmarshal({
    "name": "courseTags"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4253493341")

  // update collection data
  unmarshal({
    "name": "courseTypes"
  }, collection)

  return app.save(collection)
})
