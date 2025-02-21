import Image from "next/image";

import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Entre em Contato</h1>
      <ContactForm />
    </div>
  );
}

