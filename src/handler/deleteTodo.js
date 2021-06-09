'use strict'

const AWS = require('aws-sdk')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.deleteTodo = async event => {

    const params = {
        TableName: 'message_thread',
        Key: {
            id: event.pathParameters.id
        }
    }

    try {
        const data = await dynamoDb.delete(params).promise()
        return {
            statusCode: 200,
            body: JSON.stringify({})
        }
    } catch (err) {
        return new Error(err)
    }
}