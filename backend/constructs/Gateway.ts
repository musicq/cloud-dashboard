import * as gateway from '@aws-cdk/aws-apigateway'
import {AuthorizationType} from '@aws-cdk/aws-apigateway'
import * as cdk from '@aws-cdk/core'
import {Functions} from './Functions'

export class Gateway extends cdk.Construct {
  api: gateway.RestApi
  projectsResource: gateway.Resource
  projectResource: gateway.Resource

  constructor(scope: cdk.Construct, id: string, functions: Functions) {
    super(scope, id)

    this.api = new gateway.RestApi(this, 'cloud-dashboard-api', {
      defaultCorsPreflightOptions: {
        allowOrigins: gateway.Cors.ALL_ORIGINS,
        allowMethods: gateway.Cors.ALL_METHODS,
        allowHeaders: ['*']
      }
    })

    this.api.root.addMethod('ANY')

    new gateway.LambdaRestApi(this, 'hello', {
      handler: functions.helloFn
    })

    // /projects
    this.projectsResource = this.api.root.addResource('projects', {
      defaultCorsPreflightOptions: {
        allowOrigins: gateway.Cors.ALL_ORIGINS,
        allowMethods: gateway.Cors.ALL_METHODS,
        allowHeaders: ['*']
      }
    })
    this.projectsResource.addMethod(
      'GET',
      new gateway.LambdaIntegration(functions.getProjectsFn),
      {authorizationType: AuthorizationType.IAM}
    )
    this.projectsResource.addMethod(
      'POST',
      new gateway.LambdaIntegration(functions.createProjectFn),
      {authorizationType: AuthorizationType.IAM}
    )

    // projects/:projectId
    this.projectResource = this.projectsResource.addResource('{projectId}', {
      defaultCorsPreflightOptions: {
        allowOrigins: gateway.Cors.ALL_ORIGINS,
        allowMethods: gateway.Cors.ALL_METHODS,
        allowHeaders: ['*']
      }
    })
    this.projectResource.addMethod(
      'GET',
      new gateway.LambdaIntegration(functions.getProjectByIdFn),
      {authorizationType: AuthorizationType.IAM}
    )
    this.projectResource.addMethod('PUT')
    this.projectResource.addMethod('DELETE')
  }
}
