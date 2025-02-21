"use client"
import { useState } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        mensagem: "",
    });

    const [status, setStatus] = useState("");

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setStatus("Enviando...");

        try {
            const response = await fetch("/api/sendEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                setStatus("E-mail enviado com sucesso!");
                setFormData({ nome: "", email: "", mensagem: "" });
            } else {
                setStatus(`Erro: ${result.message}`);
            }
        } catch (error) {
            setStatus("Erro ao enviar e-mail.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-md">
            <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Seu Nome"
                required
                className="block w-full mb-2 p-2 border rounded text-black"
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Seu Email"
                required
                className="block w-full mb-2 p-2 border rounded text-black"
            />
            <textarea
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                placeholder="Sua Mensagem"
                required
                className="block w-full mb-2 p-2 border rounded text-black"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Enviar
            </button>
            {status && <p className="mt-2 text-sm">{status}</p>}
        </form>
    );
}
