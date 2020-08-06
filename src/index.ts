import protobuf from "protobufjs";

protobuf.load("./src/starwars.proto", function (error, root) {
  if (error) throw error;

  if (!root) throw Error("No root!");

  const StarwarsPersonMessage = root.lookupType(
    "starwarspackage.StarwarsPersonMessage"
  );

  const GenderEnum = StarwarsPersonMessage.getEnum("Gender");

  const payload = {
    name: "Luke Skywalker",
    height: 172,
    mass: 77,
    birthYear: "19BBY",
    gender: GenderEnum.male,
  };

  const validationError = StarwarsPersonMessage.verify(payload);

  if (validationError) throw Error(validationError);

  console.log("PAYLOAD =======================");
  console.log(payload);
  console.log("===============================");

  const message = StarwarsPersonMessage.create(payload);

  console.log("MESSAGE =======================");
  console.log(message);
  console.log("===============================");

  const buffer = StarwarsPersonMessage.encode(message).finish();

  console.log("BUFFER =======================");
  console.log(buffer);
  console.log("===============================");

  const decodedMessage = StarwarsPersonMessage.decode(buffer);

  console.log("DECODED MESSAGE ===============");
  console.log(decodedMessage);
  console.log("===============================");

  const deserialisedObject = StarwarsPersonMessage.toObject(decodedMessage);

  console.log("DESERIALISED OBJECT ===========");
  console.log(deserialisedObject);
  console.log("===============================");
});
