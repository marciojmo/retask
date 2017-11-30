# Retask: An API for recurring tasks
I started this project to get used to expressjs. I'm not concerned about security and etc for now.

## Requirements 
NodeJS + MongoDB.

## API Calls:

### POST /signup to register a new user.

| Field  | Description |
| ------------- | ------------- |
| email | The e-mail of the user.  |
| pass | The password of the user.  |


### POST /login to login.
| Field  | Description |
| ------------- | ------------- |
| email | The e-mail of the user.  |
| pass | The password of the user.  |

### GET /logout to logout.

### POST /tasks/create to create a task.
| Field  | Description |
| ------------- | ------------- |
| callback_url | The request URL.  |
| http_method | The request HTTP method  ["GET", "POST", "PUT", "DELETE"].  |
| data | The body of the request  |
| auth_user | The user of the request  |
| auth_pass | The password of the user  |
| auth_token | The token of the request  |
| start_date | The starting date of the task  |
| end_type | The end type. ["NO_END", "END_BY_COUNTER", "END_BY_DATE"] |
| end_date | The end date if the end type is by date  |
| end_count | The end count if the end type is by count  |
| repeat_type | The repetition scheme [ "NO_REPEAT", "EVERY_SECOND", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]  |
| repeat_every | The repetition value (Ex: Repeat task every 2 days. repeat_every = 2 and repeat_type = 'DAILY')  |
| repeat_weekly_mask | A seven days "bitmask" starting from sunday indicating the repetition days of the week (Ex: '1001010' repeats Sunday, Wednesday and Friday)  |

### PUT /tasks/<task_id> to update a task.
| Field  | Description |
| ------------- | ------------- |
| callback_url | The request URL.  |
| http_method | The request HTTP method  ["GET", "POST", "PUT", "DELETE"].  |
| data | The body of the request  |
| auth_user | The user of the request  |
| auth_pass | The password of the user  |
| auth_token | The token of the request  |
| start_date | The starting date of the task  |
| end_type | The end type. ["NO_END", "END_BY_COUNTER", "END_BY_DATE"] |
| end_date | The end date if the end type is by date  |
| end_count | The end count if the end type is by count  |
| repeat_type | The repetition scheme [ "NO_REPEAT", "EVERY_SECOND", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]  |
| repeat_every | The repetition value (Ex: Repeat task every 2 days. repeat_every = 2 and repeat_type = 'DAILY')  |
| repeat_weekly_mask | A seven days "bitmask" starting from sunday indicating the repetition days of the week (Ex: '1001010' repeats Sunday, Wednesday and Friday)  |

### GET /tasks to list all tasks.

### GET /tasks/<task_id> to see details of a task.

### DELETE /tasks/<task_id> to delete a task.
