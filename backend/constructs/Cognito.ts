import * as cognito from '@aws-cdk/aws-cognito'
import * as cdk from '@aws-cdk/core'

export class Cognito extends cdk.Construct {
  userPool: cognito.UserPool
  userClient: cognito.UserPoolClient

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id)

    this.userPool = new cognito.UserPool(this, 'cloud-dashboard-userpool', {
      userPoolName: 'cloud-dashboard-user-pool',
      selfSignUpEnabled: true,
      signInAliases: {username: true, email: true},
      standardAttributes: {email: {required: true}}
    })

    this.userClient = this.userPool.addClient('client', {
      userPoolClientName: 'cloud-dashboard-client'
    })
  }
}
