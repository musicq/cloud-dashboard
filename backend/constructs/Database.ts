import {AttributeType, Table} from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core'

export class Database extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id)

    new Table(this, 'Question', {
      partitionKey: {name: 'id', type: AttributeType.NUMBER}
    })
  }
}
