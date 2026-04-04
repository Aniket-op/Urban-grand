import customerSatisfactionLogo from "@/assets/logos/Customer satisfaction.jpg";
import madeInIndiaLogo from "@/assets/logos/Made in India.jpg";
import qualityAssuranceLogo from "@/assets/logos/Quality Assurance.jpg";
import timelyDeliveryLogo from "@/assets/logos/Timely delivery.jpg";

const commitments = [
  {
    logo: customerSatisfactionLogo,
    title: "Customer Satisfaction",
    description: "Ensuring 100% customer delight",
  },
  {
    logo: madeInIndiaLogo,
    title: "Made in India",
    description: "Proudly manufactured in India",
  },
  {
    logo: qualityAssuranceLogo,
    title: "Quality Assurance",
    description: "Uncompromising quality standards",
  },
  {
    logo: timelyDeliveryLogo,
    title: "Timely Delivery",
    description: "On-time delivery, every time",
  },
];

const OurCommitment = () => {
  return (
    <section className="w-full py-16 bg-background shrink-0 overflow-hidden">

      <div className="px-8 lg:px-14 mb-10 lg:mb-16">
        <h2 className="text-2xl lg:text-3xl uppercase tracking-[0.35em] text-foreground font-semibold">
          Our Commitment
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {commitments.map((item, index) => (
          <div key={index} className="flex flex-col items-center justify-start text-center">
            <div className="h-24 md:h-28 w-11/12 md:w-full max-w-[140px] flex items-center justify-center mb-4 bg-white rounded-lg p-1">
              <img
                src={item.logo}
                alt={item.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>
            <h3 className="font-semibold text-foreground mb-2 truncate w-full px-2" title={item.title}>{item.title}</h3>
            <p className="text-sm text-muted-medium line-clamp-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurCommitment;
