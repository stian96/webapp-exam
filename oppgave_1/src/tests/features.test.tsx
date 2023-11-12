
/*import fetchMock from 'jest-fetch-mock';
import { fetchTasks } from "@/features/task/task.controller"
fetchMock.enableMocks();
beforeEach(() => {
    fetchMock.resetMocks();
});
describe('fetchTasks', () => {
    const API_URL = 'http://localhost:3000/api/restapi';
    it('should fetch tasks successfully', async () => {
        const mockTasks = [
            { id: 1, text: 'Task 1', type: "add", data: `3|3` },
            { id: 2, text: 'Task 2', type: "add", data: `4|4` },
            { id: 3, text: 'Task 3', type: "add", data: `5|5` },
            { id: 4, text: 'Task 4', type: "add", data: `6|6` },
            { id: 5, text: 'Task 5', type: "add", data: `7|7` }
        ];
        fetchMock.mockResponseOnce(JSON.stringify({ success: true, data: mockTasks }));
        const tasks = await fetchTasks('someType', '5');
        expect(tasks).toEqual(mockTasks);
        expect(fetch).toHaveBeenCalledWith(`${API_URL}?type=someType&count=5`, { method: "GET" });
    });
    it('should throw an error when the response is not ok', async () => {
        fetchMock.mockResponseOnce('', { status: 404 });
        await expect(fetchTasks('someType', '5')).rejects.toThrow('Failed to fetch tasks. Status: 404');
    });
});*/