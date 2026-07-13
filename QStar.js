/*
 * QStar Rewrite
 * Version: 3.0.0-alpha1
 */

function main(config) {
  if (!config) return config;

  config["proxy-groups"] = config["proxy-groups"] || [];

  const proxyNames = (config.proxies || []).map(p => p.name);

  const exists = config["proxy-groups"].some(
    g => g.name === "🚀 全球加速"
  );

  if (!exists) {
    config["proxy-groups"].push({
      name: "🚀 全球加速",
      type: "select",
      proxies: ["DIRECT", ...proxyNames]
    });
  }

  return config;
}