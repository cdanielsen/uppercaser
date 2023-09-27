export interface MessageResponse {
  message: string;
}

export const sendMessage = (message: string): Promise<MessageResponse> =>
  fetch("/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
    }),
  }).then((res) => res.json());
