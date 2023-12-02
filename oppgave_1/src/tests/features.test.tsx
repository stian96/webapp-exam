import { describe, it, expect } from 'vitest'
import { fetchTasks } from "@/features/task/task.controller"
import { saveAttemptsToDB } from "@/features/task/task.repository"
import { setupServer } from 'msw/node'
import { rest } from 'msw'

// Reference: https://vitest.dev/guide/mocking.html 

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


const api2 = setupServer(
  rest.put("/api/saveAttempt", (req, res, ctx) => {
    return res(ctx.json({ message: "Successfully updated answer in the DB." }));
  })
);


describe('PUT saveAttempt', () => {
  const PUT_API_URL = "/api/saveAttempt";

  it('should update an answer successfully', async () => {
    api2.use(rest.put(PUT_API_URL, (reqest, response, context) => {

      return response(context.json({ message: "Successfully updated answer in the DB." }))
    }));

    const response = await saveAttemptsToDB({ taskId: 'someTaskId', attempts: 3 });
    expect(response).toEqual({ message: "Successfully saved attempt in the DB." });
  });
});

beforeAll(() => api2.listen())
afterAll(() => api2.close())
