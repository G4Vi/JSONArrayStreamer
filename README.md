JSONArrayStreamer
=================

Parse a JSON array incrementally as it is downloading. No dependencies, reuses `JSON.parse` to parse items out.

Module provides only `JSONArrayStreamer`, an async generator. It takes a resource to pass to `fetch` i.e. a URL, stringifyable object, or `Request`. An options object can optionally be provided to set `startStr` or `endStr`, by default `[` and `]`.

See `index.html` for an example.

## LICENSE
MIT, see `LICENSE`.
