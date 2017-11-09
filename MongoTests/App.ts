import { DatabaseManager, Env } from '@timebyping/ping-node';


Env.getInstance().init();
DatabaseManager.getInstance().init()
.then(_result => {
    const collection = 'test';
    console.log(`Clearing collection = ${collection}`)
    DatabaseManager.getInstance().deleteMany(collection, {})
    .then(_result => {  
        DatabaseManager.getInstance().insertOne(collection, { flag: false, count: 0 })
        .then(_result => {
            console.log('Inserted test object with .flag = false');
            const total = 1000;
            let query = { flag: true };
            let update = { $inc: { count: 1 } };
            console.log('Query: %j', query);
            console.log('Update: %j', update);
            for(let i = 0; i < total; i++) {
                DatabaseManager.getInstance().updateOne(collection, query, update)
                .then(result => {
                    console.log(`i: ${i}, nMatched: ${result.matchedCount}, nModified: ${result.modifiedCount}`);
                }, error => { console.log(error); });
                if (total / i === 2) {
                    query.flag = false;
                    // update.flag = true;
                }                                                                                       
            }
        }, error => { console.log(error); });
    }, error => { console.log(error); })
}, error => { console.log(error); });