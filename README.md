# Nodepop

Nodepop API - Practice of an application coded in Node.js, Express and mongoDB.

```This version is in development.```
***
## Description

*APi to buy and sell second-hand products.*
***

## DEVOPS

Web Server: nginx (http://54.226.218.58/)

Web server: express (https://www.hispacode.com/) Using nginx to serving static Files

Nodepop Api GET example: [Nodepop](https://nodepop.hispacode.com/apiv1/adverts?jwttoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWM0Y2I4ZTM1MjA4OWIwZWQwMjBlY2ZiIiwiaWF0IjoxNTQ4NTMyMDYxLCJleHAiOjE1NDg3MDQ4NjF9.XPbU9mhVCVwWIr2uSs2uFkeYESaf5znfc2lVdUjC9L0)

***
## Requirements

**Need a MongodB server and start it.**

Install Mongo database: [How to install MongoDB](https://docs.mongodb.com/manual/administration/install-community/)

Linux:

``` sudo service mongod start```

Mac Os:

To Start the Mongodb server, you need to run this command in Mongodb folder:

```shell
bin/mongod --dbpath ./data/db --directoryperdb
```

## Environment variables

Configure the enviroments variables with ```dotenv``` renaming the file **.env.example** to **.env** changing the **JWT_SECRET** for you want.

Configure your CONNECTION to mongo database with environment variable **DATABASE_URI**

if you want to access database with authentication, you need to create an user first, to have access to that database.
For example:

```
use nodepop
db.createUser(
  {
    user: "user",
    pwd: "password",
    roles: [ { role: "readWrite", db: "nodepop" }]
  }
)
```
To enable authentication for mongo you have to add this lines at mongod.conf (Linux,Mac OS) or mongo.cfg(windows)

<pre>
systemLog:
 destination: file
 path: /usr/local/var/log/mongodb/mongo.log
 logAppend: true
storage:
 dbPath: /usr/local/var/mongodb
net:
 bindIp: 127.0.0.1
<b>security:</b>
<b>authorization: enabled</b>
</pre>

Now, set env DATABASE_URI at .env file.

````DATABASE_URI=mongodb://user:password@localhost/nodepop````

***
## Install

Once you have the server up, use the ```install_db``` script to start the database with example collections.

```shell
npm run install_db
```
To run the app in development mode:

```shell
npm run dev
```
To run the app in cluster mode:

```shell
npm run cluster
```

This API have 2 Security methods:

**Bcrypt** - ```Used to hash the passwords automatically.```

**JWT Web Token** - ```Used to authenticate the users with a token.```


## Users

The schema of the user is this:

    name: {type: String},
    email: {type: String},
    password: {type: String}

**POST**

To register an user:

````URL
http://localhost:3000/apiv1/users/register
````
Try with **POSTMAN** to Post params (name,email,password)

To authenticate an user:

````URL
http://localhost:3000/apiv1/users/authenticate
````
Only need the email and password. JWT Web Token will give you a token


***
## Adverts

The adverts have this schema:

    name: {type: String}
    sale: {type: Boolean}
    price: {type: Number}
    photo: {type: String}
    tags: {type:[String]}

To request adverts from the database you can use these filters after this URL


http://localhost:3000/apiv1/adverts

You can use this filters:

- name
- sale (True or False)
- price
- tag
- limit : To limit the query to a number.
- skip : To skip the first querys.
- sort: (sort=name) sorting by fields.
- fields: (fields=name) only return fields that you selected.

**GET**

### By name

````URL
http://localhost:3000/apiv1/adverts?jwttoken=token
````

### By Tags

````URL
http://localhost:3000/apiv1/adverts?tag=mobile&jwttoken=token
````

### By prices

To search by price range or an especified price.

- 10-100 ('number-number')

````URL
http://localhost:3000/apiv1/adverts?price=10-100&jwttoken=token
````
- Greater than 100 ('number-')

````URL
http://localhost:3000/apiv1/adverts?price=100-&jwttoken=token
````
- Less than 500 ('-number')

````URL
http://localhost:3000/apiv1/adverts?price=-500&jwttoken=token
````

***
## Internalization

This API use i18n module. In folder **/locals** have 2 languages, spanish and english. You can configure it in ```app.js```:
````
i18n.configure({
  locals: ['en','es'],
  directory: __dirname + '/locals'
});
`````

In those JSON format, You can your own variables to translate to other languages using ```i18n``` module.
