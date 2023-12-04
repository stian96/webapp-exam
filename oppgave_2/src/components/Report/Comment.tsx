import React, { useState } from "react"

type CommentProps = {
  reportId: string
  comment: string
  onCommentChange: (newComment: string) => void
}
const Comment = ({ reportId, comment, onCommentChange }: CommentProps) => {
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onCommentChange(event.target.value)
  }

  return (
    <div className="mx-auto flex max-w-lg flex-col">
      <label
        htmlFor={`session-comment-${reportId}`}
        className="mb-4 block font-semibold"
      >
        Session Comment:
      </label>
      <textarea
        id={`session-comment-${reportId}`}
        name={`sessionComment-${reportId}`}
        value={comment}
        onChange={handleCommentChange}
        className="w-full rounded border p-2 text-black"
        rows={4}
        placeholder="Please add a comment for the session..."
      />
    </div>
  )
}

export default Comment
