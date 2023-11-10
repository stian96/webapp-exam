import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const taskData = [
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "10|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "8|7",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "9|5",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "5|9",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "12|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|5",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "10|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "9|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "4|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "50|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "4|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "9|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "4|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "50|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "3|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "4|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "5|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "56|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "43|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "40|4",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "44|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "6|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "6|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "70|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "7|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "8|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "9|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "3|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "23|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "45|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "45|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "55|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "46|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "65|8",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "add", data: "67|6",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "divide", data: "67|3",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "multiply", data: "6|2",
  },
  {
    text: "Skriv resultatet av regneoperasjonen", type: "subtract", data: "90|8",
  },
]

async function main() {
  for (const task of taskData) {
    await prisma.task.create({
      data: task,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
