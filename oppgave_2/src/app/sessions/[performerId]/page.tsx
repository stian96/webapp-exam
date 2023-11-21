"use client"

const Sessions = ({ params }: { params: { performerId: string } }) => {
  return <div className="text-white">My Post: {params.performerId}</div>
}

export default Sessions
