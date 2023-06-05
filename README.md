# Basic Communication with ActiveMQ

# Prerequisite to proceed further

- you should have installed docker desktop or docker cli in your machine.
- install rabitmq docker image

```
docker pull rmohr/activemq

```

- run command for activeMQ docker image

```
docker run -p 61616:61616 -p 8161:8161 rmohr/activemq

```

- install package in node for connection with activeMQ running instance

```
npm install amqplib

```

If you want to see ActiveMQ server running in your machine and see all queues and topic you can type this link in your browser
and put username:admin and password: admin

```
http://localhost:8161/admin

```

## Producer(producer.js)

- This code serves as a basic template for sending messages to a ActiveMQ queue using Node.js. Remember to have ActiveMQ running on localhost and have the amqplib package installed (npm install amqplib) before running this code.

- The code begins by importing the amqplib library, which provides the necessary functionality to interact with ActiveMQ.

- The sendToQueue function is defined as an async function. This allows the use of await to handle asynchronous operations in a synchronous-looking manner.

- Within the sendToQueue function, the code attempts to establish a connection to the ActiveMQ server running on localhost using amqp.connect("amqp://localhost"). If successful, it returns a connection object.

- Once the connection is established, a channel is created using connection.createChannel(). Channels are used to interact with the ActiveMQ server.

- The queue variable is set to the name of the queue where the message will be sent. In this case, it is set to "some_rabbit".

- The message variable is set to the content of the message that will be sent to the queue. In this example, it is set to "Hello, ActiveMQ!".

- The channel.assertQueue(queue) function is called to ensure that the queue exists. If the queue doesn't exist, it will be created.

- channel.sendToQueue(queue, Buffer.from(message)) is used to publish the message to the specified queue. The message is converted to a Buffer object before sending.

- After sending the message, a success message is printed to the console using console.log.

- Finally, the channel and connection are closed using channel.close() and connection.close() to release the resources and terminate the program.

- Any errors that occur during the process are caught in the catch block, and the error is logged to the console using console.error.

- The sendToQueue() function is called at the end to initiate the message sending process.

## Consumer( consumer.js)

The code snippet you provided demonstrates a consumer implementation using the amqplib library in Node.js to receive messages from a ActiveMQ queue. Here's a breakdown of the code:
You can use this code as a starting point for building a consumer that consumes messages from a ActiveMQ queue in your Node.js application. Remember to install the amqplib package (npm install amqplib) and update the ActiveMQ connection URL and queue name according to your environment.

- The code begins by importing the amqplib library, which is used to interact with ActiveMQ.

- The receiveFromQueue() function is declared as an asynchronous function. This allows the use of await to handle promises and make the code easier to read.

- Inside the receiveFromQueue() function, a connection is established to the ActiveMQ server running on localhost using amqp.connect().

- A channel is created using connection.createChannel(). Channels are used to perform actions such as creating queues, publishing messages, and consuming messages.

- The queue variable is set to the name of the ActiveMQ queue from which messages will be consumed. In the provided code, it is set to "some_rabbit", but you can change it to the desired queue name.

- The assertQueue() function is called on the channel to ensure that the specified queue exists. This step is optional, but it's a good practice to confirm that the queue is ready for consumption.

- The channel.consume() function is used to start consuming messages from the queue. It takes three arguments: the name of the queue, a callback function to handle received messages, and an options object. In this case, the callback function logs the received message to the console using console.log(). After processing the message, channel.ack() is called to acknowledge that the message has been successfully processed. The { noAck: false } option ensures that messages are not automatically acknowledged and allows explicit acknowledgment.

- A message stating "Waiting for messages..." is logged to the console, indicating that the consumer is ready and waiting for messages to arrive.

- The process.on() function is used to handle the SIGINT signal, which is emitted when the consumer is interrupted, such as when the process is terminated. When the SIGINT signal is received, the channel and connection are closed, a message is logged to indicate that the consumer has stopped, and the process is exited.

- Error handling is implemented within a try-catch block. If an error occurs during the connection, channel creation, or message consumption, the error is logged to the console using console.error().

- Finally, the receiveFromQueue() function is invoked to start the consumer and begin listening for messages.
