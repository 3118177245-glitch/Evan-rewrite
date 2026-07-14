/*
 * QStar Kitty Safe
 * Clash Mi Compatible
 */

function main(config) {

  if (!config) return config;


  // 保留原配置
  config["proxy-groups"] = config["proxy-groups"] || [];
  config.rules = config.rules || [];


  const nodes = (config.proxies || [])
    .map(p => p.name)
    .filter(Boolean);


  function addGroup(name,type="select"){
    if(!config["proxy-groups"].some(g=>g.name===name)){
      config["proxy-groups"].push({
        name:name,
        type:type,
        proxies:[
          "🚀 节点选择",
          ...nodes
        ]
      });
    }
  }


  // 主选择
  addGroup("🚀 节点选择");
  addGroup("🤖 OpenAI");
  addGroup("💬 Telegram");
  addGroup("🐦 X");
  addGroup("▶️ YouTube");
  addGroup("💻 GitHub");
  addGroup("🪟 Microsoft");
  addGroup("🏠 直连");


  // 直连组
  config["proxy-groups"]
  .find(g=>g.name==="🏠 直连")
  .proxies=[
    "DIRECT"
  ];


  // 规则（插入最前）
  config.rules.unshift(

    "DOMAIN-SUFFIX,openai.com,🤖 OpenAI",
    "DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI",

    "GEOSITE,telegram,💬 Telegram",

    "GEOSITE,twitter,🐦 X",

    "GEOSITE,youtube,▶️ YouTube",

    "GEOSITE,github,💻 GitHub",

    "GEOSITE,microsoft,🪟 Microsoft",


    // 国内直连
    "GEOSITE,cn,🏠 直连",
    "GEOIP,CN,🏠 直连,no-resolve"

  );


  return config;

}