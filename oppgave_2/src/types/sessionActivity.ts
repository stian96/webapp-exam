import { Session } from "./classes/session"
import { Goal } from "./classes/goal"
import { Report } from "./report" 

export type SessionActivity = {
    session: Session,
    date?: Date,
    goal?: Goal,
    report?: Report
}