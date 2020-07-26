import * as gateway from '@aws-cdk/aws-apigateway'
import {
  AuthorizationType,
  CfnAuthorizer,
  CfnMethod
} from '@aws-cdk/aws-apigateway'
import {CorsOptions} from '@aws-cdk/aws-apigateway/lib/cors'
import * as lambda from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import {Cognito} from './Cognito'
import {Functions} from './Functions'

export class Gateway extends cdk.Construct {
  api: gateway.RestApi
  projectsResource: gateway.Resource
  projectResource: gateway.Resource

  private authorizer: CfnAuthorizer

  private static get defaultCorsPreflightOptions(): CorsOptions {
    return {
      allowOrigins: gateway.Cors.ALL_ORIGINS,
      allowMethods: gateway.Cors.ALL_METHODS,
      allowHeaders: ['*']
    }
  }

  constructor(
    scope: cdk.Construct,
    id: string,
    private functions: Functions,
    private cognito: Cognito
  ) {
    super(scope, id)

    this.api = new gateway.RestApi(this, 'cloud-dashboard-api', {
      defaultCorsPreflightOptions: Gateway.defaultCorsPreflightOptions
    })

    this.authorizer = new CfnAuthorizer(this, 'cloud-dashboard-authorizer', {
      name: 'cloud-dashboard-authorizer',
      restApiId: this.api.restApiId,
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [this.cognito.userPool.userPoolArn]
    })

    new gateway.LambdaRestApi(this, 'hello', {
      handler: functions.helloFn
    })

    this.buildProjectsAPI()
  }

  private wrapAuthorizer(
    res: gateway.Resource,
    method: string,
    fn: lambda.Function
  ) {
    // see: https://stackoverflow.com/questions/52726914/aws-cdk-user-pool-authorizer
    const c = res.addMethod(method, new gateway.LambdaIntegration(fn), {
      authorizationType: AuthorizationType.COGNITO
    })

    const m = c.node.defaultChild as CfnMethod

    m.addOverride('Properties.AuthorizerId', {
      Ref: this.authorizer.logicalId
    })
  }

  private buildProjectsAPI() {
    // projects
    this.projectsResource = this.api.root.addResource('projects')

    this.wrapAuthorizer(
      this.projectsResource,
      'GET',
      this.functions.getProjectsFn
    )
    this.wrapAuthorizer(
      this.projectsResource,
      'POST',
      this.functions.createProjectFn
    )

    // projects/:projectId
    this.projectResource = this.projectsResource.addResource('{projectId}')

    this.wrapAuthorizer(
      this.projectResource,
      'GET',
      this.functions.getProjectByIdFn
    )
    this.projectResource.addMethod('PUT')
    this.projectResource.addMethod('DELETE')
  }
}
