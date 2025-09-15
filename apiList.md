DEV-TINDER API LIST

authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:reqquestId

- GET /user/connenctions
- GET /user/requests
- GET /user/feed - Gets you the profiles of other users on platform

Status: Ignore,interested,accepted,rejected