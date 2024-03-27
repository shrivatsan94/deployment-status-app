import boto3
from datetime import datetime

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb', region_name='eu-central-1')


def convert_to_iso_format(date_str):
    # Parse the date string to datetime object
    date_obj = datetime.strptime(date_str, '%d-%B-%Y %H:%M:%S')
    # Convert datetime object to ISO 8601 format
    iso_format_date = date_obj.isoformat()
    return iso_format_date
# Example function to query data starting from a particular date
def query_data_starting_from_date(start_date, end_date):
    # Define your query parameters

    start_date_iso = convert_to_iso_format(start_date)

    print(start_date_iso)

    params = {
        'TableName': 'jenkinsJobDetailsTimeBased',
        'FilterExpression': '#time_attr BETWEEN :start_time AND :end_time',
        'ExpressionAttributeNames': {
            '#time_attr': 'time'
        },
        'ExpressionAttributeValues': {
            ':start_time': {'S': start_date}  ,# Adjust as needed
            ':end_time': {'S': end_date}
        }
    }

    # Perform the query operation
    response = dynamodb.scan(**params)

    # Process the response
    items = response['Items']

    # Return the item

    return items

# Example usage
start_date = '25-March-2024 00:00:00'  # Adjust as needed
end_date = '26-March-2024 23:59:59'
queried_items = query_data_starting_from_date(start_date,end_date)

print(queried_items)