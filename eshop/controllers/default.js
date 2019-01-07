exports.install = function() {
	F.route('/',list_product, ['*Products']);
	F.route('/products',query_products,['*Products']);
	F.route('/{price}', json_get, ['*Products']);
	F.route('/',update_product,['post','*Products']);
	F.route('/addproduct',add_product,['post','*Products'])
};


/**
 * 新增產品資料
 */
function add_product(){
	console.log("add product");
	var self=this;
	console.log("Update Products::::: ",self.body.id);
	this.body.$save(self.callback('index'));
}

/**
 * 列出所有產品資料
 */
function list_product() {
	var self = this;
	
	self.$query(self, self.callback('index'));
}

/**
 * 查詢產品資料
 */
function query_products(){
	var self = this;
	
	self.$query(self, self.callback('products'));
}

function json_get(price) {
	var self = this;
	console.log("Get Products:::::",id)
	self.$get(price, self.callback());
}

/**
 * 更新產品資料
 */
function update_product(){
	var self=this;
	console.log("Update Products::::: ",self.body.id);
	this.body.$save(self.callback('index'));
	
}