import React, { useEffect, useMemo, useRef, useState } from "react";
import { atecData } from "../data/atecData";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Circle } from "lucide-react";
import { Link } from "react-router-dom";

export default function AtecQuestionPage() {
  const [registered, setRegistered] = useState(false);
  const [completedForm, setCompletedForm] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    email: "",
    age: "",
    relation: "",
  });

  const API_URL = import.meta.env.VITE_API_URL || "";

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  // ✅ detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // ✅ lock body scroll on mobile (hide footer) — only while doing questions
  const lockScroll = isMobile;
  useEffect(() => {
    if (!lockScroll) return;

    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, [lockScroll]);

  // ✅ mobile: show 1 question per screen
  const [mobileQ, setMobileQ] = useState(0);
  const mobileSteps = useMemo(() => ["ลงทะเบียน", ...atecData.map((d) => d.category)], []);
  const mobileStepIndex = registered ? currentCategoryIndex + 1 : 0; // 0..4

  const [missingKeys, setMissingKeys] = useState<string[]>([]);
  const currentCategory = atecData[currentCategoryIndex];

  const completed = Object.keys(answers).length;
  const percentage = Math.round((completed / 77) * 100);

  const totalScore = Object.values(answers).reduce(
    (sum, val) => sum + parseInt(val, 10),
    0
  );
  const percentageScore = Math.round((totalScore / 179) * 1000) / 10;

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Desktop scroll container
  const listRef = useRef<HTMLDivElement | null>(null);

  const scrollQuestionIntoView = (id: string) => {
    const container = listRef.current;
    const el = document.getElementById(id);
    if (!container || !el) return;
    const top = el.offsetTop - container.offsetTop - 8;
    container.scrollTo({ top, behavior: "smooth" });
  };

  const scrollAfterLayout = (id: string) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollQuestionIntoView(id));
    });
  };

  const getSeverityLevel = () => {
    if (totalScore <= 38) return "อาการน้อย";
    if (totalScore <= 67) return "อาการปานกลาง";
    return "อาการมาก";
  };

  const getSeverityColor = () => {
    if (totalScore <= 38) return "#25E39D";
    if (totalScore <= 67) return "#FFB900";
    return "#F73E35";
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (form.fullName && form.gender && form.email && form.age) {
      setRegistered(true);
      setCompletedForm(false);
      setCurrentCategoryIndex(0);
      setMobileQ(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };

  const setAnswerByCategoryIndex = (questionIndexInCategory: number, value: string) => {
    const key = `q${questionIndexInCategory + currentCategory.startIndex}`;
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setMissingKeys((prev) => prev.filter((k) => k !== key));
  };

  // Desktop original handlers
  const handleNext = () => {
    const keys = currentCategory.questions.map(
      (_, index) => `q${index + currentCategory.startIndex}`
    );
    const missing = keys.filter((k) => !answers[k]);
    if (missing.length > 0) {
      setMissingKeys(missing);
      scrollQuestionIntoView(`qblock-${missing[0]}`);
      return;
    }
    if (currentCategoryIndex < atecData.length - 1) {
      const nextIdx = currentCategoryIndex + 1;
      setCurrentCategoryIndex(nextIdx);
      setMissingKeys([]);
      const nextStart = atecData[nextIdx]?.startIndex;
      scrollAfterLayout(`qblock-q${nextStart}`);
    } else {
      setCompletedForm(true);
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      const prevIdx = currentCategoryIndex - 1;
      setCurrentCategoryIndex(prevIdx);
      setMissingKeys([]);
      const prevStart = atecData[prevIdx]?.startIndex;
      scrollAfterLayout(`qblock-q${prevStart}`);
    } else {
      setRegistered(false);
      setMobileQ(0);
    }
  };

  // ✅ Mobile helpers (1 question per screen)
  const mobileKey = useMemo(() => {
    return `q${currentCategory.startIndex + mobileQ}`;
  }, [currentCategory.startIndex, mobileQ]);

  const mobileHasAnswer = !!answers[mobileKey];

  const handleMobileNext = () => {
    if (!answers[mobileKey]) {
      setMissingKeys([mobileKey]);
      return;
    }

    setMissingKeys((prev) => prev.filter((k) => k !== mobileKey));

    // next question in category
    if (mobileQ < currentCategory.questions.length - 1) {
      setMobileQ((q) => q + 1);
      return;
    }

    // last question -> next category or finish
    if (currentCategoryIndex < atecData.length - 1) {
      setCurrentCategoryIndex((i) => i + 1);
      setMobileQ(0);
      setMissingKeys([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setCompletedForm(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMobileBack = () => {
    setMissingKeys((prev) => prev.filter((k) => k !== mobileKey));

    // previous question in category
    if (mobileQ > 0) {
      setMobileQ((q) => q - 1);
      return;
    }

    // first question -> previous category last question
    if (currentCategoryIndex > 0) {
      const prevIdx = currentCategoryIndex - 1;
      const prevLen = atecData[prevIdx].questions.length;
      setCurrentCategoryIndex(prevIdx);
      setMobileQ(prevLen - 1);
      setMissingKeys([]);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // back to register
    setRegistered(false);
    setMobileQ(0);
  };

  const allQuestions = useMemo(() => {
    const list: { key: string; question: string; }[] = [];
    atecData.forEach((cat) => {
      cat.questions.forEach((q, i) => {
        const idx = cat.startIndex + i;
        list.push({ key: `q${idx}`, question: q });
      });
    });
    return list.sort((a, b) => Number(a.key.slice(1)) - Number(b.key.slice(1)));
  }, []);

  const buildAnswerDetail = () => {
    return allQuestions.map(({ key, question }) => ({
      answer: String(answers[key] ?? ""),
      question,
    }));
  };

  const submitResults = async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      const payload = {
        data: {
          fullName: form.fullName,
          age: form.age ? Number(form.age) : null,
          gender: form.gender,
          email: form.email,
          relationship: form.relation,
          score: totalScore,
          answerDetail: buildAnswerDetail(),
        },
      };
      const res = await fetch(`${API_URL}/test-results`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err?.message || "unknown error");
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!registered || completedForm) return;
    const start = atecData[currentCategoryIndex]?.startIndex;
    scrollAfterLayout(`qblock-q${start}`);
  }, [currentCategoryIndex, registered, completedForm]);

  useEffect(() => {
    if (completedForm) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [completedForm]);

  useEffect(() => {
    if (completedForm && !submitted && !submitting) submitResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedForm]);

  const ProgressSidebar = () => {
    const steps = [
      { title: "ลงทะเบียน", subtitle: "สมัครเพื่อบันทึกแบบประเมิน" },
      ...atecData.map((d) => ({
        title: d.category,
        subtitle: `จำนวน ${d.questions.length} ข้อ`,
      })),
      { title: "ส่งแบบประเมิน", subtitle: "สำเร็จ" },
    ];

    const currentStepIndex = completedForm
      ? steps.length - 1
      : registered
        ? currentCategoryIndex + 1
        : 0;

    const isDone = (i: number) => completedForm || i < currentStepIndex;

    return (
      <div className="w-full lg:w-1/3 flex flex-col gap-4">
        {/* tablet (md) show compact progress */}
        <aside className="lg:hidden rounded-2xl shadow p-6 border border-gray-200 bg-[#F3F4F6]">
          <div className="text-[#00BFA5] text-5xl font-semibold leading-none">
            {percentage}%
          </div>
          <div className="text-gray-700 text-sm font-medium mt-1 mb-3">
            สำเร็จ {completed}/77 ข้อ
          </div>
          <h2 className="font-bold text-[#1D1D1F] text-base mb-2">
            ทำแบบประเมินพฤติกรรม (ATEC)
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            ไม่จริง: ท่านเห็นว่าข้อความนั้นไม่ตรงกับตัวเด็กเลย<br />
            บางครั้งจริง: ท่านเห็นว่าข้อความนั้นตรงกับตัวเด็กบ้าง<br />
            จริงมาก: ท่านเห็นว่าข้อความนั้นตรงกับตัวเด็กมากที่สุด
          </p>

          <div className="mt-3">
            <div className="flex items-center">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${isDone(i) ? "bg-[#00BFA5]" : "bg-gray-300"
                      }`}
                  >
                    {isDone(i) ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <Circle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={`h-1 mx-2 flex-1 rounded ${i < currentStepIndex ? "bg-[#00BFA5]" : "bg-gray-300"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <span className="text-xs font-semibold underline decoration-2 underline-offset-4 decoration-[#00BFA5]">
                {steps[currentStepIndex]?.title}
              </span>
            </div>
          </div>
        </aside>

        {/* desktop sidebar */}
        <aside className="hidden lg:block rounded-2xl shadow p-6 border border-gray-200 bg-[#F3F4F6]">
          <div className="text-[#00BFA5] text-4xl font-semibold leading-none">
            {percentage}%
          </div>
          <div className="text-gray-700 text-sm font-medium mt-1 mb-4">
            สำเร็จ {completed}/77 ข้อ
          </div>
          <hr className="mb-4 border-gray-200" />
          <h2 className="font-bold text-gray-800 text-base mb-2">
            ทำแบบประเมินพฤติกรรม (ATEC)
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">
            ไม่จริง: ท่านเห็นว่าข้อความนั้นไม่ตรงกับตัวเด็กเลย
            <br />
            บางครั้งจริง: ท่านเห็นว่าข้อความนั้นตรงกับตัวเด็กบ้าง
            <br />
            จริงมาก: ท่านเห็นว่าข้อความนั้นตรงกับตัวเด็กมากที่สุด
          </p>

          <div className="space-y-12 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 relative">
                <div className="relative z-10">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center ${isDone(idx) ? "bg-[#00BFA5]" : "bg-gray-200"
                      }`}
                  >
                    {isDone(idx) ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {idx < atecData.length + 1 && (
                    <div className="absolute top-9 left-1/2 -translate-x-1/2 h-6 w-px bg-gray-300" />
                  )}
                </div>
                <div>
                  <div
                    className={`font-semibold text-sm ${idx === currentStepIndex ? "text-[#212121]" : "text-gray-600"
                      }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-500">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    );
  };

  // -------------------- COMPLETED VIEW (คงเดิม) --------------------
  if (completedForm) {
    if (isMobile) {
      return (
        <div className="md:hidden h-[100svh] w-full bg-white overflow-hidden flex flex-col">
          {/* TOP */}
          <div className="px-6 pt-20">
            <div className="text-[#00BFA5] text-5xl font-semibold leading-none">
              {percentage}%
            </div>
            <div className="mt-2 py-2 text-sm font-semibold text-[#111827]">
              แบบประเมินเสร็จสิ้น
            </div>

            {/* stepper 5 จุด (ลงทะเบียน + 4 หมวด) */}
            <div className="mt-4 flex items-center w-full gap-x-2 px-6">
              {[0, 1, 2, 3, 4].map((_, i) => {
                const done = i <= currentCategoryIndex;
                const lineActive = i < currentCategoryIndex;

                return (
                  <React.Fragment key={i}>
                    <div
                      className={[
                        "w-5 h-5 rounded-full grid place-items-center shrink-0",
                        done ? "bg-[#00BFA5]" : "bg-gray-300",
                      ].join(" ")}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>

                    {i < 4 && (
                      <div
                        className={[
                          "h-[2px] flex-1 rounded",
                          lineActive ? "bg-[#00BFA5]" : "bg-gray-300",
                        ].join(" ")}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* CONTENT (scroll ภายในได้ แต่ body ไม่ scroll) */}
          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6">
            {/* ผู้ทำแบบประเมิน */}
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
              <div className="text-sm font-bold text-[#1D1D1F] mb-2">
                ผู้ทำแบบประเมิน
              </div>
              <div className="h-px bg-[#E5E7EB] mb-3" />

              <div className="text-xs text-[#6E6E73]">ชื่อ - นามสกุล</div>
              <div className="text-sm font-semibold text-[#1D1D1F]">
                {form.fullName}
              </div>
            </div>

            {/* คะแนนรวม + เปอร์เซ็นต์ */}
            <div className="mt-6 space-y-6">
              <div>
                <div className="text-xs text-[#6E6E73]">คะแนนรวม (คะแนน)</div>
                <div className="text-2xl font-semibold text-[#25E39D]">
                  {totalScore}/179
                </div>
              </div>

              <div>
                <div className="text-xs text-[#6E6E73]">คิดเป็นเปอร์เซ็นต์</div>
                <div className="flex items-end gap-1">
                  <div className="text-4xl font-semibold text-[#111827] leading-none">
                    {percentageScore}
                  </div>
                  <div className="text-sm font-semibold text-[#6E6E73] mb-1">%</div>
                </div>

                <div className="relative w-full h-10 mt-3">
                  <div className="absolute top-4 left-0 w-full h-3 rounded-full overflow-hidden bg-gray-200">
                    <div
                      className="h-full bg-gradient-to-r from-[#00E676] via-[#FFEB3B] to-[#F44336]"
                      style={{ width: "100%" }}
                    />
                  </div>

                  <div
                    className="absolute top-0"
                    style={{ left: `calc(${percentageScore}% - 0.75rem)` }}
                  >
                    <div className="text-black text-lg">▲</div>
                  </div>
                </div>
              </div>

              {/* อาการ (ตราวงกลม) */}
              <div className="flex justify-center pt-1">
                <div className="relative w-[180px] h-[180px]">
                  <svg
                    width="180"
                    height="180"
                    viewBox="0 0 193 193"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute inset-0"
                  >
                    <path
                      d="M79.7363 10.9775C88.6797 0.987711 104.32 0.987701 113.264 10.9775L120.413 18.9639C123.958 22.9237 129.111 25.058 134.418 24.7646L145.119 24.1729C158.507 23.4327 169.567 34.4929 168.827 47.8809L168.235 58.582C167.942 63.8888 170.076 69.0419 174.036 72.5869L182.022 79.7363C192.012 88.6797 192.012 104.32 182.022 113.264L174.036 120.413C170.076 123.958 167.942 129.111 168.235 134.418L168.827 145.119C169.567 158.507 158.507 169.567 145.119 168.827L134.418 168.235C129.111 167.942 123.958 170.076 120.413 174.036L113.264 182.022C104.32 192.012 88.6797 192.012 79.7363 182.022L72.5869 174.036C69.0419 170.076 63.8888 167.942 58.582 168.235L47.8809 168.827C34.4929 169.567 23.4327 158.507 24.1729 145.119L24.7646 134.418C25.058 129.111 22.9237 123.958 18.9639 120.413L10.9775 113.264C0.987716 104.32 0.987701 88.6797 10.9775 79.7363L18.9639 72.5869C22.9237 69.0419 25.058 63.8888 24.7646 58.582L24.1729 47.8809C23.4327 34.4929 34.4929 23.4327 47.8809 24.1729L58.582 24.7646C63.8888 25.058 69.0419 22.9237 72.5869 18.9639L79.7363 10.9775Z"
                      stroke={getSeverityColor()}
                      strokeWidth="5"
                      fill="white"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="text-sm font-medium text-[#3E3E44]">อาการ</div>
                    <div
                      style={{ color: getSeverityColor() }}
                      className="text-3xl font-semibold"
                    >
                      {getSeverityLevel()}
                    </div>
                  </div>
                </div>
              </div>

              {/* อธิบายเพิ่มเติม */}
              <div className="rounded-2xl bg-[#F3F4F6] p-5 text-[#3E3E44]">
                <div className="text-sm font-bold mb-2">อธิบายเพิ่มเติม</div>
                <div className="h-px bg-[#E5E7EB] mb-3" />

                <p className="text-xs leading-relaxed text-[#6E6E73]">
                  คะแนนรวมคำนวณจากการรวมทุกด้านทั้ง 4 ส่วนของแบบประเมินรวมทั้งหมด 77
                  ข้อ คิดเป็น 179 คะแนน
                </p>

                <div className="mt-4 bg-[#EFEFEF] p-4 rounded-2xl">
                  <div className="text-xs font-bold mb-3">
                    การแปลงผลคะแนนรวมทุกด้าน
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 text-xs text-[#3E3E44]">
                    <div>1 - 38 คะแนน</div>
                    <div className="text-right font-bold">อาการน้อย</div>

                    <div>39 - 67 คะแนน</div>
                    <div className="text-right font-bold">อาการปานกลาง</div>

                    <div>68 - 179 คะแนน</div>
                    <div className="text-right font-bold">อาการมาก</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA BAR (ล่างเหมือนรูป) */}
          <div className="shrink-0 px-6 pb-6">
            <div className="flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-[#E8F2FF]">
              <p className="text-xs font-semibold text-[#1D1D1F] leading-snug">
                เพื่อไม่พลาดโอกาสในการพัฒนาอาการให้ดีขึ้น
              </p>
              <Link
                to="/#appointment"
                className="shrink-0 bg-gradient-to-r from-[#106EE8] to-[#00AAFF] text-white text-sm font-bold px-5 py-2 rounded-full shadow-[0_0_15px_rgba(15,113,233,0.4)] hover:opacity-90 transition"
              >
                ปรึกษาฟรี
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-10 lg:px-24 py-20">
        {/* <ProgressSidebar /> */}
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 w-full">
          <div
            className="flex items-center gap-2 font-semibold mb-4"
            style={{
              color: submitted ? "#25E39D" : submitError ? "#F73E35" : "#6E6E73",
            }}
          >
            {submitting && (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 animate-spin"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2v2a8 8 0 1 1-8 8H2C2 6.477 6.477 2 12 2z" />
                </svg>
                กำลังบันทึกผล...
              </>
            )}
            {!submitting && submitted && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.2l-3.5-3.6L4 14.1l5 5 12-12-1.4-1.4z" />
                </svg>
                บันทึกผลแล้ว
              </>
            )}
            {!submitting && !submitted && submitError && (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11 15h2v2h-2zm0-8h2v6h-2z" />
                </svg>
                บันทึกผลไม่สำเร็จ: {submitError}
                <button
                  onClick={submitResults}
                  className="ml-3 bg-white border border-[#D9D9D9] text-[#212121] px-3 py-1 rounded-full text-xs font-bold"
                >
                  ลองใหม่
                </button>
              </>
            )}
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-[48px] font-semibold text-[#212121] tracking-tight">
                แบบประเมินเสร็จสิ้น
              </h2>
              <button
                onClick={() => window.location.reload()}
                className="bg-white border border-[#D9D9D9] text-[#212121] px-6 py-2 rounded-full text-sm font-bold"
              >
                กลับหน้าหลัก
              </button>
            </div>

            <p className="text-[#757575] text-[16px] mt-2">
              การประเมินของท่านได้ผลลัพธ์ดังนี้
            </p>

            <div className="h-[2px] w-full bg-gradient-to-r from-[#00BFA5] via-[#00C6C1] to-[#00BFA5] mt-4" />
          </div>

          <div className="rounded-xl p-4 text-sm text-gray-700 mb-6 border border-[#E0E0E0]">
            <div className="text-[20px] font-bold text-[#1D1D1F] border-b border-[#E0E0E0] pb-2">
              ผู้ทำแบบประเมิน
            </div>
            <div className="mt-3">
              <div className="text-[16px] font-medium text-[#6E6E73]">
                ชื่อ - นามสกุล
              </div>
              <div className="text-[16px] font-semibold text-[#1D1D1F]">
                {form.fullName}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-6 mb-10">
            <div className="w-full md:w-[70%]">
              <p className="text-[20px] text-[#212121] mb-2">คิดเป็นคะแนน</p>
              <div className="relative inline-block mb-4">
                <span className="score-header font-bold text-black leading-none">
                  {totalScore}/179
                </span>
                <span className="score-title text-gray-400  mx-2">คะแนน</span>
              </div>

              <div className="relative w-full h-6">
                <div className="absolute top-3 left-0 w-full h-3 rounded-full overflow-hidden bg-gray-200">
                  <div
                    className="h-full bg-gradient-to-r from-[#00E676] via-[#FFEB3B] to-[#F44336]"
                    style={{ width: "100%" }}
                  />
                </div>
                <div
                  className="absolute -bottom-5 left-0"
                  style={{ left: `calc(${percentageScore}% - 0.75rem)` }}
                >
                  <div className="text-black text-lg">▲</div>
                </div>
              </div>
            </div>

            <div className="relative w-[193px] h-[193px]">
              <svg width="193" height="193" viewBox="0 0 193 193" fill="white" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0">
                <path
                  d="M79.7363 10.9775C88.6797 0.987711 104.32 0.987701 113.264 10.9775L120.413 18.9639C123.958 22.9237 129.111 25.058 134.418 24.7646L145.119 24.1729C158.507 23.4327 169.567 34.4929 168.827 47.8809L168.235 58.582C167.942 63.8888 170.076 69.0419 174.036 72.5869L182.022 79.7363C192.012 88.6797 192.012 104.32 182.022 113.264L174.036 120.413C170.076 123.958 167.942 129.111 168.235 134.418L168.827 145.119C169.567 158.507 158.507 169.567 145.119 168.827L134.418 168.235C129.111 167.942 123.958 170.076 120.413 174.036L113.264 182.022C104.32 192.012 88.6797 192.012 79.7363 182.022L72.5869 174.036C69.0419 170.076 63.8888 167.942 58.582 168.235L47.8809 168.827C34.4929 169.567 23.4327 158.507 24.1729 145.119L24.7646 134.418C25.058 129.111 22.9237 123.958 18.9639 120.413L10.9775 113.264C0.987716 104.32 0.987701 88.6797 10.9775 79.7363L18.9639 72.5869C22.9237 69.0419 25.058 63.8888 24.7646 58.582L24.1729 47.8809C23.4327 34.4929 34.4929 23.4327 47.8809 24.1729L58.582 24.7646C63.8888 25.058 69.0419 22.9237 72.5869 18.9639L79.7363 10.9775Z"
                  stroke={getSeverityColor()}
                  strokeWidth="5"
                  fill="white"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-sm font-medium text-[#3E3E44]">อาการ</div>
                <div style={{ color: getSeverityColor() }} className="text-3xl font-bold">
                  {getSeverityLevel()}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F9FAFB] p-6 text-[#3E3E44]">
            <div className="text-[20px] font-bold mb-4 border-b border-[#DADCE0] pb-2">
              อธิบายเพิ่มเติม
            </div>

            <p className="text-[20px] font-medium">
              คะแนนรวมคำนวณจากการรวมทุกด้านทั้ง 4 ส่วนของแบบประเมินรวมทั้งหมด 77
              ข้อ คิดเป็น 179 คะแนน
            </p>

            <div className="mt-6 bg-[#F2F2F2] p-5 rounded-2xl">
              <div className="text-[20px] font-bold mb-4">
                การแปลงผลคะแนนรวมทุกด้าน
              </div>

              <div className="grid grid-cols-2 gap-y-3 text-[20px]">
                <div className="font-medium">1 - 38 คะแนน</div>
                <div className="font-bold text-right">อาการน้อย</div>

                <div className="font-medium">39 - 67 คะแนน</div>
                <div className="font-bold text-right">อาการปานกลาง</div>

                <div className="font-medium">68 - 179 คะแนน</div>
                <div className="font-bold text-right">อาการมาก</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4 mt-6 rounded-full bg-[#E8F2FF]">
            <p className="choice-button-text">เพื่อไม่พลาดโอกาสในการพัฒนาอาการให้ดีขึ้น</p>
            <Link
              to="/#appointment"
              className="ml-4 bg-gradient-to-r from-[#0085FF] to-[#00C2FF] choice-text-white text-[clamp(14px,2.2vw,16px)] leading-[100%] px-6 py-2 rounded-full shadow-md hover:opacity-90 transition"
            >
              ปรึกษาฟรี
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ✅ MOBILE UI (ตามรูป)
  // =========================
  if (isMobile) {
    // const steps = useMemo(() => ["ลงทะเบียน", ...atecData.map((d) => d.category)], []);
    const currentStep = registered ? currentCategoryIndex + 1 : 0; // 0..4

    return (
      <div className="md:hidden h-[100svh] w-full bg-white overflow-hidden flex flex-col">
        {/* TOP */}
        <div className="px-6 pt-20">
          <div className="text-[#00BFA5] text-5xl font-semibold leading-none">
            {percentage}%
          </div>

          <div className="mt-2 py-2 text-sm font-semibold text-[#111827]">
            แบบทดสอบ: {registered ? currentCategory.category : "ATEC"}
          </div>

          {/* stepper 5 circles */}
          <div className="mt-4 flex justify-cente">
            <div className="flex items-center w-full max-w-[620px] ml-6">
              {mobileSteps.map((_, i) => {
                const done = i <= currentStep;
                const lineActive = i < currentStep;

                return (
                  <div key={i} className="flex items-center flex-1">
                    <div
                      className={[
                        "w-5 h-5 rounded-full grid place-items-center",
                        done ? "bg-[#00BFA5]" : "bg-gray-300",
                      ].join(" ")}
                    >
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    </div>

                    {i < mobileSteps.length - 1 && (
                      <div
                        className={[
                          "h-[2px] mx-2 w-10 flex-1 rounded",
                          lineActive ? "bg-[#00BFA5]" : "bg-gray-300",
                        ].join(" ")}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex-1 px-6 pt-6 overflow-hidden">
          {!registered ? (
            <div className="h-full flex flex-col pb-10">
              <div className="text-xl font-bold text-gray-900">การลงทะเบียน</div>
              <p className="text-sm text-gray-500 mt-1">
                กรุณากรอกข้อมูลเพื่อลงทะเบียนก่อนเริ่มทำแบบประเมิน
              </p>

              {/* ให้ scroll เฉพาะในส่วนฟอร์ม ถ้าจอเล็ก/คีย์บอร์ดขึ้น */}
              <div className="mt-5 flex-1 overflow-y-auto pr-1 space-y-4">
                {[
                  { name: "fullName", label: "ชื่อ - นามสกุล", required: true },
                  {
                    name: "gender",
                    label: "เพศผู้มีอาการ",
                    required: true,
                    type: "select",
                    options: ["", "ชาย", "หญิง"],
                  },
                  { name: "email", label: "อีเมล์", required: true },
                  { name: "age", label: "อายุ", type: "number", required: true },
                  { name: "relation", label: "ความสัมพันธ์กับผู้มีอาการ" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}{" "}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleFormChange}
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#007BFF] py-2 text-gray-700 bg-transparent"
                      >
                        {field.options?.map((opt) => (
                          <option
                            key={opt}
                            value={opt === "ชาย" ? "male" : opt === "หญิง" ? "female" : ""}
                          >
                            {opt || "เลือก"}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        type={field.type || "text"}
                        placeholder="กรอกข้อมูล"
                        value={form[field.name as keyof typeof form]}
                        onChange={handleFormChange}
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#007BFF] py-2 placeholder-gray-400 bg-transparent"
                      />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleRegister}
                className="mt-4 w-full py-3 rounded-full text-white font-bold shadow"
                style={{
                  background: "linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)",
                }}
              >
                เริ่มทำแบบประเมิน
              </button>
            </div>
          ) : (
            <>
              <div className="text-[#1680CE] text-sm font-semibold mt-6">
                คำถามที่ {mobileQ + 1}/{currentCategory.questions.length}
              </div>

              <h2 className="mt-4 mb-6 text-3xl font-semibold text-[#111827] leading-tight">
                {currentCategory.questions[mobileQ]}
              </h2>

              <p className="mt-3 text-sm text-[#1D212680]">
                โปรดเลือกคำตอบที่ตรงกับตัวเด็ก
              </p>

              <div
                className={`mt-4 space-y-6 ${missingKeys.includes(mobileKey)
                  ? "ring-2 ring-red-300 rounded-2xl p-3"
                  : ""
                  }`}
              >
                {currentCategory.options.map(({ label, value }) => (
                  <label key={label} className="flex items-center gap-3 text-base text-gray-800">
                    <input
                      type="radio"
                      name={mobileKey}
                      value={String(value)}
                      checked={answers[mobileKey] === String(value)}
                      onChange={(e) => setAnswerByCategoryIndex(mobileQ, e.target.value)}
                      className="form-radio accent-[#007BFF] w-5 h-5"
                    />
                    {label}
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* BOTTOM (buttons + gradient like screenshot) */}
        {registered && (
          <div className="relative h-[300px] shrink-0 overflow-hidden">
            {/* base gradient */}
            {/* <div className="absolute inset-0 bg-[linear-gradient(90deg,#5195EE_0%,#5B9DEC_25%,#59DCD3_55%,#5ED2C4_75%,#58D4BF_100%)]" /> */}

            {/* bottom svg background (h-[200px]) */}
            <div className="absolute inset-x-0 bottom-0 h-[220px] z-[1] pointer-events-none">
              <img
                src={'/images/bottom.svg'}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>

            {/* fade to white at top */}
            {/* <div className="absolute inset-0 z-[2] bg-gradient-to-t from-transparent via-white/70 to-white" /> */}

            <div className="relative z-[3] h-full px-7 pt-8 flex flex-col">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleMobileBack}
                  className="w-14 h-14 rounded-full bg-white/80 shadow flex items-center justify-center active:scale-95 transition"
                  aria-label="ย้อนกลับ"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
                </button>

                <button
                  type="button"
                  onClick={handleMobileNext}
                  disabled={!mobileHasAnswer}
                  aria-label="ถัดไป"
                  className={[
                    "w-14 h-14 rounded-full flex items-center justify-center active:scale-95 transition",
                    mobileHasAnswer
                      ? "text-white bg-gradient-to-r from-[#106EE8] to-[#00AAFF] shadow-[0_0_15px_rgba(15,113,233,0.4)]"
                      : "bg-[#EAEAEA] text-white/80 cursor-not-allowed shadow-none",
                  ].join(" ")}
                >
                  <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
                </button>
              </div>

              <div className="mt-auto pb-7 text-center text-white/90 text-sm font-semibold">
                Neurobalance.co
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================
  // DESKTOP / TABLET (เดิม)
  // =========================
  return (
    <div className="lg:mt-10 md:mt-20 flex flex-col lg:flex-row gap-6 px-4 md:px-10 lg:px-24 py-20 relative">
      <ProgressSidebar />

      <main className="w-full lg:w-2/3 flex flex-col">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-200 h-[700px] flex flex-col">
          {!registered ? (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-1">การลงทะเบียน</h2>
              <p className="text-sm text-gray-500 mb-6">
                กรุณากรอกข้อมูลเพื่อลงทะเบียนก่อนเริ่มทำแบบประเมิน
              </p>

              <div className="space-y-6">
                {[
                  { name: "fullName", label: "ชื่อ - นามสกุล", required: true },
                  {
                    name: "gender",
                    label: "เพศผู้มีอาการ",
                    required: true,
                    type: "select",
                    options: ["", "ชาย", "หญิง"],
                  },
                  { name: "email", label: "อีเมล์", required: true },
                  { name: "age", label: "อายุ", type: "number", required: true },
                  { name: "relation", label: "ผู้ประเมินมีความสัมพันธ์ใดกับผู้มีอาการ" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}{" "}
                      {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === "select" ? (
                      <select
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleFormChange}
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#007BFF] py-2 text-gray-700"
                      >
                        {field.options?.map((opt) => (
                          <option
                            key={opt}
                            value={opt === "ชาย" ? "male" : opt === "หญิง" ? "female" : ""}
                          >
                            {opt || "เลือก"}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        name={field.name}
                        type={field.type || "text"}
                        placeholder="กรอกข้อมูล"
                        value={form[field.name as keyof typeof form]}
                        onChange={handleFormChange}
                        className="w-full border-b border-gray-300 focus:outline-none focus:border-[#007BFF] py-2 placeholder-gray-500"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-end gap-4 flex-wrap">
                <button
                  onClick={handleRegister}
                  className="flex items-center justify-center gap-2 hover:bg-blue-600 text-white font-semibold text-base px-6 py-2.5 rounded-full shadow transition"
                  style={{
                    background: "linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)",
                  }}
                >
                  เริ่มทำแบบประเมิน <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-bold text-gray-800 mb-1 text-center">
                {currentCategory.category}
              </h2>

              <div className="border-b border-gradient-to-r from-green-400 to-teal-500 mb-6">
                <p className="text-sm sm:text-base text-gray-500 mb-6 text-center">
                  กรุณาเลือกช่องด้านล่างว่าข้อความนั้นเป็นจริงเพียงใด
                </p>
              </div>

              <div ref={listRef} className="flex-1 overflow-y-auto pr-4">
                {currentCategory.questions.map((question, index) => (
                  <div
                    key={index}
                    id={`qblock-q${index + currentCategory.startIndex}`}
                    className={`border-b border-gray-300 pb-6 pt-6 ${missingKeys.includes(`q${index + currentCategory.startIndex}`)
                      ? "ring-red-400 bg-red-50"
                      : ""
                      }`}
                  >
                    <p className="font-medium text-gray-800 mb-4 text-center text-base">
                      {index + 1}. {question}
                    </p>

                    <div className="flex flex-wrap justify-center gap-x-3 sm:gap-x-6 md:gap-x-12 lg:gap-x-20 gap-y-2">
                      {currentCategory.options.map(({ label, value }) => (
                        <label key={label} className="flex items-center gap-2 choice-title flex-none">
                          <input
                            type="radio"
                            name={`q${index + currentCategory.startIndex}`}
                            value={String(value)}
                            checked={answers[`q${index + currentCategory.startIndex}`] === String(value)}
                            onChange={(e) => setAnswerByCategoryIndex(index, e.target.value)}
                            className="form-radio accent-[#007BFF]"
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {registered && (
          <div className="mt-4">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
              {!completedForm && (
                <button
                  onClick={handleBack}
                  className="
                    flex items-center justify-center
                    w-full sm:w-fit
                    px-4 sm:px-2 py-3 sm:py-2
                    border border-[#DADCE0] text-[#1D1D1F]
                    text-base sm:text-sm
                    rounded-full hover:bg-gray-100 transition
                  "
                >
                  <ArrowLeft className="w-4 h-4 mr-2 sm:mr-1 flex-none" strokeWidth={2.5} />
                  <span className="truncate sm:whitespace-nowrap">ย้อนกลับ</span>
                </button>
              )}

              <button
                type="button"
                onClick={(e) => { e.preventDefault(); handleNext(); }}
                className="
                  flex items-center justify-center
                  w-full sm:w-auto
                  px-5 sm:px-6 py-3 sm:py-2
                  rounded-full
                  text-base sm:text-sm
                  transition-colors gap-x-2
                  bg-[#007BFF] text-white hover:bg-blue-600
                  text-center
                "
              >
                <div className="flex items-center justify-center gap-2 min-w-0">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-white/20 flex-none">
                    {completed}/77
                  </span>
                  <span className="whitespace-normal break-words truncate">
                    ด้าน{currentCategory.category}
                  </span>
                  <ArrowRight className="w-4 h-4 flex-none" strokeWidth={2.5} />
                </div>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}