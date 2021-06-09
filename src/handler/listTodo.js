'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.listTodo = async () => {

    const params = {
        TableName: 'message_thread'
    };

    try {
        const data = await dynamoDb.scan(params).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items)
        }
    } catch (err) {
        return new Error(error)
    }
}