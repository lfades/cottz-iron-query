var path, pathname, queryObj, query = {};

query.keyDeps = {};

query.ensureKey = function (key) {
	var deps = this.keyDeps;
	if (!(key in deps))
		deps[key] = new Tracker.Dependency;
	deps[key].depend();
};

query.get = function (key) {
	if (key) {
		this.ensureKey(key);
		return path.queryObject[key];
	} else {
		if (!this.dep)
			this.dep = new Tracker.Dependency;
		
		this.dep.depend();
		return path.queryObject;
	}
};

query.set = function (key, val) {
	this.wait(key, val);
	this.go();
};

query.getNonreactive = function (key) {
	return key ? queryObj[key]: queryObj;
};

query.wait = function (key, val) {
	var oldVal = queryObj[key];
	if (String(val) === oldVal || !oldVal && !val)
		return;

	if (!( typeof val == "undefined" ) && val != null)
		queryObj[key] = String(val);
	else
		delete queryObj[key];

	var dep = this.keyDeps[key];
	dep && dep.changed();
	
	this.dep && this.dep.changed();
};

query.go = function () {
	var query = Iron.Url.toQueryString(queryObj);
	Iron.Location.go(pathname + query + path.hash);
};

Iron.query = query;

Tracker.autorun(function () {
	path = Iron.Location.get();
	
	if (pathname && path.pathname != pathname) {
		var deps = query.keyDeps;
		for (var key in deps) {
			deps[key].changed();
		};
		query.dep && query.dep.changed();
	}
	
	pathname = path.pathname;
	queryObj = path.queryObject;
});

UI.registerHelper('ironQuery', function (key) {
	return query.getNonreactive(key);
});

UI.registerHelper('ironQueryReactive', function (key) {
	return query.get(key);
});
