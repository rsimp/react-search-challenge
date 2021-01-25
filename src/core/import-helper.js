export function importAll(requireContext) {
  const importCache = {};
  requireContext
    .keys()
    .forEach((moduleKey) => (importCache[moduleKey] = requireContext(moduleKey)));
  return importCache;
}
