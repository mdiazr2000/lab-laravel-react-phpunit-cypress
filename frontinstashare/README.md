# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm e2e-test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Check test in cypress
npm install cypress
### `npx cypress open`


For install listen Laravel echo
### `npm install --save-dev laravel-echo pusher-js`

Then for suscribe to an existing channel

In the component when you want to add this

If I use json web tokens for security we need to pass the headers the token
the authEndpoint is the url_of_server/api/broadcasting/auth (in this case because I put the url under api middleware)

const options = {
                    broadcaster: "pusher",
                    key: "123456_key",
                    cluster: "mt1",
                    forceTLS: false,
                    encrypted: false,
                    wsHost: '127.0.0.1',
                    wsPort: 6001,
                    //authEndpoint is your apiUrl + /broadcasting/auth
                    authEndpoint: "http://127.0.0.1:8000/api/broadcasting/auth",
                    // As I'm using JWT tokens, I need to manually set up the headers.
                    auth: {
                    headers: {
                    Authorization: "Bearer " + auth.accessToken,
                    Accept: "application/json"
                    } 
        }
    };

    const echo = new Echo(options);

Then call in function the listen to the channel

useEffect(() => {
echo.private(`fileszipped.`+ auth.email)
            .listen('FileZipped', (e) => {
                    console.log(e.fileUser.name);
                    setMessage(e.fileUser.name + ' is ready for download!!');
            });
        }, [])

