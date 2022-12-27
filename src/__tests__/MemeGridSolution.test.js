import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "react-query";
import MemeGrid from "../components/MemeGrid";

const mock1 = {};

const server = setupServer(
  rest.get("http://localhost:8000/memes", (req, res, ctx) => {
    console.log("getting memes");
    return res(
      ctx.json([
        {
          title: "por favor no me pidan CSS",
          date: "2022-03-10T00:35:20.167Z",
          tag: "frontend",
          image: "data:image/webp;base64,UklGRqIaAABXRUJQVl",
          id: "b81f9b46221",
          likes: 17,
          username: "meme-master-octa",
        },
        {
          title: "what is my purpose?",
          date: "2022-03-10T00:37:32.782Z",
          tag: "frontend",
          image: "data:image/webp;base64,UklGRuqxAABX",
          id: "1f9b4622153",
          likes: 7,
          username: "meme-master-octa",
        },
        {
          title: "updating",
          date: "2022-03-10T02:51:45.304Z",
          tag: "frontend",
          image: "data:image/webp;base64,UklGRtSNAABXRUJ",
          id: "d86de27afe1",
          likes: 4,
          username: "funny-eli",
        },
      ])
    );
  }),
  rest.put("http://localhost:8000/memes/d86de27afe1", (req, res, ctx) => {
    console.log("mocked the put");
    return res(
      ctx.json({
        title: "yo cuando te veo escribiendo tests",
        date: "2022-03-28T00:05:45.077Z",
        tag: "frontend",
        image: "data:image/gif;base64,R0lGODlh3ACmA",
        id: "1f6afa58d95",
        likes: 14,
        username: "funny-eli",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("<MemeGrid />", () => {
  test("renderizar memeGrid con data mockeada", async () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemeGrid filterContent=''></MemeGrid>
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("por favor no me pidan CSS")).toBeInTheDocument();
      expect(screen.getAllByTestId("meme-card")).toHaveLength(3);
      const likeButton = screen.getAllByTestId("like-button")[0];
      expect(likeButton).toHaveTextContent(4);
    });
    const like = screen.getAllByTestId("like-button")[0];
    fireEvent.click(like);
    server.use(
      rest.get("http://localhost:8000/memes", (req, res, ctx) => {
        console.log("getting memes");
        return res(
          ctx.json([
            {
              title: "por favor no me pidan CSS",
              date: "2022-03-10T00:35:20.167Z",
              tag: "frontend",
              image: "data:image/webp;base64,UklGRqIaAABXRUJQVl",
              id: "b81f9b46221",
              likes: 18,
              username: "meme-master-octa",
            },
            {
              title: "what is my purpose?",
              date: "2022-03-10T00:37:32.782Z",
              tag: "frontend",
              image: "data:image/webp;base64,UklGRuqxAABX",
              id: "1f9b4622153",
              likes: 7,
              username: "meme-master-octa",
            },
            {
              title: "updating",
              date: "2022-03-10T02:51:45.304Z",
              tag: "frontend",
              image: "data:image/webp;base64,UklGRtSNAABXRUJ",
              id: "d86de27afe1",
              likes: 5,
              username: "funny-eli",
            },
          ])
        );
      })
    );

    await waitFor(() => {
      const likeButton = screen.getAllByTestId("like-button")[0];
      expect(likeButton).toHaveTextContent(3);
    });
  });
});
