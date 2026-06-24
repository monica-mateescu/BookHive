import { ContactForm, Container } from "@/components";
import { Seo } from "@/components/seo";

function Contact() {
  return (
    <>
      <Seo
        title="Contact us"
        description="Contact us for account support, questions, or feedback."
      />

      <Container>
        <h1 className="text-center text-3xl font-semibold">Contact us</h1>
        <div className="mt-2 text-center text-(--gray-primary)">
          Contact us for account support, questions, or feedback.
        </div>
        <ContactForm />
      </Container>
    </>
  );
}

export default Contact;
