var mongoose = require( 'mongoose' ); 

mongoose.connect('mongodb+srv://admin99:Gamarjoba1@cluster0.etqzi.mongodb.net/<dbname>?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}) 
//mongodb+srv://admin99:<password>@cluster0.etqzi.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open');
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 