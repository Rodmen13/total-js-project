NEWSCHEMA('Products').make(function(schema) {
	//console.log("NEWSCHEMA::::::::::",schema)
	var db=NOSQL('products');
	schema.define('id','UID');
	schema.define('name',String);
	schema.define('price',Number);
	schema.define('created',Date)(()=> new Date())


	schema.setQuery(function(error, options, callback) {
		//回傳所有資料
		db.find().make(function(builder) {
			builder.callback(callback);
		});
		
	});

	schema.setGet(function(error, model, options, callback) {
		//console.log("setGet:::::::::::error::::::::::",error);
		console.log("setGet:::::::::::model::::::::::",model);
		//console.log("setGet:::::::::::options::::::::::",options);
		console.log("setGet:::::::::::callback::::::::::",callback);
		db.one().where('name',options).callback(callback);
	});

	schema.setSave(function(error, model,options,callback) {
		//console.log("setSave:::::::::::error::::::::::",error);
		//console.log("setSave:::::::::::model::::::::::",model);
		//console.log("setSave:::::::::::options::::::::::",options);
		//console.log("setSave:::::::::::callback::::::::::",callback);

		// if there's no id then it's an insert otherwise update
		var isNew;
		//先找尋資料庫有無資料-有在更新
		db.one().where('id',model.id).callback(function(err,response){
			console.log("response:::::::::::",response);
			isNew=response?false:true;
			console.log("isNew:::::::::::",isNew);
			if(isNew) {
				model.id=UID();
				data=model;
			}
			else {
				model.id=response.id;
				model.created=response.created;
				data=response;
			}
			console.log("model.id:::::::::::",model.id);

			db.update(model,true).where('id', model.id).callback(function(err,response)
			{
				console.log("udpate finish");
				db.find().make(function(builder) {
					builder.callback(callback);
				});
			});
		});

		
		
		
	});
});