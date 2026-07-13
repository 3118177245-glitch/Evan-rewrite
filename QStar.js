/*
 * QStar Safe Test
 * Version 3.0.0-test
 * Clash Mi Compatible
 */

function main(config) {

  if (!config) return config;


  // 不碰 proxies
  // 不碰 rules
  // 不碰 dns


  config["proxy-groups"] = config["proxy-groups"] || [];


  const nodes = (config.proxies || [])
    .map(p => p.name)
    .filter(Boolean);


  if (!config["proxy-groups"].some(
      g => g.name === "🚀 全球加速"
  )) {

    config["proxy-groups"].push({

      name: "🚀 全球加速",

      type: "select",

      proxies: [
        "DIRECT",
        ...nodes
      ]

    });

  }


  return config;

}