import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import {Cognito} from './Cognito'
import {Database} from './Database'

export class Functions extends cdk.Construct {
  helloFn: lambda.Function
  createProjectFn: lambda.Function
  getProjectsFn: lambda.Function
  getProjectByIdFn: lambda.Function
  updateProjectByIdFn: lambda.Function
  deleteProjectByIdFn: lambda.Function

  private defaultEnvironment: {[key: string]: string} = {
    TABLE_NAME: this.db.table.tableName,
    REGION: this.region,
    USER_POOL_ID: this.cognito.userPool.userPoolId
  }

  constructor(
    scope: cdk.Construct,
    id: string,
    private db: Database,
    private cognito: Cognito,
    private region: string
  ) {
    super(scope, id)

    this.helloFn = this.buildFunction('Hello', 'hello.main')

    this.createProjectFn = this.buildFunction('CreateProject', 'project.create')
    this.getProjectsFn = this.buildFunction('GetProjects', 'project.get')
    this.getProjectByIdFn = this.buildFunction(
      'GetProjectById',
      'project.getById'
    )
    this.updateProjectByIdFn = this.buildFunction(
      'UpdateProjectById',
      'project.updateProjectById'
    )
    this.deleteProjectByIdFn = this.buildFunction(
      'DeleteProjectById',
      'project.deleteProjectById'
    )

    db.table.grantReadWriteData(this.helloFn)
    db.table.grantWriteData(this.createProjectFn)
    db.table.grantReadData(this.getProjectsFn)
    db.table.grantReadData(this.getProjectByIdFn)
    db.table.grantWriteData(this.updateProjectByIdFn)
    db.table.grantWriteData(this.deleteProjectByIdFn)
  }

  private buildFunction(
    id: string,
    handler: string,
    environment = this.defaultEnvironment
  ) {
    return new lambda.Function(this, id, {
      code: lambda.Code.fromAsset('./lambda'),
      handler: `functions/${handler}`,
      runtime: lambda.Runtime.NODEJS_12_X,
      environment
    })
  }
}
