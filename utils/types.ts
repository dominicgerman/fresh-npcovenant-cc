export type Service = {
  id: number;
  sort: number | null;
  service_date: string;
  title: string;
  anthem_title: string;
  anthem_pdf: string | null;
  other_music: string | null;
  other_pdf: string | null;
  call_time: string | null;
  special_notes: string | null;
  listen_link: string | null;
};
