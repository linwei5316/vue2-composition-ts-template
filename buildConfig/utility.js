module.exports = {
  processEnvGenerator: (envObject) => {
    const result = {};

    for (const [key, value] of Object.entries(envObject)) {
      result[`process.env.${ key }`] = JSON.stringify(value);
    }

    return result;
  },
};
