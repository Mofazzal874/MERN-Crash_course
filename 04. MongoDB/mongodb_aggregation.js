

db.movements.aggregate([{
        $lookup: {
            from: 'suppliers', 
            localField: 'check_in' , 
            foreignField: '_id',
            as: 'supplier_info'

        }

    },
    {
        $unwind: '$supplier_info',
    }
    
]); 



movement.find().populate('check_in').exec().then(movements=>{
    console.log(movements) ; 
})