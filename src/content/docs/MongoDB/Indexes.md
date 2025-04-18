---
title: Indexes
---


```
db.records.createIndex( { score: 1 } ) // Creates an ascending index on the score field of the records collection
db.coll.dropIndex( {} )
deb.coll.getIndexes() // ver lista índices de una colección

Por defecto _id ya está indexado
para hacer un sort necesitas un index, ya que por archivo en memoria sólo tiene 32MB


db.coll.createIndex({email: 1, {unique: true}}) //introducir unicidad
db.coll.createIndex({"val1: 1"}, {partialFilterExpression: {gender: "male"}}) // para hacer indices con filtros
db.coll.createIndex({"createdAt: 1"}, {expireAfterSeconds: 10}) // se borra tras X segundos
```

What does createIndex() do in detail?
Whilst we can't really see the index, you can think of the index as a simple list of values + pointers to the original document.
Something like this (for the "age" field):
(29, "address in memory/ collection a1")
(30, "address in memory/ collection a2")
(33, "address in memory/ collection a3")
The documents in the collection would be at the "addresses" a1, a2 and a3. The order does not have to match the order in the index (and most likely, it indeed won't).
The important thing is that the index items are ordered (ascending or descending - depending on how you created the index). createIndex({age: 1}) creates an index with ascending sorting, createIndex({age: -1}) creates one with descending sorting.
MongoDB is now able to quickly find a fitting document when you filter for its age as it has a sorted list. Sorted lists are way quicker to search because you can skip entire ranges (and don't have to look at every single document).
Additionally, sorting (via sort(...)) will also be sped up because you already have a sorted list. Of course this is only true when sorting for the age.

Multikey Index

```
db.coll.createIndex( { <field>: < 1 or -1 > } )
```

text index

```
db.reviews.createIndex( { comments: "text" } ) // NO tiene un número tiene la etiqueta de "text"
```

Helpful Articles/ Docs:

-   More on partialFilterExpressions: https://docs.mongodb.com/manual/core/index-partial/
-   Supported default_languages: https://docs.mongodb.com/manual/reference/text-search-languages/#text-search-languages
-   How to use different languages in the same index: https://docs.mongodb.com/manual/tutorial/specify-language-for-text-index/#create-a-text-index-for-a-collection-in-multiple-languages
