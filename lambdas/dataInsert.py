import boto3

# AWS credentials and region

region_name = 'eu-central-1'

# DynamoDB table name
table_name = 'jenkinsJobDetailsTimeBased'

# JSON data to insert
data = [

    {
        "time": {
            "S": "25-March-2024 14:43:05"
        },
        "jobName": {
            "S": "mypicture.lv Templates - master pipeline"
        },
        "buildNumber": {
            "N": "101"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 17:55:34"
        },
        "jobName": {
            "S": "mypicture.lv Templates - master pipeline"
        },
        "buildNumber": {
            "N": "102"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:52:42"
        },
        "jobName": {
            "S": "bestcanvas.se Templates - master pipeline"
        },
        "buildNumber": {
            "N": "869"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 12:06:27"
        },
        "jobName": {
            "S": "picanova.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "710"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:11:20"
        },
        "jobName": {
            "S": "picanova.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "236"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:16:02"
        },
        "jobName": {
            "S": "picanova.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "237"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 16:00:20"
        },
        "jobName": {
            "S": "picanova.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "238"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 11:09:09"
        },
        "jobName": {
            "S": "fotowelt.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "66"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 12:54:13"
        },
        "jobName": {
            "S": "fotowelt.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "67"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 14:53:47"
        },
        "jobName": {
            "S": "minuntaulut.fi Templates - master pipeline"
        },
        "buildNumber": {
            "N": "284"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 12:04:36"
        },
        "jobName": {
            "S": "mi-arte.es Templates - master pipeline"
        },
        "buildNumber": {
            "N": "1227"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 10:47:51"
        },
        "jobName": {
            "S": "meinfoto.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "3602"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 11:00:10"
        },
        "jobName": {
            "S": "meinfoto.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "3603"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:10:26"
        },
        "jobName": {
            "S": "fotos-fressnapf.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "35"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 14:12:48"
        },
        "jobName": {
            "S": "fotos-fressnapf.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "36"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 14:19:00"
        },
        "jobName": {
            "S": "fotos-fressnapf.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "37"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 11:48:50"
        },
        "jobName": {
            "S": "aldifotos.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "2252"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 07:15:48"
        },
        "jobName": {
            "S": "clean-up-jenkins-workspace"
        },
        "buildNumber": {
            "N": "50"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 07:22:59"
        },
        "jobName": {
            "S": "clean-up-jenkins-workspace"
        },
        "buildNumber": {
            "N": "53"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 07:32:41"
        },
        "jobName": {
            "S": "clean-up-jenkins-workspace"
        },
        "buildNumber": {
            "N": "55"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 10:27:41"
        },
        "jobName": {
            "S": "bestecanvas.nl Templates - master pipeline"
        },
        "buildNumber": {
            "N": "1295"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 11:23:37"
        },
        "jobName": {
            "S": "bestecanvas.nl Templates - master pipeline"
        },
        "buildNumber": {
            "N": "1296"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 10:29:30"
        },
        "jobName": {
            "S": "canvasdiscount.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "2270"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 07:22:41"
        },
        "jobName": {
            "S": "canvasdiscount.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "2271"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "26-March-2024 07:28:03"
        },
        "jobName": {
            "S": "canvasdiscount.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "2272"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:21:49"
        },
        "jobName": {
            "S": "canvasonsale.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "619"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:25:55"
        },
        "jobName": {
            "S": "canvasonsale.com Templates - master pipeline"
        },
        "buildNumber": {
            "N": "620"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 13:19:51"
        },
        "jobName": {
            "S": "mojobraz.pl Templates - master pipeline"
        },
        "buildNumber": {
            "N": "402"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 09:54:43"
        },
        "jobName": {
            "S": "mypicture.com.au Templates - master pipeline"
        },
        "buildNumber": {
            "N": "682"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 09:54:36"
        },
        "jobName": {
            "S": "mypicture.com.au Templates - master pipeline"
        },
        "buildNumber": {
            "N": "683"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 14:36:24"
        },
        "jobName": {
            "S": "mypicture.com.au Templates - master pipeline"
        },
        "buildNumber": {
            "N": "684"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 11:39:49"
        },
        "jobName": {
            "S": "my-picture.co.uk Templates - master pipeline"
        },
        "buildNumber": {
            "N": "2157"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 12:26:45"
        },
        "jobName": {
            "S": "monoeuvre.fr Templates - master pipeline"
        },
        "buildNumber": {
            "N": "1584"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 14:10:41"
        },
        "jobName": {
            "S": "bestcanvas.ca Templates - master pipeline"
        },
        "buildNumber": {
            "N": "1086"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 12:31:43"
        },
        "jobName": {
            "S": "lidl-fotos.de Templates - master pipeline"
        },
        "buildNumber": {
            "N": "2767"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 10:02:07"
        },
        "jobName": {
            "S": "picanova.de _default Templates - master-default pipeline"
        },
        "buildNumber": {
            "N": "2143"
        },
        "status": {
            "S": "success"
        }
    },
    {
        "time": {
            "S": "25-March-2024 10:40:07"
        },
        "jobName": {
            "S": "stampa-su-tela.it Templates - master pipeline"
        },
        "buildNumber": {
            "N": "1156"
        },
        "status": {
            "S": "success"
        }
    }


    # Insert other records similarly
]


