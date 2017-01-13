## Routing

We want to use nice conventions for routing URLs so that URLs are short, canonical and easy to remember while also being extensible - it can be common to have multiple views or operations for a single entity or a collection of entities.

Here's the straw man routes using the entity 'Connection'

* `/connections` view all connections and search using query arguments
* `/connections/:id` view connection given an id
* `/connections/:id/edit` edit connection given an id
* `/connection/new` create new connection
* `/connection/install` custom views for collections of connections such as installing new connections or whatever

