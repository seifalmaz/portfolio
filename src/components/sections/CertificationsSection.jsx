import { certificationsData } from "../../data/certificationsData";
import SectionHeader from "../ui/SectionHeader";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { FaAward } from "react-icons/fa6";

function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-28 bg-slate-950 px-6 py-28 text-white border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          subtitle="CREDENTIALS &amp; HONORS"
          title="Verified"
          titleHighlight="Certifications"
          description="Recognized credentials earned from Microsoft, Google, DEPI, and ICPC regional competitions."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certificationsData.map((cert) => (
            <Card key={cert.id} className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                    <FaAward className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-gray-400 font-medium bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {cert.date}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                <p className="text-xs text-blue-400 font-semibold mb-4">{cert.issuer}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="slate">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
                <span>ID: {cert.credentialId}</span>
                <span className="text-blue-400 font-medium">Verified &check;</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
