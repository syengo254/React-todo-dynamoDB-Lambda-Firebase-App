import AWS from 'aws-sdk';
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: 'tasks',
  /* Item properties will depend on your application concerns */
  Item: {
    id: 'wer121',
    title: "Example task",
    completed: false,
  }
};

export const handler = async (event) => {
  try {
    await docClient.put(params).promise();
    return { body: 'Successfully created item!' };
  } catch (err) {
    return { error: err };
  }
};
