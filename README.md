# simple-node-api

## Running

```shell
npm start
```

## Development

Install dependêncies:

```shell
npm install
```

Run with nodemon:

```shell
npm run watch
```

## Tests

- **GET**: curl localhost:4000
- **GET with querystrings**: curl localhost:4000?name=robinson
- **POST**: curl localhost:4000/post -d '{"name":"robinson"}'
- **404**: curl localhost:4000/xxx

## Next steps

- [x] GET
- [x] POST
- [ ] PUT
- [ ] DELETE
- [ ] UPDATE
- [x] Invalid Requests
- [ ] Memory Database (to sample of data modification)
- [ ] Routing
- [ ] Send templates