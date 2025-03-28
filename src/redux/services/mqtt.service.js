import mqttInstance from "./mqttInstance";

const connectToBroker = async (brokerIp, port, username, password) => {
  try {
    const response = await mqttInstance.post("ConfigBroker/Start", {
      brokerIp,
      port,
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error connecting to broker:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

const MQTTService = {
  connectToBroker,
};

export default MQTTService;
