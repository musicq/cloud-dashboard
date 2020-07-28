import {DynamoDB} from 'aws-sdk'
import {v4} from 'uuid'
import {createNewWidgetsTemplate} from '../shared/createNewWidgetsTemplate'
import {createResponse} from '../shared/createResponse'
import {Err, go} from '../shared/go'
import {
  SythenAPIGatewayEvent,
  withAuthenticate
} from '../shared/withAuthenticate'

const dynamo = new DynamoDB.DocumentClient()

interface createProjectModel {
  username: string
  projectName: string
}

const TableName = process.env.TABLE_NAME

if (!TableName) {
  throw new Error('env var required for TABLE_NAME')
}

export const create = withAuthenticate(async (event: SythenAPIGatewayEvent) => {
  if (!event.body) {
    return createResponse('Body is empty.', 400)
  }

  const data: createProjectModel = JSON.parse(event.body)

  const {projectName, username} = data

  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName,
    Item: {
      username,
      id: v4(),
      projectName,
      createdAt: Date.now(),
      resources: createNewWidgetsTemplate()
    }
  }

  const res = await go(dynamo.put(params).promise())

  if (res instanceof Err) {
    console.error(`Create project failed.\nData: ${event.body}\n`, res.e)

    return createResponse('Create project failed.', 500)
  }

  return createResponse(params.Item)
})

export const get = withAuthenticate(async (event: SythenAPIGatewayEvent) => {
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName,
    KeyConditionExpression: 'username = :u',
    ExpressionAttributeValues: {
      ':u': event.token.data.userName
    }
  }

  const res = await go(dynamo.query(params).promise())

  if (res instanceof Err) {
    return createResponse('Get project list failed.', 500)
  }

  return createResponse(res)
})

export const getById = withAuthenticate(
  async (event: SythenAPIGatewayEvent) => {
    if (
      !event.pathParameters ||
      Object.keys(event.pathParameters).length === 0
    ) {
      return createResponse('Need to specific project id', 400)
    }

    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName,
      Key: {
        username: event.token.data.userName,
        id: event.pathParameters.projectId
      }
    }

    const res = await go(dynamo.get(params).promise())

    if (res instanceof Err) {
      return createResponse(
        `Get project id ${event.pathParameters.projectId} failed.`,
        500
      )
    }

    return createResponse(res)
  }
)
