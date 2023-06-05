const amqp = require("amqplib");

async function sendToQueue() {
  try {
    const connection = await amqp.connect("amqp://localhost"); // Replace 'localhost' with the appropriate host if needed
    const channel = await connection.createChannel();

    const queue = "my_queue";
    const message = "Hello, ActiveMQ!";

    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Message sent: ${message}`);

    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error(error);
  }
}

sendToQueue();
