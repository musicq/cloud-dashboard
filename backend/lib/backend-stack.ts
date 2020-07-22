import * as cdk from '@aws-cdk/core';
import { Database } from '../constructs/Database';
import { Functions } from '../constructs/Functions';
import { Gateway } from '../constructs/Gateway';

export class BackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const database = new Database(this, 'Database');
    const functions = new Functions(this, 'LambdaFunctions');
    const gateway = new Gateway(this, 'Gateway', functions);
  }
}
