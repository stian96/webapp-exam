
import React, { useState } from 'react';
type CommentProps = {
    reportId: string;
};
const Comment = ({ reportId }: CommentProps) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto">
            <label htmlFor={`session-comment-${reportId}`} className="font-semibold block mb-2">Session Comment:</label>
            <textarea
                id={`session-comment-${reportId}`}
                name={`sessionComment-${reportId}`}
                value={comment}
                onChange={handleCommentChange}
                className="rounded p-2 border w-full"
                rows={4}
                placeholder="Please add a comment for the session..."
            />
        </div>
    );
};

export default Comment;
