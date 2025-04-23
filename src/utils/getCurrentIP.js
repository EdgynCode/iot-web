const { exec } = require("child_process");

const getCurrentIPAddress = () => {
  return new Promise((resolve, reject) => {
    exec("ipconfig", (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        reject(`Error: ${stderr}`);
        return;
      }

      const ipRegex = /IPv4 Address[. ]+: ([\d.]+)/;
      const match = stdout.match(ipRegex);
      if (match) {
        resolve(match[1]);
      } else {
        reject("IP address not found");
      }
    });
  });
};

getCurrentIPAddress()
  .then((ip) => {
    console.log(`Current IP Address: ${ip}`);
  })
  .catch((error) => {
    console.error(error);
  });
