import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api/notes";
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface NewNoteData {
  title: string;
  content?: string;
  tag: NoteTag;
}

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
  tag?: NoteTag;
}

export async function fetchNotes({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<NotesResponse> {
  const response = await axios.get<NotesResponse>(API_URL, {
    params: {
      page,
      perPage,
      search,
      tag,
    },
    headers: { Authorization: `Bearer ${NOTEHUB_TOKEN}` },
  });
  return response.data;
}

export async function createNote(noteContent: NewNoteData) {
  const response = await axios.post<Note>(API_URL, noteContent, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
}

export async function deleteNote(noteID: string) {
  const deletedNote = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${noteID}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${NOTEHUB_TOKEN}`,
      },
    }
  );
  return deletedNote.data;
}

export async function fetchNoteById(noteId: string): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/${noteId}`, {
    headers: {
      Authorization: `Bearer ${NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
}
