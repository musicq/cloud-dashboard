import * as cdk from '@aws-cdk/core'
import {Cognito} from '../constructs/Cognito'
import {Database} from '../constructs/Database'
import {Functions} from '../constructs/Functions'
import {Gateway} from '../constructs/Gateway'

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const cognito = new Cognito(this, 'UserPool')
    const database = new Database(this, 'Database')
    const functions = new Functions(this, 'LambdaFunctions', database, cognito, this.region)
    const gateway = new Gateway(this, 'Gateway', functions, cognito)
  }
}
