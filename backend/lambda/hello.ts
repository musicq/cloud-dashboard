import * as AWS from 'aws-sdk'
import {DocumentClient} from 'aws-sdk/lib/dynamodb/document_client'
import {Err, go} from './shared/go'

const dynamo = new AWS.DynamoDB.DocumentClient()

export const main = async (event: AWSLambda.APIGatewayEvent) => {
  const headers = {
    'Content-Type': 'application/json'
  }

  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: `Go Serverless v1.0! ${(await message({time: 1, copy: 'Your function executed successfully!'}))}`
      })
    }
  }

  if (event.httpMethod !== 'POST' || !event.body) {
    return {
      statusCode: 500,
      headers,
      body: `Not support method ${event.httpMethod}.`
    }
  }

  const data = JSON.parse(event.body)
  const {userId, dId, content} = data

  const params: DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      userId,
      dId,
      content
    }
  }

  const res = await go(dynamo.put(params).promise())

  if (res instanceof Err) {
    return {
      statusCode: 500,
      headers,
      body: `something wrong when operating db.\n${res.e}`
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(params)
  }
}

const message = ({time, ...rest}: {time: number, copy: string}) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`)
  }, time * 1000)
)
