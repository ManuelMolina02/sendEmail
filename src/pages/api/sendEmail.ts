import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método não permitido" });
    }

    const { nome, email, mensagem } = req.body;

    // Configuração do transporte SMTP
    const transporter = nodemailer.createTransport({
        service: "gmail", // Pode ser outro serviço SMTP como Outlook, SendGrid, etc.
        auth: {
            user: process.env.EMAIL_USER, // Defina no .env.local
            pass: process.env.EMAIL_PASS, // Defina no .env.local
        },
    });

    try {
        await transporter.sendMail({
            from: `"${nome}" <${email}>`,
            to: email, // Defina o destinatário no .env.local
            subject: "Nova mensagem do formulário de contato",
            text: mensagem,
            html: `<p><strong>Nome:</strong> ${nome}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong> ${mensagem}</p>`,
        });

        return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao enviar e-mail", error });
    }
}
