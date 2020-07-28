import {DynamoDB} from 'aws-sdk'
import {v4} from 'uuid'
import {WidgetsLayout} from '../models/Widget'
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

  let data: createProjectModel
  try {
    data = JSON.parse(event.body)
  } catch (e) {
    console.log(e)
    return createResponse('Body is an invalid json format', 400)
  }

  const {projectName, username} = data

  const queryParams: DynamoDB.DocumentClient.QueryInput = {
    TableName,
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': event.token.data.userName
    }
  }

  const queryRes = await go(dynamo.query(queryParams).promise())

  if (queryRes instanceof Err) {
    console.error(`Create project failed.\nData: ${event.body}\n`, queryRes.e)

    return createResponse('Create project failed.', 500)
  }

  if (
    queryRes.Items &&
    queryRes.Items.length > 0 &&
    queryRes.Items.find(item => item.projectName === projectName)
  ) {
    return createResponse(
      `Project with name ${projectName} is existed. Please using a unique one`,
      400
    )
  }

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
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: {
      ':username': event.token.data.userName
    },
    ProjectionExpression: 'username,id,projectName,createAt'
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

export const updateProjectById = withAuthenticate(
  async (event: SythenAPIGatewayEvent) => {
    if (
      !event.pathParameters ||
      Object.keys(event.pathParameters).length === 0
    ) {
      return createResponse('Need to specific project id', 400)
    }

    if (!event.body) {
      return createResponse('No body found', 400)
    }

    let resources: WidgetsLayout = []

    try {
      resources = JSON.parse(event.body)
    } catch (e) {
      return createResponse('Body is an invalid json format', 400)
    }

    const params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName,
      Key: {
        username: event.token.data.userName,
        id: event.pathParameters.projectId
      },
      UpdateExpression: 'set resources = :newResources',
      ExpressionAttributeValues: {':newResources': resources}
    }

    const res = await go(dynamo.update(params).promise())

    if (res instanceof Err) {
      return createResponse(
        `Update project ${event.pathParameters.projectId} failed.`,
        500
      )
    }

    return createResponse('ok')
  }
)

export const deleteProjectById = withAuthenticate(
  async (event: SythenAPIGatewayEvent) => {
    if (
      !event.pathParameters ||
      Object.keys(event.pathParameters).length === 0
    ) {
      return createResponse('Need to specific project id', 400)
    }

    const params: DynamoDB.DocumentClient.DeleteItemInput = {
      TableName,
      Key: {
        id: event.pathParameters.projectId
      }
    }

    const res = await go(dynamo.delete(params).promise())

    if (res instanceof Err) {
      return createResponse(
        `Delete project ${event.pathParameters.projectId} failed.`,
        500
      )
    }

    return createResponse('ok')
  }
)
