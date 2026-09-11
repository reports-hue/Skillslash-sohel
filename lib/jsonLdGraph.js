// Several legacy article pages emit a set of unrelated schema.org objects
// wrapped in a plain object with arbitrary key names (ReviewSchema,
// ReviewSchema1, ReviewSchema2, ...) instead of a JSON-LD pattern search
// engines recognise. That shape has no @context/@type/@graph at its root, so
// structured-data parsers (Google's Rich Results parser included) do not
// pick up any of the schema blocks inside it - the page ships rich Product,
// Organization, Course, HowTo etc. markup that is effectively invisible.
//
// This normalises any such object into the standard @graph pattern: one
// shared @context at the top, each original block (its own @context
// dropped, since @graph shares one) listed as an entry in @graph. It is a
// drop-in replacement for JSON.stringify at the call site - the large
// per-page schema content itself is untouched.
export function toJsonLdGraph(namedSchemas) {
  const graph = Object.values(namedSchemas).map((schema) => {
    const { "@context": _drop, ...rest } = schema;
    return rest;
  });
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
