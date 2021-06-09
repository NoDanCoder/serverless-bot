'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.getTodo = async event => {

    const params = {
        TableName: 'message_thread',
        Key: {
            id: event.pathParameters.id
        }
    }

    try {
        const data = await dynamoDb.get(params).promise()
        return data.Item ? {
            statusCode: 200,
            body: JSON.stringify(data.Item)
        } : {
            statusCode: 404,
            body: JSON.stringify({ "message" : 'Task not found' })
        }
    } catch (err) {
        return new Error(err)
    }
}