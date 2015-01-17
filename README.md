# cottz-iron-query
simple package to add and take parameters in the route with Meteor

## Installation
```sh
$ meteor add cottz:iron-query
```

## API
`Iron.query` works exactly as a session

#### Iron.query.set (key, value)
add or change the value of a key in the path

#### Iron.query.get (key)
gets the value of a key in the current path, if not sends `key` return an object with all the query keys

#### Iron.query.getNonreactive (key)
is exactly equal to `Iron.query.get` but non reactive (that description kills people)

## UI Helpers
helpers available in the template

#### {{ ironQuery key }}
gets the value of a key in the current path, this helper uses Iron.query.getNonreactive because in most cases
rerunning the helper in the template is not required

#### {{ ironQueryReactive key }}
is exactly equal to `ironQuery` but reactive (captain obvious help me)

## Other utilities

#### Iron.query.wait()
add or change the value of a key in the path but without redirect

#### Iron.query.go()
redirects to the path with the current keys object

to further clarify the above `Iron.query.set` is this
````js
Iron.query.set = function (key, value) {
  this.wait(key, value);
  this.go();
};
````
