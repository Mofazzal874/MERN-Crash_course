
use('sample_mflix')
db.movies.aggregate([
  {
    $group: {
      _id: "$year"
    }
  }
])



db.movies.aggregate([
   {
      $group:{
         _id: "$year" , 
         names: {
            $push: "$$ROOT"
         }
      }
   }
])

db.movies.aggregate([
    //pipeline stage-1
    {
        $match: {
            rated: "APPROVED"
        }
    },
    //pipeline stage-02 
    {
        $group:{
            _id: "$year", 
            count: {
                $sum: 1
            }
        }

    }
])

db.movies.aggregate([
    //pipeline stage-1
    {
        $match: {
            rated: "APPROVED"
        }
    },
    //pipeline stage-02 
    {
        $group:{
            _id: "$year", 
            count: {
                $sum: 1
            }
        }

    }, 
    //pipeline stage-03
    {
        $sort: {
            count: -1
        }
    }
])



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