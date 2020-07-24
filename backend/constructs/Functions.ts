import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import {Database} from './Database'

export class Functions extends cdk.Construct {
  helloFn: lambda.Function
  projectFn: lambda.Function

  constructor(scope: cdk.Construct, id: string, db: Database) {
    super(scope, id)

    this.helloFn = new lambda.Function(this, 'helloFn', {
      code: lambda.Code.fromAsset('./lambda'),
      handler: 'hello.main',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: db.table.tableName
      }
    })

    this.projectFn = new lambda.Function(this, 'projectFn', {
      code: lambda.Code.fromAsset('./lambda'),
      handler: 'project.main',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: db.table.tableName
      }
    })

    db.table.grantReadWriteData(this.helloFn)
    db.table.grantReadWriteData(this.projectFn)
  }
}
