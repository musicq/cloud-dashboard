import {DynamoDB} from 'aws-sdk'
import {v4} from 'uuid'
import {createResponse} from './shared/createResponse'
import {Err, go} from './shared/go'

const dynamo = new DynamoDB.DocumentClient()

interface Body {
  projectName: string
  username: string
}

export const main = async (event: AWSLambda.APIGatewayEvent) => {
  if (event.httpMethod !== 'POST') {
    return createResponse('Method not support', 404)
  }

  if (!event.body) {
    return createResponse('Body is empty.', 400)
  }

  const data: Body = JSON.parse(event.body)

  const {projectName, username} = data

  console.log(process.env.TABLE_NAME)
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.TABLE_NAME!,
    Item: {
      userId: username,
      dId: 'test',
      id: v4(),
      projectName,
      createdBy: username,
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
