import { CTASection } from '@/components/ui/CTASection';

export function HomeCTA() {
  return (
    <CTASection
      title="Need reliable manpower in Indore?"
      subtitle="Tell us your requirement and we'll deploy the right people, fast."
      primaryLabel="Hire Manpower"
      primaryHref="/contact?type=Staffing%20%2F%20Manpower%20Inquiry"
      showWhatsApp
      className="oo-cta"
    />
  );
}
