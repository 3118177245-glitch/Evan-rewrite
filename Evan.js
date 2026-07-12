// Evan-rewrite
// Clash Mi JS Rewrite

function main(config) {

  // 示例：Reality节点优化
  if (config.proxies) {
    config.proxies = config.proxies.filter(p => {
      if (p.type === "vless" && p.realityOpts) {
        let sid = p.realityOpts["short-id"];
        if (sid && sid.length !== 0 && sid.length !== 8) {
          return false;
        }
      }
      return true;
    });
  }

  return config;
}