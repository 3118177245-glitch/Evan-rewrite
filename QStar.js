/*
 * QStar Rewrite
 * Version: 1.0.0
 * Compatible:
 *   - Mihomo
 *   - Clash Mi
 *
 * Features:
 *   - Auto proxy group
 *   - Auto region random
 *   - Manual node selection
 *   - Direct groups
 */

function main(config) {

  if (!config) return config;

  config.proxies = config.proxies || [];
  config["proxy-groups"] = [];

  const proxies = config.proxies
.filter(p => 
  p.name &&
  !p.name.includes("剩余流量") &&
  !p.name.includes("距离下次") &&
  !p.name.includes("套餐到期")
)
.map(p => p.name);

  // ==========================
  // 工具
  // ==========================

  function addGroup(name, type, nodes) {

    config["proxy-groups"].push({
      name,
      type,
      proxies: nodes
    });

  }


  function filterNodes(keys) {

    return proxies.filter(name =>
      keys.some(key =>
        name.toLowerCase().includes(key.toLowerCase())
      )
    );

  }


  // ==========================
  // 全部节点
  // ==========================

  const allNodes = [
    "DIRECT",
    ...proxies
  ];


  // ==========================
  // 全部随机
  // ==========================

  addGroup(
    "🎲 全部随机",
    "url-test",
    proxies
  );


  // ==========================
  // 地区识别
  // ==========================

  const regions = {

    "🇺🇸 美国随机":[
      "United States",
      "USA",
      "US"
    ],

    "🇯🇵 日本随机":[
      "Japan",
      "JP"
    ],

    "🇸🇬 新加坡随机":[
      "Singapore",
      "SG"
    ],

    "🇭🇰 香港随机":[
      "Hong Kong",
      "HK"
    ],

    "🇹🇼 台湾随机":[
      "Taiwan",
      "TW"
    ],

    "🇰🇷 韩国随机":[
      "Korea",
      "KR"
    ],

    "🇲🇾 马来西亚随机":[
      "Malaysia",
      "MY"
    ],

    "🇬🇧 英国随机":[
      "United Kingdom",
      "UK"
    ],

    "🇩🇪 德国随机":[
      "Germany",
      "DE"
    ],

    "🇳🇱 荷兰随机":[
      "Netherlands",
      "NL"
    ]

  };


  for (const region in regions){

    const nodes = filterNodes(regions[region]);

    if(nodes.length){

      addGroup(
        region,
        "url-test",
        nodes
      );

    }

  }


   // ==========================
  // 应用策略组
  // ==========================

  function addSelectGroup(name, extra = []) {

    addGroup(
      name,
      "select",
      [
        "🚀 全球加速",
        "🎲 全部随机",
        ...Object.keys(regions),
        "DIRECT",
        ...proxies,
        ...extra
      ]
    );

  }


  // 国际服务

  addSelectGroup("🤖 OpenAI");

  addSelectGroup("🧠 Claude");

  addSelectGroup("📱 Telegram");

  addSelectGroup("🎵 TikTok");

  addSelectGroup("🎮 国际游戏");

  addSelectGroup("💳 PayPal");

  addSelectGroup("🔍 Google服务");

  addSelectGroup("🌐 Meta");

  addSelectGroup("𝕏 X");

  addSelectGroup("🎬 Netflix");

  addSelectGroup("🐙 GitHub");

  addSelectGroup("🪟 微软服务");

  addSelectGroup("🍎 苹果服务");

  addSelectGroup("₿ 加密货币");


  // ==========================
  // 国内直连策略组
  // ==========================

  function addDirectGroup(name){

    addGroup(
      name,
      "select",
      [
        "DIRECT"
      ]
    );

  }


  addDirectGroup("🎵 抖音");

  addDirectGroup("📺 哔哩哔哩");

  addDirectGroup("📕 小红书");

  addDirectGroup("🛒 阿里腾讯");

  addDirectGroup("💬 微信QQ");

  addDirectGroup("💰 支付宝");


  // 最终直连

  addDirectGroup("DIRECT");
// ==========================
  // Rules
  // ==========================

  config.rules = config.rules || [];


  const rules = [

    // OpenAI
    "DOMAIN-SUFFIX,openai.com,🤖 OpenAI",
    "DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI",
    "DOMAIN-SUFFIX,oaistatic.com,🤖 OpenAI",
    "DOMAIN-SUFFIX,oaiusercontent.com,🤖 OpenAI",


    // Claude
    "DOMAIN-SUFFIX,claude.ai,🧠 Claude",
    "DOMAIN-SUFFIX,anthropic.com,🧠 Claude",


    // Telegram
    "DOMAIN-SUFFIX,telegram.org,📱 Telegram",
    "DOMAIN-SUFFIX,t.me,📱 Telegram",


    // TikTok
    "DOMAIN-SUFFIX,tiktok.com,🎵 TikTok",


    // Google
    "DOMAIN-SUFFIX,google.com,🔍 Google服务",
    "DOMAIN-SUFFIX,googleapis.com,🔍 Google服务",
    "DOMAIN-SUFFIX,gstatic.com,🔍 Google服务",


    // Meta
    "DOMAIN-SUFFIX,facebook.com,🌐 Meta",
    "DOMAIN-SUFFIX,instagram.com,🌐 Meta",
    "DOMAIN-SUFFIX,whatsapp.com,🌐 Meta",


    // X
    "DOMAIN-SUFFIX,x.com,𝕏 X",
    "DOMAIN-SUFFIX,twitter.com,𝕏 X",


    // Netflix
    "DOMAIN-SUFFIX,netflix.com,🎬 Netflix",
    "DOMAIN-SUFFIX,nflxvideo.net,🎬 Netflix",


    // GitHub
    "DOMAIN-SUFFIX,github.com,🐙 GitHub",
    "DOMAIN-SUFFIX,githubusercontent.com,🐙 GitHub",


    // Microsoft
    "DOMAIN-SUFFIX,microsoft.com,🪟 微软服务",
    "DOMAIN-SUFFIX,office.com,🪟 微软服务",
    "DOMAIN-SUFFIX,live.com,🪟 微软服务",


    // Apple
    "DOMAIN-SUFFIX,apple.com,🍎 苹果服务",
    "DOMAIN-SUFFIX,icloud.com,🍎 苹果服务",


    // PayPal
    "DOMAIN-SUFFIX,paypal.com,💳 PayPal",


    // 国内直连

    // 抖音
    "DOMAIN-SUFFIX,douyin.com,🎵 抖音",

    // Bilibili
    "DOMAIN-SUFFIX,bilibili.com,📺 哔哩哔哩",

    // 小红书
    "DOMAIN-SUFFIX,xiaohongshu.com,📕 小红书",

    // 微信QQ
    "DOMAIN-SUFFIX,wechat.com,💬 微信QQ",
    "DOMAIN-SUFFIX,qq.com,💬 微信QQ",

    // 支付宝
    "DOMAIN-SUFFIX,alipay.com,💰 支付宝",

    // 阿里腾讯
    "DOMAIN-SUFFIX,aliyun.com,🛒 阿里腾讯",
    "DOMAIN-SUFFIX,tencent.com,🛒 阿里腾讯",


    // 中国 IP 直连
    "GEOIP,CN,DIRECT",


    // 其他全部走全球
    "MATCH,🚀 全球加速"

  ];


  for (const rule of rules){

    if(!config.rules.includes(rule)){
      config.rules.push(rule);
    }

  }

  return config;

}