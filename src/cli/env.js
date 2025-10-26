const parseEnv = () => {
  const prefix = "RSS_";
  const argEnv = [];

  for (const key in process.env) {
    if (key.startsWith(prefix)) {
      argEnv.push(`${key}=${process.env[key]}`);
    }
  }

  const result = argEnv.join("; ");
  console.log(result);
};

parseEnv();
