import { ContactForm, Container } from "@/components";

function Contact() {
  return (
    <Container>
      <h1 className="text-center text-3xl font-semibold">Contact us</h1>
      <div className="mt-2 text-center text-(--gray-primary)">
        Contact us for account support, questions, or feedback.
      </div>
      <ContactForm />
    </Container>
  );
}

export default Contact;
