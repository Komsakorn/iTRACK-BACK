const app = require("../api/index");
const boot = async () => {
  await mongoose.connect(config.mongoUri, config.mongoOptions);
  app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
};

boot();
