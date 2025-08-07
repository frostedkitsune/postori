import InboxIcon from "@/assets/icons/Inbox.icon";

export default function InboxPage() {
  return (
    <section className="w-full h-full flex justify-center items-center">
      <div>
        <InboxIcon className="w-[15rem]" />
        <h2 className="text-[#374151] text-2xl font-semibold w-full text-right">
          Your inbox is empty
        </h2>
      </div>
    </section>
  );
}
