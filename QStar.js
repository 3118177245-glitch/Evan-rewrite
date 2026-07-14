/*
 * QStar Custom Rule
 * Clash Mi Compatible
 * Software Split Version
 */

function main(config) {

  if (!config) return config;


  const nodes = (config.proxies || [])
    .map(p => p.name)
    .filter(Boolean);


  // 添加策略组
  config["proxy-groups"] = [

    {
      name: "🚀 节点选择",
      type: "select",
      proxies: [
        "⚡ 自动选择",
        ...nodes
      ]
    },


    {
      name: "⚡ 自动选择",
      type: "url-test",
      url: "http://cp.cloudflare.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: nodes
    },


    {
      name: "🤖 OpenAI",
      type: "select",
      proxies: nodes
    },


    {
      name: "💬 Telegram",
      type: "select",
      proxies: nodes
    },


    {
      name: "🐦 X",
      type: "select",
      proxies: nodes
    },


    {
      name: "▶️ YouTube",
      type: "select",
      proxies: nodes
    },


    {
      name: "💻 GitHub",
      type: "select",
      proxies: nodes
    },


    {
      name: "🌍 国外网站",
      type: "select",
      proxies: nodes
    },


    {
      name: "🪟 Microsoft",
      type: "select",
      proxies: [
        "DIRECT",
        ...nodes
      ]
    },


    {
      name: "🍎 Apple",
      type: "select",
      proxies: [
        "DIRECT",
        ...nodes
      ]
    },


    {
      name: "🏠 直连",
      type: "select",
      proxies:[
        "DIRECT"
      ]
    },


    {
      name: "🛑 广告拦截",
      type:"select",
      proxies:[
        "REJECT"
      ]
    }

  ];


  // 软件规则

  config.rules = [

    // OpenAI
    "DOMAIN-SUFFIX,openai.com,🤖 OpenAI",
    "DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI",
    "DOMAIN-SUFFIX,oaiusercontent.com,🤖 OpenAI",


    // Telegram
    "GEOSITE,telegram,💬 Telegram",


    // X
    "GEOSITE,twitter,🐦 X",


    // YouTube
    "GEOSITE,youtube,▶️ YouTube",


    // Github
    "GEOSITE,github,💻 GitHub",


    // Apple
    "GEOSITE,apple,🍎 Apple",


    // Microsoft
    "GEOSITE,microsoft,🪟 Microsoft",


    // 广告
    "GEOSITE,category-ads-all,🛑 广告拦截",


    // 国内全部直连
    "GEOSITE,cn,🏠 直连",
    "GEOIP,CN,🏠 直连,no-resolve",


    // 其它国外
    "GEOSITE,geolocation-!cn,🌍 国外网站",


    // 默认
    "MATCH,🌍 国外网站"

  ];


  return config;

}