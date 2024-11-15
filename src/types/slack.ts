export interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
}

export interface SlackMessage {
  ts: string;
  text: string;
  user: string;
}