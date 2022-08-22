# React LinkedIn Auto fill

> A Linked In Auto fill Component for React

## Storybook

<!-- [Demo Link](https://anthonyjgrove.github.io/react-google-login/) -->

## Install
```
npm install @sanjitbauli/react-linkedin-autofill@0.0.1

```

## How to use
```js
import React from 'react';
import ReactDOM from 'react-dom';

import GoogleLogin from 'react-google-login';
// or
import { LoadLinkedInFormTags } from '@sanjitbauli/react-linkedin-autofill';

ReactDOM.render(
  <LoadLinkedInFormTags
    onChangeCallback={(fieldId, value)}
  />,
  document.getElementById('linkedInAutofillButton')
);
```

## onChangeCallback callback

When a field is filled by linkedIn, this callback will gets triggered whith the fieldId and value.

## Props

|    params         |   value  |             default value            |   description    |
|:-----------------:|:--------:|:------------------------------------:|:----------------:|
| onChangeCallback  | function |               REQUIRED               |                  |

<!-- 
## Dev Server
```
npm run start
```
Default dev server runs at localost:8080 in browser.
You can set IP and PORT in webpack.config.dev.js

## Run Tests
```
npm run test:watch
```

## Production Bundle
```
npm run bundle
```

## Deploy Storybook
```
npm run deploy-storybook
``` -->

##### Checkout my other login: [React LinkedIn Auto fill](https://github.com/sanjitbauli/react-linkedin-autofill)


### Follow me on Twitter: [@sanjitbauli](https://twitter.com/sanjitbauli)