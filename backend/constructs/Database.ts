import {AttributeType, Table} from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core'
import {EnvProps} from '../types'

export class Database extends cdk.Construct {
  table: Table

  constructor(scope: cdk.Construct, id: string, env: EnvProps) {
    super(scope, id)

    this.table = new Table(this, env.tableName, {
      partitionKey: {name: 'userId', type: AttributeType.STRING},
      sortKey: {name: 'dId', type: AttributeType.STRING}
    })
  }
}
