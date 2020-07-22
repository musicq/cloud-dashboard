import * as gateway from '@aws-cdk/aws-apigateway';
import * as cdk from '@aws-cdk/core';
import { Functions } from './Functions';

export class Gateway extends cdk.Construct {
  constructor(scope: cdk.Construct, id: string, functions: Functions) {
    super(scope, id);

    new gateway.LambdaRestApi(this, 'hello', {
      handler: functions.helloFn
    });
  }
}
