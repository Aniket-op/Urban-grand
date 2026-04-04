import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within India but plan to expand internationally soon."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for unused items in their original packaging."
  },
  {
    question: "How can I track my order?",
    answer: "You will receive an email and SMS with a tracking link once your order is dispatched."
  },
  {
    question: "Do you do custom sizing or bulk orders?",
    answer: "Yes, we handle bulk orders. Please use the contact page to get in touch with our sales team for more information."
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-medium text-lg">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-muted-medium leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-medium mb-4">Still have questions?</p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-elegant"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
