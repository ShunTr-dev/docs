---
title: Relations
---


Relations
```js
db.books.aggregate([{$lookup: {
from: "authors", // from what other collection
localField: "authors",
foreignField: "_id",
as: "creators"
}}])

```

```
