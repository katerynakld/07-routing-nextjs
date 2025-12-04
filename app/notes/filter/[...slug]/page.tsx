import { fetchNotes } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug: tag } = await params;
  const targetTag = tag[0] === "all" ? undefined : tag[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", { currentPage: 1, search: "", tag: targetTag }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: targetTag as NoteTag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={targetTag} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
