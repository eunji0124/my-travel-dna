export type TravelAxis = "activity" | "planning" | "focus";
export type TravelValue = "active" | "calm" | "plan" | "free" | "food" | "photo" | "social" | "explore";

export interface Character {
  id: string;
  name: string;
  emoji: string;
  match: Record<TravelAxis, TravelValue>;
  description: string;
  color: string;
}

export interface UserAnswer {
  axis: TravelAxis;
  value: TravelValue;
}
