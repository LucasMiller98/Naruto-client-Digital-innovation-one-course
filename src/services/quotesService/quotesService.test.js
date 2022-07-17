import { rest } from 'msw'
import { setupServer } from 'msw/node' 
import { getQuote } from './quotesService'

const response = { test: 'testing' }

const server = setupServer(
  rest.get(process.env.REACT_APP_API, (req, res, ctx) => {
    return res(ctx.json(response))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers()) // depois de cada teste
afterAll(() => server.close())

test('transform json response into object', async () => {
  const quote = await getQuote()

  expect(quote).toStrictEqual(response)

})