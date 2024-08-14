const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
const producer = new Producer(client);

producer.on('ready', () => {
    console.log('Producer is ready');
    for (let i = 0; i < 1; i++) {
        const message = {
            id:'ea9850a5-f6c5-4cfa-a508-6b0ec097f089',
            serial_number:'SN_BAA_472662'
        }

        const payloads = [
            {
                topic: 'your-topic',
                messages: JSON.stringify(message),
                key: `${i}`
            }
        ];
        producer.send(payloads, (err, data) => {
            if (err) {
                console.error('Error sending message:', err);
            } else {
                console.log('Message sent:', data);
            }
        });
    }
});

producer.on('error', (err) => {
    console.error('Producer error:', err);
});
