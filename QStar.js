/*
 * QStar Rewrite
 * Version: 2.0.0
 *
 * Compatible:
 * - Mihomo
 * - Clash Mi
 *
 * Features:
 * - Keep airport config
 * - Application policy groups
 * - Region random groups
 * - Manual node selection
 */

function main(config) {

  if (!config) return config;


  // =====================
  // 基础
  // =====================

  config.proxies = config.proxies || [];

  config["proxy-groups"] =
    config["proxy-groups"] || [];

  config.rules =
    config.rules || [];


  // =====================
  // 节点过滤
  // =====================

  const proxies = config.proxies
    .filter(p =>
      p.name &&
      !p.name.includes("剩余流量") &&
      !p.name.includes("距离下次") &&
      !p.name.includes("套餐到期")
    )
    .map(p => p.name);



  function addGroup(group){

    if(
      !config["proxy-groups"]
      .some(g => g.name === group.name)
    ){

      config["proxy-groups"].push(group);

    }

  }



  // =====================
  // 全部节点
  // =====================

  addGroup({

    name:"🎲 全部随机",

    type:"url-test",

    url:"https://www.gstatic.com/generate_204",

    interval:300,

    tolerance:50,

    proxies:proxies

  });



  // =====================
  // 地区随机
  // =====================

  const regions = {

    "🇺🇸 美国随机":
    [
      "United States",
      "USA",
      "US"
    ],


    "🇯🇵 日本随机":
    [
      "Japan",
      "JP"
    ],


    "🇸🇬 新加坡随机":
    [
      "Singapore",
      "SG"
    ],


    "🇭🇰 香港随机":
    [
      "Hong Kong",
      "HK"
    ],


    "🇹🇼 台湾随机":
    [
      "Taiwan",
      "TW"
    ],


    "🇰🇷 韩国随机":
    [
      "Korea",
      "KR"
    ],


    "🇲🇾 马来西亚随机":
    [
      "Malaysia",
      "MY"
    ],


    "🇬🇧 英国随机":
    [
      "United Kingdom",
      "UK"
    ],


    "🇩🇪 德国随机":
    [
      "Germany",
      "DE"
    ],


    "🇳🇱 荷兰随机":
    [
      "Netherlands",
      "NL"
    ]

  };



  for(
    const region in regions
  ){

    const nodes =
      proxies.filter(name =>
        regions[region]
        .some(k =>
          name.includes(k)
        )
      );


    if(nodes.length){

      addGroup({

        name:region,

        type:"url-test",

        url:
        "https://www.gstatic.com/generate_204",

        interval:300,

        tolerance:50,

        proxies:nodes

      });

    }

  }



  // =====================
  // 全球加速
  // =====================


  addGroup({

    name:"🚀 全球加速",

    type:"select",

    proxies:[

      "🎲 全部随机",

      ...Object.keys(regions),

      ...proxies,

      "DIRECT"

    ]

  });



  // =====================
  // 应用策略组
  // =====================


  const apps=[

    "🤖 OpenAI",

    "🧠 Claude",

    "📱 Telegram",

    "🎵 TikTok",

    "🎮 国际游戏",

    "💳 PayPal",

    "🔍 Google服务",

    "🌐 Meta",

    "𝕏 X",

    "🎬 Netflix",

    "🐙 GitHub",

    "🪟 微软服务",

    "🍎 苹果服务",

    "₿ 加密货币"

  ];



  apps.forEach(name=>{

    addGroup({

      name:name,

      type:"select",

      proxies:[

        "🚀 全球加速",

        "🎲 全部随机",

        ...Object.keys(regions),

        ...proxies,

        "DIRECT"

      ]

    });

  });



  // =====================
  // 国内应用
  // =====================


  [

    "🎵 抖音",

    "📺 哔哩哔哩",

    "📕 小红书",

    "🛒 阿里腾讯",

    "💬 微信QQ",

    "💰 支付宝"

  ]
  .forEach(name=>{


    addGroup({

      name:name,

      type:"select",

      proxies:[

        "DIRECT",

        "🚀 全球加速"

      ]

    });


  });



  // =====================
  // 规则
  // =====================


  const rules=[


    "DOMAIN-SUFFIX,openai.com,🤖 OpenAI",

    "DOMAIN-SUFFIX,chatgpt.com,🤖 OpenAI",


    "DOMAIN-SUFFIX,claude.ai,🧠 Claude",

    "DOMAIN-SUFFIX,anthropic.com,🧠 Claude",


    "DOMAIN-SUFFIX,t.me,📱 Telegram",

    "DOMAIN-SUFFIX,telegram.org,📱 Telegram",


    "DOMAIN-SUFFIX,tiktok.com,🎵 TikTok",


    "DOMAIN-SUFFIX,paypal.com,💳 PayPal",


    "DOMAIN-SUFFIX,google.com,🔍 Google服务",

    "DOMAIN-SUFFIX,gstatic.com,🔍 Google服务",


    "DOMAIN-SUFFIX,facebook.com,🌐 Meta",

    "DOMAIN-SUFFIX,instagram.com,🌐 Meta",


    "DOMAIN-SUFFIX,x.com,𝕏 X",

    "DOMAIN-SUFFIX,twitter.com,𝕏 X",


    "DOMAIN-SUFFIX,netflix.com,🎬 Netflix",


    "DOMAIN-SUFFIX,github.com,🐙 GitHub",


    "DOMAIN-SUFFIX,microsoft.com,🪟 微软服务",


    "DOMAIN-SUFFIX,apple.com,🍎 苹果服务",


    "DOMAIN-SUFFIX,douyin.com,🎵 抖音",


    "DOMAIN-SUFFIX,bilibili.com,📺 哔哩哔哩",


    "DOMAIN-SUFFIX,xiaohongshu.com,📕 小红书",


    "DOMAIN-SUFFIX,wechat.com,💬 微信QQ",

    "DOMAIN-SUFFIX,qq.com,💬 微信QQ",


    "DOMAIN-SUFFIX,alipay.com,💰 支付宝",


    "DOMAIN-SUFFIX,tencent.com,🛒 阿里腾讯",

    "DOMAIN-SUFFIX,aliyun.com,🛒 阿里腾讯",


    "GEOIP,CN,DIRECT",


    "MATCH,🚀 全球加速"


  ];



  rules.forEach(rule=>{

    if(!config.rules.includes(rule)){

      config.rules.push(rule);

    }

  });



  return config;

}