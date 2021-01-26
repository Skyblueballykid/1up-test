from bottle import route, run, request, hook, abort, response
import json
from flask import jsonify
import pprint
import requests
from config import CLIENT_ID, CLIENT_SECRET, ROOT_API_URL, FHIR_API_URL

'''A Simple REST API to create users and generate an Auth Token'''

pp = pprint.PrettyPrinter(indent=4)

REQUEST_HEADERS = {"accept": "application/json"}

@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'

# Route to create a user
@route('/api/create/<name>', method='GET')
def create_user(name):
    CREATE_USER_PAYLOAD = {
        "app_user_id": "%s" % name,
        "client_id": "%s" % CLIENT_ID,
        "client_secret": "%s" % CLIENT_SECRET
    }

    try:
        url= ROOT_API_URL + "/user-management/v1/user"
        create_user_req = requests.post(url=url, json=CREATE_USER_PAYLOAD, headers=REQUEST_HEADERS)
        json_data = create_user_req.json()
        code = json_data['code']
        print("CREATE USER RESPONSE: " + str(create_user_req.status_code))
        print(code)
        assert(len(code) == 40)
        return json.dumps(code).strip('"')
    except Exception as e:
        print(str(e))

# Route to get a token
@route('/api/token/<code>', method='GET')
def auth_token(code):
    TOKEN_PAYLOAD = {
        "code": "%s" % code,
        "grant_type" : "authorization_code",
        "client_id": "%s" % CLIENT_ID,
        "client_secret": "%s" % CLIENT_SECRET
    }
    try:
        url= FHIR_API_URL + "/oauth2/token"
        token_req = requests.post(url=url, json=TOKEN_PAYLOAD, headers=REQUEST_HEADERS)
        json_data = token_req.json()
        token = json_data['access_token']
        print("ACCESS TOKEN RESPONSE: " + str(token_req.status_code))
        print(token)
        assert(len(token) == 40)
        return json.dumps(token).strip('"')
    except Exception as e:
        print(str(e))


def main():
    run(host='localhost', port=8080)

if __name__ == "__main__":
    main()