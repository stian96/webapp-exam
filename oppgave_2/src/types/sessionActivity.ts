import { Session } from "./session"

export type SessionActivity = {
    session: Session,
    date?: Date,
    goal?: Goal,
    report?: Report
}