dataNew = [
    {
        "time": "25-March-2024 14:43:05",
        "jobName": "mypicture.lv Templates - master pipeline",
        "buildNumber": 101,
        "status": "success"
    },
    {
        "time": "26-March-2024 17:55:34",
        "jobName": "mypicture.lv Templates - master pipeline",
        "buildNumber": 102,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:52:42",
        "jobName": "bestcanvas.se Templates - master pipeline",
        "buildNumber": 869,
        "status": "success"
    },
    {
        "time": "25-March-2024 12:06:27",
        "jobName": "picanova.de Templates - master pipeline",
        "buildNumber": 710,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:11:20",
        "jobName": "picanova.com Templates - master pipeline",
        "buildNumber": 236,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:16:02",
        "jobName": "picanova.com Templates - master pipeline",
        "buildNumber": 237,
        "status": "success"
    },
    {
        "time": "26-March-2024 16:00:20",
        "jobName": "picanova.com Templates - master pipeline",
        "buildNumber": 238,
        "status": "success"
    },
    {
        "time": "25-March-2024 11:09:09",
        "jobName": "fotowelt.de Templates - master pipeline",
        "buildNumber": 66,
        "status": "success"
    },
    {
        "time": "26-March-2024 12:54:13",
        "jobName": "fotowelt.de Templates - master pipeline",
        "buildNumber": 67,
        "status": "success"
    },
    {
        "time": "25-March-2024 14:53:47",
        "jobName": "minuntaulut.fi Templates - master pipeline",
        "buildNumber": 284,
        "status": "success"
    },
    {
        "time": "25-March-2024 12:04:36",
        "jobName": "mi-arte.es Templates - master pipeline",
        "buildNumber": 1227,
        "status": "success"
    },
    {
        "time": "26-March-2024 10:47:51",
        "jobName": "meinfoto.de Templates - master pipeline",
        "buildNumber": 3602,
        "status": "success"
    },
    {
        "time": "26-March-2024 11:00:10",
        "jobName": "meinfoto.de Templates - master pipeline",
        "buildNumber": 3603,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:10:26",
        "jobName": "fotos-fressnapf.de Templates - master pipeline",
        "buildNumber": 35,
        "status": "success"
    },
    {
        "time": "26-March-2024 14:12:48",
        "jobName": "fotos-fressnapf.de Templates - master pipeline",
        "buildNumber": 36,
        "status": "success"
    },
    {
        "time": "26-March-2024 14:19:00",
        "jobName": "fotos-fressnapf.de Templates - master pipeline",
        "buildNumber": 37,
        "status": "success"
    },
    {
        "time": "25-March-2024 11:48:50",
        "jobName": "aldifotos.de Templates - master pipeline",
        "buildNumber": 2252,
        "status": "success"
    },
    {
        "time": "25-March-2024 07:15:48",
        "jobName": "clean-up-jenkins-workspace",
        "buildNumber": 50,
        "status": "success"
    },
    {
        "time": "25-March-2024 07:22:59",
        "jobName": "clean-up-jenkins-workspace",
        "buildNumber": 53,
        "status": "success"
    },
    {
        "time": "25-March-2024 07:32:41",
        "jobName": "clean-up-jenkins-workspace",
        "buildNumber": 55,
        "status": "success"
    },
    {
        "time": "26-March-2024 10:27:41",
        "jobName": "bestecanvas.nl Templates - master pipeline",
        "buildNumber": 1295,
        "status": "success"
    },
    {
        "time": "26-March-2024 11:23:37",
        "jobName": "bestecanvas.nl Templates - master pipeline",
        "buildNumber": 1296,
        "status": "success"
    },
    {
        "time": "25-March-2024 10:29:30",
        "jobName": "canvasdiscount.com Templates - master pipeline",
        "buildNumber": 2270,
        "status": "success"
    },
    {
        "time": "26-March-2024 07:22:41",
        "jobName": "canvasdiscount.com Templates - master pipeline",
        "buildNumber": 2271,
        "status": "success"
    },
    {
        "time": "26-March-2024 07:28:03",
        "jobName": "canvasdiscount.com Templates - master pipeline",
        "buildNumber": 2272,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:21:49",
        "jobName": "canvasonsale.com Templates - master pipeline",
        "buildNumber": 619,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:25:55",
        "jobName": "canvasonsale.com Templates - master pipeline",
        "buildNumber": 620,
        "status": "success"
    },
    {
        "time": "25-March-2024 13:19:51",
        "jobName": "mojobraz.pl Templates - master pipeline",
        "buildNumber": 402,
        "status": "success"
    },
    {
        "time": "25-March-2024 09:54:43",
        "jobName": "mypicture.com.au Templates - master pipeline",
        "buildNumber": 682,
        "status": "success"
    },
    {
        "time": "25-March-2024 09:54:36",
        "jobName": "mypicture.com.au Templates - master pipeline",
        "buildNumber": 683,
        "status": "success"
    },
    {
        "time": "25-March-2024 14:36:24",
        "jobName": "mypicture.com.au Templates - master pipeline",
        "buildNumber": 684,
        "status": "success"
    },
    {
        "time": "25-March-2024 11:39:49",
        "jobName": "my-picture.co.uk Templates - master pipeline",
        "buildNumber": 2157,
        "status": "success"
    },
    {
        "time": "25-March-2024 12:26:45",
        "jobName": "monoeuvre.fr Templates - master pipeline",
        "buildNumber": 1584,
        "status": "success"
    },
    {
        "time": "25-March-2024 14:10:41",
        "jobName": "bestcanvas.ca Templates - master pipeline",
        "buildNumber": 1086,
        "status": "success"
    },
    {
        "time": "25-March-2024 12:31:43",
        "jobName": "lidl-fotos.de Templates - master pipeline",
        "buildNumber": 2767,
        "status": "success"
    },
    {
        "time": "25-March-2024 10:02:07",
        "jobName": "picanova.de _default Templates - master-default pipeline",
        "buildNumber": 2143,
        "status": "success"
    },
    {
        "time": "25-March-2024 10:40:07",
        "jobName": "stampa-su-tela.it Templates - master pipeline",
        "buildNumber": 1156,
        "status": "success"
    }
]
# Create a DynamoDB resource
dynamodb = boto3.resource('dynamodb',region_name=region_name)

# Get the DynamoDB table
table = dynamodb.Table(table_name)

# Insert each item into the table
with table.batch_writer() as batch:
    for item in dataNew:
        batch.put_item(Item=item)

print("Data inserted successfully into DynamoDB table:", table_name)
