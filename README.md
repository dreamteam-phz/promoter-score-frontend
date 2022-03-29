# Promoter score application documentation

## Frontend

### Main structure:
Application has several layouts:
- Welcome page 
- SignUp page
- LogIn page
- Dashboard
- Statistics
- Create survey page
- Survey page (form for getting scores)
- Notification page (result of the action)
- Settings page

### SignUp and LogIn pages send
```
{   
    login: 'username',
    password: 'password
}
```
### Dashboard 

## MongoDB

1. Database: NPS
2. Collection: users

```
[
    {
        id: ObjectId('huf34f893ffif4945394'),
        login: 'admin',
        password: 'admin
    },
    {
        id: ObjectId('owej9034jf93448934i'),
        login: 'ironman',
        password: 'JARVIS3000'
    }
]
```

1. Database: NPS
2. Collection: surveys
```
[
    {
        id: ObjectId('11rjf394934uf340d23'),
        name: 'Job satisfaction',
        period: 'March',
        template: {
            q1: 'How are you satisfied with the food?',
            comment1: true,
            q2: 'Rate your satisfaction with the salary:',
            comment2: false,
            q3: 'How are you?',
            comment3: true
        },
        statistics: [
            {
                ip: '127.7.5.2',
                q1: 7,
                comment1: '',
                q2: 9,
                q3: 10,
                comment3: 'I am super happy with my life'
            },
            {
                ip: '124.2.54.21',
                q1: 4,
                comment1: '',
                q2: 3,
                q3: 10,
                comment3: 'Nothing to add'
            },
            {
                ip: '137.45.29.0',
                q1: 2,
                comment1: '',
                q2: 3,
                q3: 6,
                comment3: 'The weather is rainy'
            }
        ]
    }
]
```