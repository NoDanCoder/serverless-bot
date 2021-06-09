'use strict'

const AWS = require('aws-sdk')
const uuid = require('uuid')

const dynamoDb = new AWS.DynamoDB.DocumentClient()

module.exports.createTodo = async event => {

    const datetime = new Date().toISOString()
    const data = JSON.parse(event.body)

    if (!data.message || typeof data.message !== 'string') {
        return {
            statusCode: 400,
            body: JSON.stringify({
                "message": "Message is not a string"
            })
        }
    }

    const params = {
        TableName: 'message_thread',
        Item: {
            id: uuid.v1(),
            message: data.message,
            sentAt: datetime
        }
    }

    try {
        const data = await dynamoDb.put(params).promise()
        return {
            statusCode: 201,
            body: JSON.stringify(data.Item)
        }
    } catch (err) {
        return new Error(error)
    }
}