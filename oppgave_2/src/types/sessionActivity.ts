import { Session } from "./session"
import { Goal } from "./goal"

export type SessionActivity = {
    session: Session,
    date?: Date,
    goal?: Goal,
    report?: Report
}