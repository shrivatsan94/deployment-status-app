import boto3
import json
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal

# Initialize a DynamoDB client
dynamodb = boto3.resource('dynamodb', region_name = 'eu-central-1')

# Custom JSON encoder for handling Decimal types from DynamoDB
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super(DecimalEncoder, self).default(obj)

def lambda_handler(event, context):
    # Define the DynamoDB table
    table = dynamodb.Table('jenkinsJobDetails')

    # Parse the 'jobName' from the event's query string
    job_name = 'all'
    job_status = 'all'
    limit = 10
    exclusive_start_key = None
    #job_name = event.get('queryStringParameters', {}).get('jobName', 'all')
    #job_status = event.get('queryStringParameters', {}).get('jobStatus', 'all')
    #limit = int(event.get('queryStringParameters', {}).get('limit', 10))
    #exclusive_start_key = event.get('queryStringParameters', {}).get('exclusive_start_key', None)
    # Define the response object
    response = {
        'statusCode': 200,
        'body': '',
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin" : "*",
            "Allow" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Methods" : "GET, OPTIONS, POST",
            "Access-Control-Allow-Headers" : "*"
        }
    }

    try:
        # If jobName is 'all', scan the entire table
        print("trying")
        if job_name == 'all' and job_status == 'all':
            print("inside if")
            if exclusive_start_key:
                print("inside key")
                result = table.scan(Limit=limit, ExclusiveStartKey=exclusive_start_key)
                print("result", result)
            else:
                print("inside else")
                result = table.scan(Limit=limit)
                print("result", result)
        elif job_name != 'all' and job_status != 'all':
            filterExpression = Attr('jobName').eq(job_name) & Attr('status').eq(job_status)
            # Query the table for the specific jobName
            if exclusive_start_key:
                result = table.scan(
                    FilterExpression=filterExpression,
                    Limit=limit,
                    ExclusiveStartKey=exclusive_start_key
                )
            else:
                result = table.scan(
                    FilterExpression=filterExpression,
                    Limit=limit
                )
        elif job_name != 'all' and job_status == 'all':
            if exclusive_start_key:
                result = table.query(
                    KeyConditionExpression=Key('jobName').eq(job_name),
                    Limit=limit,
                    ExclusiveStartKey=exclusive_start_key
                )
            else:
                result = table.query(
                    KeyConditionExpression=Key('jobName').eq(job_name),
                    Limit=limit
                )
        elif job_name == 'all' and job_status != 'all':
            filterExpression = Attr('status').eq(job_status)
            if exclusive_start_key:
                result = table.scan(
                    FilterExpression=filterExpression,
                    Limit=limit,
                    ExclusiveStartKey=exclusive_start_key
                )
            else:
                result = table.scan(
                    FilterExpression=filterExpression,
                    Limit=limit
                )

        # Format the items for the response
        print("result", result)
        items = result.get('Items', [])
        next_exclusive_start_key = result.get('LastEvaluatedKey')
        collectiveBody = { 'jobDetails': items, 'count': result.get('Count',0), 'nextExclusiveStartKey': next_exclusive_start_key }
        response['body'] = json.dumps(collectiveBody, cls=DecimalEncoder)

    except Exception as e:
        print(e)
        response = {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}, cls=DecimalEncoder),
            'headers': response['headers']
        }

    return response


lambda_handler('test','test')