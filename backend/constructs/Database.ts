import {AttributeType, Table} from '@aws-cdk/aws-dynamodb'
import * as cdk from '@aws-cdk/core'

export class Database extends cdk.Construct {
  table: Table

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id)

    this.table = new Table(this, 'cloud-dashboard-apps', {
      partitionKey: {name: 'username', type: AttributeType.STRING},
      sortKey: {name: 'id', type: AttributeType.STRING}
    })
  }
}
