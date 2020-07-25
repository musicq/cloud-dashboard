import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import {Database} from './Database'

export class Functions extends cdk.Construct {
  helloFn: lambda.Function
  createProjectFn: lambda.Function
  getProjectsFn: lambda.Function

  constructor(scope: cdk.Construct, id: string, db: Database) {
    super(scope, id)

    this.helloFn = new lambda.Function(this, 'Hello', {
      code: lambda.Code.fromAsset('./lambda'),
      handler: 'functions/hello.main',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: db.table.tableName
      }
    })

    this.createProjectFn = new lambda.Function(this, 'CreateProject', {
      code: lambda.Code.fromAsset('./lambda'),
      handler: 'functions/project.create',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: db.table.tableName
      }
    })

    this.getProjectsFn = new lambda.Function(this, 'GetProjects', {
      code: lambda.Code.fromAsset('./lambda'),
      handler: 'functions/project.get',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        TABLE_NAME: db.table.tableName
      }
    })

    db.table.grantReadWriteData(this.helloFn)
    db.table.grantReadWriteData(this.createProjectFn)
    db.table.grantReadData(this.getProjectsFn)
  }
}
