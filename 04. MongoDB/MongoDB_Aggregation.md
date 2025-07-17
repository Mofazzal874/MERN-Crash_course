<div id="std-label-aggregation"></div>

# Aggregation Operations

Aggregation operations process multiple documents and return computed results. You can use aggregation operations to:

- Group values from multiple documents together.

- Perform operations on the grouped data to return a single result.

- Analyze data changes over time.

To perform aggregation operations, you can use:

- [Aggregation pipelines](https://mongodb.com/docs/manual/aggregation/#std-label-aggregation-pipeline-intro), which are the preferred method for performing aggregations.

- [Single purpose aggregation methods](https://mongodb.com/docs/manual/aggregation/#std-label-single-purpose-agg-methods), which are simple but lack the capabilities of an aggregation pipeline.

[run aggregation pipelines in the UI](https://www.mongodb.com/docs/atlas/atlas-ui/agg-pipeline/)You can [run aggregation pipelines in the UI](https://www.mongodb.com/docs/atlas/atlas-ui/agg-pipeline/) for deployments hosted in [MongoDB Atlas](https://www.mongodb.com/docs/atlas?tck=docs_server).

<div id="std-label-aggregation-pipeline-intro"></div>

## Aggregation Pipelines

An aggregation pipeline consists of one or more [stages](https://mongodb.com/docs/manual/reference/operator/aggregation-pipeline/#std-label-aggregation-pipeline-operator-reference) that process documents:

- Each stage performs an operation on the input documents. For example, a stage can filter documents, group documents, and calculate values.

- The documents that are output from a stage are passed to the next stage.

- An aggregation pipeline can return results for groups of documents. For example, return the total, average, maximum, and minimum values.



You can update documents with an aggregation pipeline if you use the stages shown in [Updates with Aggregation Pipeline](https://mongodb.com/docs/manual/tutorial/update-documents-with-aggregation-pipeline/#std-label-updates-agg-pipeline).

**Note:**
Aggregation pipelines run with the [`db.collection.aggregate()`](https://mongodb.com/docs/manual/reference/method/db.collection.aggregate/#mongodb-method-db.collection.aggregate) method do not modify documents in a collection, unless the pipeline contains a [`$merge`](https://mongodb.com/docs/manual/reference/operator/aggregation/merge/#mongodb-pipeline-pipe.-merge) or [`$out`](https://mongodb.com/docs/manual/reference/operator/aggregation/out/#mongodb-pipeline-pipe.-out) stage.




## **Aggregation Syntax:**
db.collection.aggregate( [ <pipeline> ], { <options> } )
where: 
- `db.collection.aggregate()` is the method to run an aggregation pipeline.
- `collection` is the name of the collection to aggregate.
- `<pipeline>` is an array of stages that process documents.
- `<options>` is an optional document that specifies options for the aggregation operation.
----



$group operator syntax: 

$group: 
 {
   field1: <expression1>,
   field2: <expression2>,
 }

 like this : 
```javascript
{
  $group: 
  {
    _id: <expression>, // Grouping key
    <field1>: { <accumulator1>: <expression1> }, // Accumulator for field1
    <field2>: { <accumulator2>: <expression2> }  // Accumulator for field2
  }
}
```



## Single Stage Pipeline
**example-01:**
we are using the mongodb's default sample_mflix database and the movies collection.

now we want to group the movies by their year and show the name of the movies in that year. 

- the pipeline argument is an array (like this - `aggregate([] , )`)
- each pipeline can have multiple stage as an object (like this - `[{stage1} , {stage2} , {stage3}, ....]`)
- `$group` operator takes an object like this (explained above)
```javascript
use("sample_mflix")
db.movies.aggregrate([
   {
      $group:{
         _id: "$year" , 
         names: {
            $push: "$title"
         }
      }
   }
])
```
it will return an json array like this : 
```json
[

   {
      "_id": 2010,
      "names": [
         "Pèl Adrienn",
         "In My Sleep",
         "The Pacific",
         "Tangled",
         "Utomlyonnye solntsem 2: Predstoyanie",
         "Dinner for Schmucks",
         "The A-Team",
         "Toy Story 3",
         "Scott Pilgrim vs. the World",
         "7 Days",
         "The Crazies",
      ]
   },
   {
      "_id": 1949,
    "names": [
      "The Mill on the Po",
      "The Walls of Malapaga",
      "Begone Dull Care",
      "Bitter Rice",
    ]
   }
]
```

- the names field uses the  `$push` operator  to add the `title` field from each document in the group to an array.

**example-02**: 
- now we want to group by year but want to fetch the whole document for every movies in that year. 
- there is an notation for the whole document.(`$$ROOT`)
- `$$ROOT` value is a reference to the current document being processed in the pipeline, which represent the complete document
```javascript
db.movies.aggregrate([
   {
      $group:{
         _id: "$year" , 
         names: {
            $push: "$$ROOT"
         }
      }
   }
])
```

## Double Stage Pipeline: 
- the result of first stage will be used in the second stage. 
- `problem : fetch the rated: "APPROVED" movie and their count by year. `

```javascript
db.movies.aggregate([
    // stage-1
    {
        $match: {
            rated: "APPROVED"
        }
    },
    // stage-02 
    {
        $group:{
            _id: "$year", 
            count: {
                $sum: 1
            }
        }

    }
])
```
- the value of `$sum` is 1 , which means that for each document in the group , the value of "number" will be incremented by 1 
- the documents that is fetched from stage one(rated: "APPROVED") will be used as input in the second stage.

output: 

```json
[
  {
    "_id": 1950,
    "count": 20
  },
  {
    "_id": 1924,
    "count": 1
  },
  {
    "_id": 1931,
    "count": 2
  },
  {
    "_id": 1944,
    "count": 10
  },
  {
    "_id": 1948,
    "count": 26
  },
]
```

## Three Stage Pipeline: 
now add another stage to that problem : `Sort the count in descending manner`

```javascript

db.movies.aggregate([
    // stage-1
    {
        $match: {
            rated: "APPROVED"
        }
    },
    // stage-02 
    {
        $group:{
            _id: "$year", 
            count: {
                $sum: 1
            }
        }

    }, 
    // stage-03
    {
        $sort: {
            count: -1
        }
    }
])
```

## Four Stage pipeline : 
problem : `find the maximum count of movies in a year`

```javascript
db.movies.aggregate([
    // stage-1
    {
        $match: {
            rated: "APPROVED"
        }
    },
    // stage-02 
    {
        $group:{
            _id: "$year", 
            count: {
                $sum: 1
            }
        }

    }, 
    // stage-03
    {
        $sort: {
            count: -1
        }
    }, 
    // stage-04
    {
      $group:{
         _id: null, 
         maxCountReleasedMoviesInASingleYear: {
            $max: "$count"
         }
      }
    }
])
```
- here `_id: null` is meaning taking all the document, now we are not grouping based on any field

output:
```json
[
  {
    "_id": null,
    "maxCountReleasedMoviesInASingleYear": 38
  }
]
```




now `$unwind` operator: 
- this is used when you want to fetch information from an array in the document. but do not want to fetch each and every array as nested in the result. 

for example: 
Problem: `group movies by year released and show the names of directors in an array`

```json
now the movies document is like this: 
{
  "_id": {
    "$oid": "573a1392f29313caabcdabdd"
  },
  
  "directors": [
    "Archie Mayo",
    "Michael Curtiz"
  ],
}
```


so if you don't use unwind when fetching the information :
```javascript 
db.movies.aggregate([
   {
      $group: {
         _id: "year",
         directors: {
            $push: "$directors"
         }
      }
   }
])
```

it will fetch directors and show this as a nested array : 
```
[
  {
    "_id": "year",
    "directors": [
      ["Winsor McCay","J. Stuart Blackton"],
      ["Henry King"],
      ["Winsor McCay"],
      ["John Emerson"],
      ["Rex Ingram"],
    ]
  }
]
```
but we want the names of every director in a single array . for that we can use `$unwind` operator. 
- `$unwind` operator makes copies of the same document for multiple instance in the array targeted. 

for example if we unwind accross directors name then :
```json
// <!-- this document :  -->
{
  "_id": {
    "$oid": "573a1392f29313caabcdabdd"
  },
  
  "directors": [
    "Archie Mayo",
    "Michael Curtiz"
  ],
}

// will become  like this: 
{
  "_id": {
    "$oid": "573a1392f29313caabcdabdd"
  },
  
  "directors":"Archie Mayo",
}, 
{
  "_id": {
    "$oid": "573a1392f29313caabcdabdd"
  },
  
  "directors":  "Michael Curtiz"  
}
```

-- so if we unwind before grouping , then we can solve that issue: 
```javascript
db.movies.aggregate([
   {
      $unwind: "$directors"
   }, 
   {
      $group: {
         _id: "year",
         directors: {
            $push: "$directors"
         }
      }
   }
])
```

Now we will get output : 
```json
[
  {
    "_id": "year",
    "directors": [
      "Winsor McCay",
      "J. Stuart Blackton",
      "Henry King",
      "Winsor McCay",
      "John Emerson",
      "Rex Ingram",
      "Charles Bryant",
      "Alla Nazimova",
      "D.W. Griffith",
      "Edward S. Curtis",
      "Raoul Walsh",
      "Edwin S. Porter",
      "Phillips Smalley",
      "Lois Weber",
      "Reginald Barker",
      "Thomas H. Ince",
      "Raymond B. West",
      "Walter Edwards",
      "David Hartford",
      "Jay Hunt",
      "J. Parker Read Jr.",
      "William C. de Mille",
      "Hal Roach",
      "George Loane Tucker",
    ]
  }
]
```






