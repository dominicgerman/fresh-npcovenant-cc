import { Service } from "../utils/types.ts";
import { tw } from "twind";

export default function ServiceCard({
  service,
}: {
  service: Service;
}) {
  return (
    <a href={`/services/${service.id}`} class={tw`text-2xl my-6 `}>
      <div class={tw`rounded-md px-6 py-1 my-4 bg-[#0189011a] `}>
        {service.title}
      </div>
    </a>
  );
}
