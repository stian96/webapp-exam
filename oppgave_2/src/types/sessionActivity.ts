import { type Session } from "./classes/session"
import { type Goal } from "./classes/goal"
import { type Report } from "./report" 

export type SessionActivity = {
    id: string,
    session: Session,
    date?: Date,
    goal?: Goal,
    report?: Report
}

export type SessionDto = {
    id: string;
    name: string | null;
    type: string | null;
    isTemplate: boolean;
    performerId: string | null;
    slug: string | null;
    intensityParam: number | null;
    wattParam: number | null;
    speedParam: number | null;
    pulseParam: number | null;
  }
  
  export type GoalDto = {
    id: string;
    name: string | null;
    date: string | null;
    comments: string | null;
    isCompetition: boolean;
    goalCompetition: string | null;
    goalNotCompetition: string | null;
    location: string | null;
    type: string | null;
    priority: string | null;
  }
  
  export type ReportDto = {
    id: string;
    status: string | null;
    sessionActivityId: string;
    comments: string | null;

  }
  
  export type SessionActivityDto = {
    id: string;
    date: string;
    sessionId: string;
    goalId: string | null;
    performerId: string;
    session: Session | null;
    goal: Goal | null;
    report: Report | null;
  }
