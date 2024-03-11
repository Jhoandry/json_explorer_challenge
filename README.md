# JSON Explorer Challenge

React Function Component that takes in JSON data as an argument and displayed correctly with indention and following the objects order.

# Functionality

* The JSON data is correctly displayed: indention, (curly) brackets, commas, string values, number values, boolean values, arrays, objects, etc.
* All keys can be interacted with and are highlighted (e.g. color: blue)
* When a user clicks on a key, it shows its path and value:
  Examples:
      - When a user clicks on “date” it shows “res.date” and "2021-10-27T07:49:14.896Z"
      - When a user clicks on “hasError” it shows “res.hasError” and “false”
      - When a user clicks on “prop” in the first object in the `fields` array, it
      shows “res.fields[0].prop” and “iban”

## Technical info

  To build this app you must need [npm](https://www.npmjs.com/) and [node](https://www.npmjs.com/package//node) on  `18.10.0` version installed. 

## Available Scripts

In the project directory, you can run:

### `npm install` 

To intall all the required dependecies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**🚨 IMPORTANT**

If you need to chage the JSON, should change `./assets/data.json`. Also test are not included