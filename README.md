# littlefurr-server
Test-server for littlefur-ui

# Settings
Node+Express, EJS view engine, Mongodb


# Register & Login Interface-doc
## 1. Register Interface
### Request URL:
    localhost:4000/register
### Request Type:
    POST
### Parameter:
    |Parameter      |Required   |Type     |Description
    |emailAddress   |T          |string   |User-email (as username)
    |password       |T          |string   |password
    |securityQ1Id   |T          |string   |security question 1
    |securityQ1A    |T          |string   |security question 1 answer
    |securityQ2Id   |T          |string   |security question 2
    |securityQ2A    |T          |string   |security question 2 answer
### Return:
    success:
    {
      "code":0,
      "data": {
        "id" : "5ea............",
        "emailAddress":"abc@example.com",
        "security": {
            "sq1":"question1?",
            "sq1a":"answer1",
            "sq2":"question2?",
            "sq2a":"answer2",
          }
        "nickname" : "Ciel",
        "profilePhoto":"...",
        "gender":"female",
        "privacy" : "public",
        "location": {
            "country":"China",
            "state":"",
            "city":"Shanghai",
          }
        }
      }
      fail:{"code":1,"msg":"用户已存在"}

## 2. Login Interface
### Request URL:
    localhost:4000/login
### Request Type:
    POST
### Parameter:
    |Parameter      |Required   |Type     |Description
    |emailAddress   |T          |string   |User-email (as username)
    |password       |T          |string   |password
### Return:
    success:
    {
      "code":0,
      "data": {
        "id" : "5ea............",
        "emailAddress":"abc@example.com",
        "security": {
            "sq1":"question1?",
            "sq1a":"answer1",
            "sq2":"question2?",
            "sq2a":"answer2",
          }
        "nickname" : "Ciel",
        "profilePhoto":"...",
        "gender":"female",
        "privacy" : "public",
        "location": {
            "country":"China",
            "state":"",
            "city":"Shanghai",
          }
        }
    }
    fail:{"code":1,"msg":"用户邮箱或密码错误"}


## 3. Update Interface
### Request URL:
    localhost:4000/update
### Parameter:
    |Parameter      |Required   |Type     |Description
    |nickname       |F          |string   |show as username
    |profilePhoto   |F          |string   |
    |gender         |F          |string   | "male" | "female"
    |privacy        |F          |string   |Setting: public(default) | private | other
    |country        |F          |string   |location.country
    |state          |F          |string   |location.state
    |city           |F          |string   |location.city
### Return:
        success:
        {
          "code":0,
          "data": {
            "nickname" : "Ciel",
            "profilePhoto":"...",
            "gender":"female",
            "privacy" : "public",
            "location": {
                "country":"China",
                "state":"",
                "city":"Shanghai",
              }
            }
        }
        fail:{"code":1,"msg":"oops...请重新登录！"}
