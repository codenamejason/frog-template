import { serveStatic } from "@hono/node-server/serve-static";
import { Button, Frog, TextInput } from "frog";
// import { neynar } from 'frog/hubs'

export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })

  // When "silent", the frame will go through verification, but not throw an error if it fails. Instead, the frame will receive verified: false in its context.
  verify: "silent",

  secret: process.env.FROG_SECRET,
});

app.use("/*", serveStatic({ root: "./public" }));

app.frame("/", (c) => {
  const { buttonValue, inputText, status } = c;
  const userInput = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background:
            status === "response"
              ? "linear-gradient(to right, #432889, #17101F)"
              : "black",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {status === "response"
            ? `Nice choice.${userInput ? ` ${userInput.toUpperCase()}!!` : ""}`
            : "Welcome!"}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter estimate" />,
      <Button value="Submit" action="/submit">
        Next
      </Button>,
      status === "response" && <Button>Reset</Button>,
    ],
  });
});

app.frame("/next", (c) => {
  const { buttonValue, inputText } = c;
  const userInput = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {`Nice choice.${userInput ? ` ${userInput.toUpperCase()}!!` : ""}`}
        </div>
      </div>
    ),
    intents: [<Button>Next</Button>],
  });
});

app.frame("/submit", (c) => {
  const { buttonValue, inputText } = c;
  const userInput = inputText || buttonValue;
  return c.res({
    image: (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(to right, #432889, #17101F)",
          backgroundSize: "100% 100%",
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          height: "100%",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            lineHeight: 1.4,
            marginTop: 30,
            padding: "0 120px",
            whiteSpace: "pre-wrap",
          }}
        >
          {`Nice choice.${userInput ? ` ${userInput.toUpperCase()}!!` : ""}`}
        </div>
      </div>
    ),
    intents: [<Button.Reset>Reset</Button.Reset>],
  });
});
