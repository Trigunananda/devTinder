- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between caret and tilde ( ^ vs ~ )

- Intialize list
- .gitignore
- create a remote repo on github
- push all code to remote origin
- play with routes and route extension ex. /hello, / , hello/2, /xyz
- Orders of the routes matter a lot
- Install a postman app and make a workspace/collection > test API call
- Write logic to handle GET POST DELETE API call and test into POST man
- Exploring routing and use of  ?, +, (), * in the routes
- use of regex in routes /a/, /.*fly$/
- Reading thw query params in the routes
- Reading the dynamic routes

- multiple route handler play with the code
- next()
- next() along and error along with res.send()
- app.use("/route",rh,[rh2,rh3],rh4,rh5);
- What is middleware.Ehy do we need it 
- How expressJs basically handles request behind the scenes
- Write a dummy middleware for admin
- Write a dummy auth middleware for all user,routes except /user/login
- Error handling app.use("/",(err,req,res,next)=>{})

- Create a free cluster on mongoDB official website(Mongo Atlas)
- Install mongoose library
- Connect your application to the database "connection-url"/devTinder
- call the connectDB function and connect the database before starting - - application on 7777
- create a user schema and user Model
- create POST/signup API to add data to DB
- push some documents using api calls from postman
- Error handling using try,catch

- Js object ns JSON(Difference)
- add the express.json middleware to your app
- make your signup api dynamic to receive data from the end user
- user.findOne with duplicate emailIds,which object returned
- API- Get user by email
- API-  Feed API - GET/feed - get all the user from the database
- create a delete user API
- Difference between PATCH and PUT
- API update user
- Explore the mongoose documentation for Model methods
- What are the options in a model.findOneAndUpdate,explore more about it
- API - update the user api with email id

- Explore schematype options from  the documentation
- add,require,unique,lowercase,min,minLength,trim
- Add default
- create a custom validate function for gender
- Improve the DB schema - PUT all appropriate validation on each field in Schema
- Add API level validation on patch request and Signup post api
- DATA Sanitization - Add API validation for each field
- Install validator
- Explore validator library function and use validator function for password,email and photoUrl
- NEVER TRUST req.body

- validate data in SignUp API
- install bcrypt package
- Create a password hash using bcrypt.hash and save the user with encrypted password
- Create Login API
- Compare password and throw errors if email or password is Invalid

- install cookie-parser
- just send a dummy cookie to user
- create GET /profile APi and check if you get the cookie back
- install jsonwebtoken
- IN login API, after email and password validation, create e JWT token and send it to user in cookies
- read the cookies inside your profile API and find the logged in user
- userAuth Middleware
- Add the userAuth middle ware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- Create UserSchema method to comparepassword(passwordInputByUser)

- Explore tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under repective routers
- Read documentation for express.Router
- Create routes folder for managing auth,profile, request routers
- create authRouter, profileRouter, requestRouter
- Import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make you validate all data in every POST, PATCH apis

- Create Connnection Request Schema
- Send Connection Request API
- Proper validation of Data
- Think about ALL corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function
- Read more about indexes in MongoDB
- Why do we need index in DB?
- What is the advantages and disadvantage of creating?
- Read this arcticle about compond indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/      index-compound/
- ALWAYS THINK ABOUT CORNER CASES


- Write code with proper validations for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET GET /user/connections

- Logic for GET /feed API
- Explore the $nin , $and, $ne and other query operatorators
- Pagination

## NOTES:

- /feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10)
- /feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)
- /feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)
- /feed?page=4&limit=10 => 21-30 => .skip(20) & .limit(10)
- skip = (page-1)*limit;