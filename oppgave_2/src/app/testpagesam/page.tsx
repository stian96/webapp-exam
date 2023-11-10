"use client"

import { useEffect, useState } from "react"
import result from "postcss/lib/result"

import importAllUsers from "@/features/importUsers/importUsers.controller"
import { writePerformersFromImport } from "@/features/importUsers/importUsers.service"

type ApiResponse<T> = {
  status: number
  message: T
}

const dummyData =
  '[{"id":"e3702a1b-3848-4837-91d9-6c943a379dd3","userId":"voveo-esse-ipsam","gender":"female","sport":"cycling","meta":{"heartrate":192,"watt":399,"speed":23},"activities":[{"date":"2023-11-21T00:08:24.659Z","goalId":"eb35e350-8a5c-4e66-b645-c2aa5af78fa9"},{"date":"2023-11-16T19:23:39.657Z","name":"corpus curia patior","tags":["cycling","hard","uphill"],"questions":[{"id":"cf7802e2-4f1c-4b97-83ea-4cd46070538c","question":"Grad av muskelsårhet?","type":"text"},{"id":"8a540cef-6cd6-4a9a-9c6f-091ef28eed12","question":"Hvordan var treningsfølelsen?","type":"text"}],"intervals":[{"id":"2773df90-5698-4b44-971f-1566ee126138","duration":15,"intensity":1},{"id":"a21dcb98-a8ca-442c-a560-aa5e0df8db2e","duration":5,"intensity":4},{"id":"f0ebb4d0-5145-493b-bd80-d627716124a7","duration":8,"intensity":5},{"id":"ec2fb10b-4a9b-43e2-ae1f-025ba11e19c5","duration":4,"intensity":3},{"id":"d28f2adf-fa7d-4df2-acfe-671a1451f503","duration":3,"intensity":5},{"id":"4d7a8a43-00a8-41a3-92b5-6c4d1b78c71e","duration":12,"intensity":5},{"id":"4fb6c89b-6ff8-4a66-b60f-190f0ef2fba8","duration":7,"intensity":5},{"id":"a5eb6bdf-c3a6-41e1-857d-913c4faafa50","duration":5,"intensity":4},{"id":"9f4fcc81-c141-436f-966c-ecc2e5e221fa","duration":10,"intensity":1}]},{"date":"2023-11-28T18:49:00.115Z","name":"administratio denego caterva","tags":["cycling","hard","uphill"],"questions":[{"id":"4ced8f17-6fac-406d-a50e-714581a81935","question":"Hvordan var treningsfølelsen?","type":"text"},{"id":"af75cd59-9e87-419c-8cf5-04321ea9a5cb","question":"Hvordan påvirket omgivelsene/terrenget gjennomføring av økten?","type":"radio:mood"},{"id":"b7ba8fea-3b4f-439a-b42b-7d82a3b3ccd8","question":"Hvor godt restituert var du før økten?","type":"radio:range"}],"intervals":[{"id":"1fc3086d-4b10-4938-a568-3fa324e00d45","duration":15,"intensity":1},{"id":"02b07a4a-85a7-4e42-96cb-03de2cfb235c","duration":12,"intensity":4},{"id":"3e310eff-c22a-4801-9fcf-d4d6d8a5c0da","duration":11,"intensity":3},{"id":"bd225cf4-20f1-4ead-89f5-3c970e1f7621","duration":6,"intensity":4},{"id":"50746721-8f8d-4d75-b0e0-ee7dd30fd93a","duration":11,"intensity":4},{"id":"3413545e-b1c8-4aef-898c-e6e9f19923a2","duration":10,"intensity":5},{"id":"db65767f-28b4-499a-9474-7cb0d821f597","duration":10,"intensity":1}],"goalId":"a6b08b03-b807-40e4-8d84-a5ab933ae655"},{"date":"2023-11-23T21:13:05.489Z","goalId":"b2924465-90b0-4c2f-849f-681f5ab8c1fe"},{"date":"2023-11-18T23:10:31.830Z","name":"cubicularis illum ventosus","tags":["run","hard","gravel"],"questions":[{"id":"ea819a69-c25c-4b7c-8566-9e49c101c4ce","question":"Hvor godt restituert var du før økten?","type":"radio:mood"},{"id":"137e8430-d193-480e-a2d2-48606cd4f0f3","question":"Hvor krevende var økten?","type":"text"}],"intervals":[{"id":"4fc0ee76-274d-4f8b-b1c4-87c55f69ffdc","duration":15,"intensity":1},{"id":"acf5f1a4-cc97-4d11-9ce2-909e7fcc8d80","duration":5,"intensity":5},{"id":"da0fd6c7-c327-448c-ac20-5a25b6b5493e","duration":7,"intensity":4},{"id":"c22ee668-dfb0-4047-b91f-ac35bc437131","duration":8,"intensity":4},{"id":"5f85c00b-c352-4a6c-8b8c-b1e2954cc765","duration":3,"intensity":4},{"id":"28418a58-5c74-4e26-a990-642b3b04afe6","duration":5,"intensity":5},{"id":"dcd46153-fade-4379-88fc-97d38d331343","duration":11,"intensity":5},{"id":"66dfcd9c-7692-41bf-8911-ed7c06a28922","duration":10,"intensity":1}],"goalId":"d172c7f6-efaf-4227-aa0c-4ccd7dc56656"},{"date":"2023-11-15T02:19:04.562Z","name":"crudelis dedecor tempus","tags":["run","hard","paved"],"questions":[{"id":"508a28b0-1516-4734-a3d4-df059022773d","question":"Hvordan var kvaliteten og varigheten på søvnen før dagens økt?","type":"radio:range"},{"id":"18d2448c-1525-4aa0-accf-56c5ec47262f","question":"Hvordan var treningsfølelsen?","type":"radio:mood"},{"id":"59fe2379-3782-42cb-a62f-1d4b5cc1c6f6","question":"Hvordan var kvaliteten og varigheten på søvnen før dagens økt?","type":"radio:mood"}],"intervals":[{"id":"0da71ca4-c630-4f29-a316-0704f13f715a","duration":15,"intensity":1},{"id":"f5980d42-0553-4762-9f19-ece150477b43","duration":7,"intensity":5},{"id":"c5d622b9-4bed-4992-bbd2-796326d1e105","duration":11,"intensity":5},{"id":"78c1065d-7999-4b21-81db-79876f0ea5a9","duration":11,"intensity":5},{"id":"331d84b5-4721-4635-90c9-11e61e066e8a","duration":4,"intensity":3},{"id":"647eef14-8f03-406b-80f9-ac80d5f1479c","duration":6,"intensity":4},{"id":"95de540d-4f30-4e9f-abc6-b4d00b94ad11","duration":4,"intensity":5},{"id":"8519c5fc-8d1e-4baa-b1f3-4654e7d573c8","duration":8,"intensity":4},{"id":"5c33303d-634d-45ae-a76e-30048d862999","duration":12,"intensity":3},{"id":"3cc85f34-4e1d-4e3f-bdf1-889ce9c56a93","duration":10,"intensity":1}]},{"date":"2023-11-09T11:17:23.089Z","goalId":"35b0368f-d929-447b-b35f-788d8f81c775"}]}]'

const TestPage = () => {
  const [responses, setResponses] = useState<ApiResponse<string>>({
    status: 0,
    message: "",
  })

  const getApiResponse = async () => {
    const response = await importAllUsers()
    const result = response as { status: number; message: string }

    setResponses(result)
  }

  const handleClick = async () => {
    const result = await writePerformersFromImport(dummyData)

    if (result.status) {
      console.log(result.data)
    } else {
      console.log(result.data)
    }
  }

  useEffect(() => {
    void getApiResponse()
  }, [])

  return (
    <main>
      <div>
        The API GET request finished with status code {responses.status}. The
        message is "{responses.message}"
      </div>
      <button onClick={handleClick}>Click to import data</button>
    </main>
  )
}

export default TestPage
