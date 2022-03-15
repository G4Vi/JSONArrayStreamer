JSONArrayStreamer
=================

Parse a JSON array incrementally as it is downloading. No dependencies, reuses `JSON.parse` to parse items out.

Module provides only `JSONArrayStreamer`, an async generator. It takes a resource to pass to `fetch` i.e. a URL, stringifyable object, or `Request`. An options object can optionally be provided to set `startStr` or `endStr`, by default `[` and `]`.

[View Demo](https://g4vi.github.io/JSONArrayStreamer/)

[Demo Source](index.html)

## LICENSE
MIT, see `LICENSE`.
