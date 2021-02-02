# hub-token-for

## why?
because inspecting network requests for user tokens is tedious

## how?
this tool allows us to distribute the ability of signing in as various users without needing to distribute their passwords. instead, all you need to know is their username and a secret. user profiles are configured on the server. when a username is requested, an AGO session for the user is initiated and the token for that session is encrypted and returned. the token can be used when the client decrypts the response using the same secret as the server.

> why couldn't the tool simply sign in users without the server?

it could. but assuming the tool wouldn't ship with exposed passwords, in order to use it you'd need to provide your own set user profiles (usernames and passwords). then it wouldn't be super useful if the setup were so involved. with the server element, the secret is the only client side requirement. and if exposed, recycling a single secret is a lot less laborious than recycling many passwords.

> what if i want to log in as other users?

feel free to deploy your own back end using the serverless script. feasibly all you'd need to do is edit the file `server/users.js` and deploy. 

## CLI tool
clone and install the package locally
```
$ git clone ...
$ cd hub-token-for && npm i -g ./
```

then you can run the command `token4`, with the following options
```
-e --env <environment>    | (dev or qa) DEFAULT qa
-u --username <username>  | (juliana_pa, paige_pa, chezelle_pa) DEFAULT juliana_pa
-s --secret <secret key>  | key used to decrypt token
```

the first time you call `token4`, you'll need to supply the `--secret` option. once supplied, the value is stored. same goes for the other options. for instance, if i run `token4 --env dev --username paige_pa`, the values `dev` and `paige_pa` are stored for subsequent calls. thereafter `token4 -u juliana_pa` will generate a token for juliana_pa on devext.