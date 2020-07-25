import {DynamoDB} from 'aws-sdk'
import {v4} from 'uuid'
import {createResponse} from '../shared/createResponse'
import {Err, go} from '../shared/go'

const dynamo = new DynamoDB.DocumentClient()

interface createProjectModel {
  username: string
  projectName: string
}

export const create = async (event: AWSLambda.APIGatewayEvent) => {
  if (!event.body) {
    return createResponse('Body is empty.', 400)
  }

  const data: createProjectModel = JSON.parse(event.body)

  const {projectName, username} = data

  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      username,
      id: v4(),
      projectName,
      createdAt: Date.now()
    }
  }

  const res = await go(dynamo.put(params).promise())

  if (res instanceof Err) {
    console.error(`Create project failed.\nData: ${event.body}\n`, res.e)

    return createResponse('Create project failed.', 500)
  }

  return createResponse(params.Item)
}

export const get = async (event: AWSLambda.APIGatewayEvent) => {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME!,
    KeyConditionExpression: 'username = :u',
    ExpressionAttributeValues: {
      ':u': 'lk'
    }
  }

  const res = await go(dynamo.query(params).promise())

  if (res instanceof Err) {
    return createResponse('Get projects failed.', 500)
  }

  return createResponse(res)
}
