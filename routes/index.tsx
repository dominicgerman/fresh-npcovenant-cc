import { Head } from "$fresh/runtime.ts";
import { tw } from "twind";
import { Handlers, PageProps } from "https://deno.land/x/fresh@1.2.0/server.ts";
import { Service } from "../utils/types.ts";
import ServiceCard from "../components/ServiceCard.tsx";
import db from "../static/db.json" assert { type: "json" };

export const handler: Handlers<{ services: Service[] }> = {
  GET(req, ctx) {
    const services = db;
    if (!services) {
      return new Response("Services search failed", { status: 404 });
    }
    return ctx.render({ services: services.data });
  },
};

export default function Home(
  props: PageProps<{
    services: Service[];
  }>,
) {
  const { services } = props.data;
  const today = new Date();
  return (
    <>
      <Head>
        <title>Chancel Choir - North Park Covenant Church</title>
      </Head>
      <div class={tw`p-4 mx-auto max-w-screen-md font-mono`}>
        <img
          src="/npcc-logo.svg"
          class="w-32 h-32"
          alt="the north park covenant church logo: a cross in a circle"
        />
        <h1 class="my-6 text-4xl">
          NPCC Chancel Choir (Fall 2023)
        </h1>

        <div class="p-6 rounded-md bg-[#fa00001a]">
          <strong class="text-2xl inline-block mb-4">Announcements</strong>
          {services.map((service) => {
            const dateObj = new Date(service.service_date);
            if (dateObj >= today && service.special_notes) {
              return <p>- {service.special_notes}</p>;
            } else return null;
          })}
        </div>

        <div>{}</div>

        <div class={tw`my-12`}>
          {services.map((service) => {
            const dateObj = new Date(service.service_date);
            if (dateObj >= today) {
              return <ServiceCard key={service.id} service={service} />;
            }
          })}
        </div>
      </div>
    </>
  );
}
