import * as gateway from '@aws-cdk/aws-apigateway'
import * as cdk from '@aws-cdk/core'
import {Functions} from './Functions'

export class Gateway extends cdk.Construct {
  api: gateway.RestApi
  projectsResource: gateway.Resource
  projectResource: gateway.Resource

  constructor(scope: cdk.Construct, id: string, functions: Functions) {
    super(scope, id)

    this.api = new gateway.RestApi(this, 'cloud-dashboard-api')

    this.api.root.addMethod('ANY')

    new gateway.LambdaRestApi(this, 'hello', {
      handler: functions.helloFn
    })

    this.projectsResource = this.api.root.addResource('project')
    this.projectsResource.addMethod(
      'GET',
      new gateway.LambdaIntegration(functions.getProjectsFn)
    )
    this.projectsResource.addMethod(
      'POST',
      new gateway.LambdaIntegration(functions.createProjectFn)
    )

    this.projectResource = this.projectsResource.addResource('{projectId}')
    this.projectResource.addMethod('GET')
    this.projectResource.addMethod('PUT')
    this.projectResource.addMethod('DELETE')
  }
}
