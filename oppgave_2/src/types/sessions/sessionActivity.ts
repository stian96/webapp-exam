import { Session } from "./session"
import { Goal } from "../goal"
import { Report } from "../report" 

export type SessionActivity = {
    session: Session,
    date?: Date,
    goal?: Goal,
    report?: Report
}