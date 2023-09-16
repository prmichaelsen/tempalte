export const tempalte = function <T extends {}>() {
  const _cache: Record<string, T> = {};

  function _generate(template: string) {
    let fn: any = _cache[template];
    if (!fn) {
      // Replace ${expressions} (etc) with
      // ${map.expressions}.
      const sanitized = template
        .replace(
          /\$\{([\s]*[^;\s\{]+[\s]*)\}/g,
          function (_: any, match: string) {
            return `\$\{map.${match.trim()}\}`;
          }
        )
        // Afterwards, replace anything that's
        // not ${map.expressions}' (etc) with a blank string.
        .replace(/(\$\{(?!map\.)[^}]+\})/g, "");
      fn = Function("map", `return \`${sanitized}\``);
      _cache[template] = fn;
    }
    return fn;
  }
  return _generate as (template: string) => (t: T) => string;
};
export default tempalte;
