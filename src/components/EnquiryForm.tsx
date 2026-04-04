import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import { categories, WHATSAPP_NUMBER, type Product } from "@/data/products";
import { MessageCircle, Send } from "lucide-react";

interface EnquiryFormProps {
    prefilledProduct?: Product;
}

const EnquiryForm = ({ prefilledProduct }: EnquiryFormProps) => {
    const [searchParams] = useSearchParams();
    const urlCategory = searchParams.get("category") ?? "";
    const urlSubcategory = searchParams.get("subcategory") ?? "";

    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        category: prefilledProduct
            ? prefilledProduct.category === "sale" || prefilledProduct.category === "new-arrivals"
                ? "other"
                : prefilledProduct.category
            : urlCategory,
        contactNumber: "",
        emailAddress: "",
        details: prefilledProduct
            ? `I am interested in the following product:\n\nName: ${prefilledProduct.name}\nPrice: ₹${prefilledProduct.price.toLocaleString("en-IN")}\n\nAdditional Details:\n`
            : "",
    });

    useEffect(() => {
        if (prefilledProduct) {
            setFormData((prev) => ({
                ...prev,
                category:
                    prefilledProduct.category === "sale" || prefilledProduct.category === "new-arrivals"
                        ? "other"
                        : prefilledProduct.category,
                details: `I am interested in the following product:\n\nName: ${prefilledProduct.name}\nPrice: ₹${prefilledProduct.price.toLocaleString("en-IN")}\n\nAdditional Details:`,
            }));
        }
    }, [prefilledProduct]);

    // Sync URL ?category= and ?subcategory= params whenever they change
    useEffect(() => {
        if (!prefilledProduct && (urlCategory || urlSubcategory)) {
            let prefilledDetails = "";
            const catName = urlCategory ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1) : "";

            if (urlCategory && urlSubcategory) {
                prefilledDetails = `I am interested in bulk ordering from the ${catName} category, specifically the ${urlSubcategory} collection.\n\nPlease provide more information regarding pricing, MOQs, and available materials.\n\nAdditional Requirements:\n`;
            } else if (urlCategory) {
                prefilledDetails = `I am interested in bulk ordering from the ${catName} category.\n\nPlease provide more information regarding pricing, MOQs, and available materials.\n\nAdditional Requirements:\n`;
            }

            setFormData((prev) => ({ 
                ...prev, 
                category: urlCategory || prev.category,
                details: prefilledDetails || prev.details
            }));
        }
    }, [urlCategory, urlSubcategory, prefilledProduct]);

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = "Full Name is required";
        if (!formData.emailAddress) newErrors.emailAddress = "Email Address is required";
        else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) newErrors.emailAddress = "Email Address is invalid";
        if (!formData.contactNumber) newErrors.contactNumber = "Contact Number is required";
        if (!formData.details) newErrors.details = "Please provide details of your enquiry";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        console.log("Enquiry Form Submitted:", formData);
        toast.success("Enquiry submitted successfully. We will get back to you soon!");
        setFormData({ fullName: "", companyName: "", category: "", contactNumber: "", emailAddress: "", details: "" });
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            toast.error("Please fill in all required fields correctly.");
            return;
        }
        const message = `*New Enquiry*\n\n*Name:* ${formData.fullName}\n*Company:* ${formData.companyName || "N/A"}\n*Category:* ${formData.category}\n*Phone:* ${formData.contactNumber}\n*Email:* ${formData.emailAddress}\n\n*Details:*\n${formData.details}`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
        toast.success("Redirecting to WhatsApp...");
    };

    const inputClass = (field: string) =>
        `w-full bg-background border ${errors[field] ? "border-red-500" : "border-border"} px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors rounded-sm`;

    return (
        <div className="w-full h-full overflow-y-auto px-8 lg:px-12 py-10">
            <div className="mb-8">
                <p className="text-xs uppercase tracking-[0.35em] text-muted-soft font-semibold mb-2">Get In Touch</p>
                <h2 className="font-display text-3xl font-bold text-foreground">Bulk & Custom Orders</h2>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-sm">
                    Corporate gifting, wedding trousseau, or bulk orders? Fill in the form and our team will be in touch.
                </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">Full Name *</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass("fullName")} placeholder="John Doe" />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                    </div>
                    <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">Company / Firm Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className={inputClass("companyName")} placeholder="Optional" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">Email Address *</label>
                        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} className={inputClass("emailAddress")} placeholder="you@example.com" />
                        {errors.emailAddress && <p className="text-red-500 text-xs mt-1">{errors.emailAddress}</p>}
                    </div>
                    <div>
                        <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">Contact Number *</label>
                        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} className={inputClass("contactNumber")} placeholder="+91 98765 43210" />
                        {errors.contactNumber && <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>}
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">What are you looking for?</label>
                    <div className="relative">
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full appearance-none bg-background border border-border px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 transition-colors rounded-sm text-foreground">
                            <option value="" disabled>Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                            ))}
                            <option value="other">Other / Mixed</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2 font-semibold">Details of your Enquiry *</label>
                    <textarea rows={4} name="details" value={formData.details} onChange={handleChange} className={`${inputClass("details")} resize-none`} placeholder="Describe your requirements, timeline, quantity, etc." />
                    {errors.details && <p className="text-red-500 text-xs mt-1">{errors.details}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button type="submit" onClick={handleSubmit} className="flex-1 flex items-center justify-center gap-2 bg-foreground text-primary-foreground hover:opacity-80 px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm">
                        <Send size={15} strokeWidth={2} />
                        Submit Enquiry
                    </button>
                    <button type="button" onClick={handleWhatsAppSubmit} className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#1DA851] px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-sm">
                        <MessageCircle size={15} strokeWidth={2} />
                        Send via WhatsApp
                    </button>
                </div>

                <p className="text-center text-[10px] text-muted-foreground tracking-wider uppercase pt-1">
                    All fields marked * are required. We respect your privacy.
                </p>
            </form>
        </div>
    );
};

export default EnquiryForm;
