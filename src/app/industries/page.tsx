import LuxuryAutomotive from "../industries/luxury-automotive/page";
import LuxuryProperty from "../industries/luxury-property/page";
import HospitalsMedicalCenters from "../industries/hospitals-medical-centers/page";

export default function IndustriesPage() {
  return (
    <div className="space-y-12">
      <section>
        <LuxuryAutomotive />
      </section>
      <section>
        <LuxuryProperty />
      </section>
      <section>
        <HospitalsMedicalCenters />
      </section>
    </div>
  );
}
