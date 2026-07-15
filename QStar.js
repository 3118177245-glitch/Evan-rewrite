function main(config) {
  config.rules.unshift(
    "DOMAIN-SUFFIX,openai.com,PROXY",
    "DOMAIN-SUFFIX,github.com,PROXY"
  );

  return config;
}