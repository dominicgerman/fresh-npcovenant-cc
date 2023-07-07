import { Fragment, h } from "preact";
import { tw } from "twind";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Service } from "../../utils/types.ts";
import db from "../../static/db.json" assert { type: "json" };

export const handler: Handlers<{ service: Service }> = {
  GET(_req, ctx) {
    const service = db.data.filter((item) => String(item.id) === ctx.params.id);
    if (!service) {
      return new Response("Services search failed", { status: 404 });
    }
    return ctx.render({ service: service[0] });
  },
};

export default function Details(
  props: PageProps<{
    service: Service;
  }>,
) {
  const service = props.data.service;
  return (
    <div class="p-4 mx-auto max-w-screen-md font-mono font-mono">
      <div class="my-12 text-lg">
        <h1 class={tw`my-2 text-5xl`}>{service.title}</h1>
        {service.special_notes
          ? (
            <div
              class={tw`px-6 py-1 my-4 border border-[#ff0000] rounded-md bg-[#fa00001a]`}
            >
              <strong>Reminder:</strong> {service.special_notes}
            </div>
          )
          : null}
      </div>
      <div class="rounded-md bg-[#f9f9f9] border border-[#c9d48a] p-4">
        <h2 class="text-xl">Anthem: {service.anthem_title}</h2>
        {service.anthem_pdf
          ? (
            <a
              class={tw`rounded-full inline-block my-6 px-6 py-3 bg-[#c9d48a]`}
              href={`https://npcovenant-cc.s3.us-east-2.amazonaws.com/${service.anthem_pdf}.pdf`}
              target="_blank"
            >
              SHEET MUSIC
            </a>
          )
          : null}
        {service.listen_link
          ? (
            <a
              class={tw`rounded-full inline-block m-6 px-6 py-3 bg-[#c9d48a]`}
              href={service.listen_link}
              target="_blank"
            >
              LISTEN
            </a>
          )
          : null}
      </div>
      <span class="text-xl rounded-md my-8 py-1 px-4 inline-block bg-[#f9f9f9] border border-[#c9d48a]">
        Call time: {service.call_time}
      </span>
      <a class="block my-12 text-2xl" href="/">← Back</a>
    </div>
  );
}
