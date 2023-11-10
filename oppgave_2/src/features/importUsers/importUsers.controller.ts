// A class that retrieves all users from a pre-defined URL in the JSON format. The

type ApiResponse<T> = {
    status: number;
    message: T;
}

const importAll = async (): Promise<ApiResponse<string>> => {
    try {

        // List to contain several pages of API GET results.
        let userData: unknown[] = [];
        let pageCounter = 1;
        // Paginated json document has a value called 'hasMore' if there are additional pages.
        let hasMore = true;

        // Loops as long as there are additional pages.
        while (hasMore) {

            const response = await fetch(`https://webapp-api.vercel.app/api/users?pageCounter=${pageCounter}`, {
                method: "get",
            });

            if (response.ok) {

                const responseData: unknown = await response.json();

                // Adds the current pageCounter's data to the list.
                userData = userData.concat(responseData.data);

                // Iterates the pageCounter counter.
                pageCounter++;

                // Sets the boolean value of hasMore to reflect whether or not the URL has more data.
                hasMore = responseData.hasMore;
            } else {

                return {
                    status: response.status,
                    message: "Error while retrieving from the URL using a GET request.",
                };
            }
        }

        //TODO write importUsers.service
        return {
            status: 200,
            message: "Success",
        };
    } catch (error: unknown) {

        return {
            status: 500,
            message: "Unexpected error while retrieving from the URL using a GET request.",
        };
    }
};

export default importAll;