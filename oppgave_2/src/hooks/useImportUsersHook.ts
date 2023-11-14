import { useState } from 'react';
import { type PerformerDto } from '@/types/DTO/importUsers';

const useImportUsersHook = () => {
  const [responseCode, setResponseCode] = useState(0);
  const [responseBody, setResponseBody] = useState('');

  const getApiResponse = async () => {
    const response = await fetch(`/api/users/getImportedUsers`, {
      method: 'get',
    });

    const data = await response.json();
    const result = data as { status: number; message: string };
    setResponseCode(result.status);
    setResponseBody(result.message);
  };

  const isUserExists = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/getUserById/${userId}`, {
        method: "get",
      })

      const data = await response.json()
      const isSuccess = data.success

      if (isSuccess) {
        console.log(`${userId} exists.`)
        return { success: true, message: `${userId} exists.` }
      } else {
        console.log(`${userId} does not exist.`)
        return { success: false, message: `${userId} does not exist.` }
      }
    } catch (error) {
      return { success: false, message: error }
    }
  }

  const handleClickFromApiDto = async () => {
    void getApiResponse()
    
    const performers: PerformerDto[] = JSON.parse(
      responseBody,
    ) as PerformerDto[]

    for (const performer of performers) {
      const data = await isUserExists(performer.id)
      const isSuccess = data.success

      if (!isSuccess) {
        try {
          const response = await fetch("/api/users/importUser", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(performer),
          })

          console.log(response)
        } catch (error) {
          console.error(error)
        }
      }
    }
  };

  return { responseCode, responseBody, getApiResponse, handleClickFromApiDto };
};

export default useImportUsersHook;