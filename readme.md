https://blog.logrocket.com/linting-typescript-eslint-prettier

https://github.com/ShafiaChy/Eslint-Config-Setup/blob/main/Readme.md?fbclid=IwZXh0bgNhZW0CMTAAAR077J5GfQqcxZuOjusYTtNemV6-QhpqefLkdJw5_jcKQcaULJ6Z5_EvxvY_aem_c0MrvvFKTmzwIgZd_mS8dg

serverFolder:
```js
  npm init -y
  npm install express (install type declaration while importing)
  npm install mongoose
  npm install typescript --save-dev
  npm i cors(install type declaration while importing)
  npm i dotenv
  npm i ts-node-dev
  npm i zod

  npm i http-status(1.7)
  npm i bcrypt(npm i -D @types/bcrypt)
  npm i jsonwebtoken
  npm i -D @types/jsonwebtoken
  npm i cookie-parser
  npm i -D @types/cookie-parser
```

use: tsc -init
tsconfig.json:
  search for rootDir and change it to src-> `"rootDir": "./src"`
  search for outDir and change it to dist-> `"outDir": "./dist"`
  copy and paste at the top of the file
  ```js
	"include": ["src"], // which files to compile
  	"exclude": ["node_modules"], // which files to skip
  ```

eslint:
```js
  npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
  npx eslint --init
```
  answer:
    > syntax
    What type of modules does your project use? ...
    > JavaScript modules (import/export)
    Which framework does your project use?
    > None
    Does your project use TypeScript?
    > Yes
    Where does your code run? 
    > Node
  copy and past codes to eslint.config.mjs(see the link above)

prettier:
```js
   npm install --save-dev prettier
```
   create .prettier.json and past codes 
   open setting and past the code from the above link in setting.json

package.json:
  copy scripts from a file and past it to the script section

create a folder called src
src folder:
  app.ts
  server.ts
  app folder:
	builder
	config: index.ts
	DB
	errors
	interface
	middlewares
	modules
	routes
	utils

in root directory(where node_modules)
uploads folder for image upload

Work sequence -> interface/type, schema, model, route, controller, service

accessToken: require('crypto').randomBytes(32).toString('hex')
expiresIn: 60*60 or 1d

refreshToken: require('crypto').randomBytes(64).toString('hex')
expiresIn: 90d

accessToken: Short time, it is used for accessing end points
refreshToken: long time(10d), it needs to be handled from the frontend, behind the user


