import { describe, it, expect } from 'vitest'
import { fetchTasks } from "@/features/task/task.controller"
import { setupServer } from 'msw/node'
import { rest } from 'msw'

// Reference: https://vitest.dev/guide/mocking.html 

// Setup of mock service worker.
const api = setupServer(
  rest.get("http://localhost:3000/api/restapi", (reqest, response, context) => {
    return response(context.json({ success: true, data: mockTasks }))
  })
);

const mockTasks = [
  { id: 1, text: 'Task 1', type: "add", data: `3|3` },
  { id: 2, text: 'Task 2', type: "add", data: `4|4` },
  { id: 3, text: 'Task 3', type: "add", data: `5|5` },
  { id: 4, text: 'Task 4', type: "add", data: `6|6` },
  { id: 5, text: 'Task 5', type: "add", data: `7|7` }
];

describe('fetchTasks', () => {
  const API_URL = "http://localhost:3000/api/restapi"

  it('should fetch tasks successfully', async () => {
    api.use(rest.get(API_URL, (reqest, response, context) => {
        return response(context.json({ success: true, data: mockTasks }))
      })
    )

    const tasks = await fetchTasks('someType', '5')
    expect(tasks).toEqual(mockTasks)
  })

  it('should throw an error when the response is not ok', async () => {
    api.use(rest.get(API_URL, (reqest, response, context) => {
        return response(context.status(404));
      })
    )
    await expect(fetchTasks('someType', '5')).rejects.toThrow('Failed to fetch tasks. Status: 404');
  })
})

beforeAll(() => api.listen())
afterAll(() => api.close())
