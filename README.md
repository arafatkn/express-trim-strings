# Express Trim Strings Middleware
Trim whitespace from request body.

## Features
- [x] Trim whitespace from request body of json data.
- [x] Support for nested objects.
- [x] Support for arrays.
- [x] Support for routing-controller.
- [x] Support for TypeScript.
- [ ] Support for query parameters.
- [ ] Support for form data.

## Installation
```bash
npm install express-trim-strings
```

## Usage
### JavaScript
```javascript
const express = require('express');
const trim = require('express-trim-strings');

const app = express();

app.use(trim.trimStrings);

app.post('/test', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### TypeScript
```typescript
import express from 'express';
import { trimStrings } from 'express-trim-strings';

const app = express();

app.use(trimStrings);

app.post('/test', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### with routing-controller
```typescript
import 'reflect-metadata';
import { createExpressServer, useExpressServer } from 'routing-controllers';
import { TrimStringsMiddleware } from 'express-trim-strings';

const app = createExpressServer({
  middlewares: [TrimStringsMiddleware],
  controllers: [__dirname + '/controllers/*.ts']
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## License
ISC
