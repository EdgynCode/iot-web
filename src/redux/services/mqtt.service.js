import mqttInstance from "./mqttInstance";

const connectToBroker = async (brokerIp, port, username, password) => {
  try {
    const response = await mqttInstance.post("ConfigBroker/Connect", {
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

const brokerConfig = async (deviceNumber, name, packetNumber, data) => {
  try {
    const response = await mqttInstance.post(
      `ConfigBroker/SetConfig?topic=/${deviceNumber}/control/config/req`,
      {
        name,
        packetNumber,
        data,
      }
    );
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
  brokerConfig,
};

export default MQTTService;
