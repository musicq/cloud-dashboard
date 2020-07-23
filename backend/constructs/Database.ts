import {AttributeType, Table} from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core'

export class Database extends cdk.Construct {
  table: Table

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id)

    this.table = new Table(this, id, {
      partitionKey: {name: 'userId', type: AttributeType.STRING},
      sortKey: {name: 'dId', type: AttributeType.STRING}
    })
  }
}
