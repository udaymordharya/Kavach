import type { AnalysisResult } from '../App';

// Mock OCR/PDF text extraction
async function extractText(file: File): Promise<string> {
  await delay(800);
  
  if (file.name.toLowerCase().includes('denial')) {
    return `
CLAIM DENIAL NOTICE

Date: January 15, 2026
Claim Number: CLM-2026-458392
Patient: John Smith
Policy Number: POL-884521

Dear Policyholder,

After careful review of your submitted claim for the MRI scan performed on December 10, 2025, 
we regret to inform you that your claim has been DENIED.

REASON FOR DENIAL:
The procedure code 70553 (MRI Brain with Contrast) is not covered under your current plan 
as it is considered an elective diagnostic procedure not meeting medical necessity criteria.

According to our review, the ordering physician did not provide sufficient documentation 
of failed conservative treatment prior to requesting advanced imaging.

Your policy specifically excludes coverage for elective diagnostic imaging unless 
pre-authorized and deemed medically necessary by our medical review team.

You have the right to appeal this decision within 180 days.

Sincerely,
Claims Department
HealthCorp Insurance
    `.trim();
  }
  
  // Policy document
  return `
HEALTHCORP INSURANCE POLICY DOCUMENT
Policy Number: POL-884521
Effective Date: January 1, 2025

SECTION 4: COVERED SERVICES

4.1 Diagnostic Imaging
Covered services include, but are not limited to:
- X-rays (when medically necessary)
- CT scans (with pre-authorization)
- MRI scans (with pre-authorization for specific conditions)
- Ultrasound examinations

4.2 Medical Necessity Criteria
A service is considered medically necessary when it is:
(a) Consistent with the diagnosis and treatment of the patient's condition
(b) Appropriate with regard to standards of good medical practice
(c) Not primarily for the convenience of the patient or physician
(d) The most cost-effective service that can safely be provided

SECTION 5: PRIOR AUTHORIZATION REQUIREMENTS

5.1 Advanced Imaging
The following procedures require prior authorization:
- MRI (all types) - Code range 70000-79999
- CT with contrast
- PET scans

5.2 Authorization Process
Prior authorization requests must be submitted at least 3 business days before 
the scheduled procedure. Authorization may be granted when:
- The procedure is medically necessary (see Section 4.2)
- Conservative treatment has been attempted when applicable
- Supporting documentation is provided by the ordering physician

SECTION 6: EXCLUSIONS

6.1 Non-Covered Services
The following are NOT covered under this policy:
- Experimental or investigational procedures
- Cosmetic procedures
- Services not deemed medically necessary
- Procedures performed without required prior authorization

6.2 Elective Procedures
Elective procedures are covered ONLY when:
- Prior authorization has been obtained
- Medical necessity is clearly documented
- The procedure is not available through a more cost-effective alternative

SECTION 8: BRAIN AND NEUROLOGICAL IMAGING

8.1 Coverage for Neurological Conditions
MRI imaging of the brain (codes 70551, 70552, 70553) IS COVERED when ordered 
for evaluation of:
- Persistent severe headaches lasting more than 4 weeks
- Neurological deficits (numbness, weakness, vision changes)
- Suspected stroke or TIA
- Head trauma with loss of consciousness
- Seizures
- Suspected tumors or lesions

8.2 Documentation Requirements
For brain MRI coverage, the ordering physician must document:
- Chief complaint and duration
- Physical examination findings
- Neurological assessment results
- Reason advanced imaging is necessary

NO REQUIREMENT for failed conservative treatment is specified for neurological 
imaging when clear neurological symptoms are present.

SECTION 12: APPEALS PROCESS

12.1 Right to Appeal
Members have the right to appeal any claim denial within 180 days of the denial date.

12.2 Appeal Submission
Appeals must include:
- Written statement of disagreement
- Supporting medical documentation
- Reference to specific policy provisions

12.3 Appeal Timeline
Appeals are reviewed within 30 days of receipt. External review is available 
if internal appeal is denied.
    `.trim();
}

// Mock audio transcription
async function transcribeAudio(blob: Blob): Promise<string> {
  await delay(1000);
  return "I've been having severe persistent headaches for over six weeks, along with some vision problems and occasional numbness in my left hand. My doctor ordered the MRI because of these neurological symptoms, not just for routine screening.";
}

// Multilingual story examples
const multilingualStories: Record<string, string> = {
  Spanish: "He tenido dolores de cabeza severos y persistentes durante más de seis semanas, junto con algunos problemas de visión y entumecimiento ocasional en mi mano izquierda. Mi médico ordenó la resonancia magnética debido a estos síntomas neurológicos, no solo para un examen de rutina.",
  Hindi: "मुझे छह सप्ताह से अधिक समय से गंभीर और लगातार सिरदर्द हो रहा है, साथ ही कुछ दृष्टि समस्याएं और मेरे बाएं हाथ में कभी-कभी सुन्नता भी है। मेरे डॉक्टर ने इन न्यूरोलॉजिकल लक्षणों के कारण एमआरआई का आदेश दिया, न कि केवल नियमित जांच के लिए।",
  Mandarin: "我已经有六个多星期的严重持续性头痛，同时还有一些视力问题和左手偶尔麻木。我的医生因为这些神经系统症状而要求做核磁共振检查，而不仅仅是例行筛查。",
  French: "J'ai eu de graves maux de tête persistants pendant plus de six semaines, ainsi que des problèmes de vision et un engourdissement occasionnel dans ma main gauche. Mon médecin a ordonné l'IRM en raison de ces symptômes neurologiques, pas seulement pour un dépistage de routine.",
  Arabic: "لقد عانيت من صداع شديد ومستمر لأكثر من ستة أسابيع، إلى جانب بعض مشاكل الرؤية وخدر في يدي اليسرى من حين لآخر. طلب طبيبي إجراء التصوير بالرنين المغناطيسي بسبب هذه الأعراض العصبية، وليس فقط للفحص الروتيني.",
  Portuguese: "Tenho tido dores de cabeça severas e persistentes há mais de seis semanas, juntamente com alguns problemas de visão e dormência ocasional na minha mão esquerda. Meu médico solicitou a ressonância magnética devido a esses sintomas neurológicos, não apenas para triagem de rotina.",
  Russian: "У меня сильные постоянные головные боли уже более шести недель, а также некоторые проблемы со зрением и периодическое онемение левой руки. Мой врач назначил МРТ из-за этих неврологических симптомов, а не только для рутинного обследования.",
  Japanese: "6週間以上にわたって重度の持続的な頭痛があり、視力の問題や左手の時折のしびれもあります。医師は、単なる定期検診ではなく、これらの神経学的症状のためにMRIを指示しました。",
  Korean: "6주 이상 심한 지속적인 두통이 있었고, 시력 문제와 왼손의 간헐적인 저림도 있습니다. 의사는 단순한 정기 검진이 아닌 이러한 신경학적 증상 때문에 MRI를 지시했습니다.",
  English: "I've been having severe persistent headaches for over six weeks, along with some vision problems and occasional numbness in my left hand. My doctor ordered the MRI because of these neurological symptoms, not just for routine screening.",
};

// Agent 1: Policy Auditor
async function runPolicyAuditor(policyText: string): Promise<any> {
  await delay(2000);
  
  return {
    clauses: [
      {
        section: '4.2',
        title: 'Medical Necessity Criteria',
        text: 'A service is considered medically necessary when it is: (a) Consistent with the diagnosis and treatment of the patient\'s condition (b) Appropriate with regard to standards of good medical practice',
        page: 3,
        relevant: true,
      },
      {
        section: '5.1',
        title: 'Advanced Imaging - Prior Authorization',
        text: 'MRI (all types) - Code range 70000-79999 require prior authorization',
        page: 4,
        relevant: true,
      },
      {
        section: '6.2',
        title: 'Elective Procedures',
        text: 'Elective procedures are covered ONLY when: Prior authorization has been obtained, Medical necessity is clearly documented',
        page: 5,
        relevant: false,
      },
      {
        section: '8.1',
        title: 'Brain and Neurological Imaging Coverage',
        text: 'MRI imaging of the brain (codes 70551, 70552, 70553) IS COVERED when ordered for evaluation of: Persistent severe headaches lasting more than 4 weeks, Neurological deficits (numbness, weakness, vision changes)',
        page: 7,
        relevant: true,
        critical: true,
      },
      {
        section: '8.2',
        title: 'Documentation Requirements for Brain MRI',
        text: 'For brain MRI coverage, the ordering physician must document: Chief complaint and duration, Physical examination findings, Neurological assessment results. NO REQUIREMENT for failed conservative treatment is specified for neurological imaging when clear neurological symptoms are present.',
        page: 7,
        relevant: true,
        critical: true,
      },
    ],
  };
}

// Agent 2: Clause Grounding
async function runClauseGrounding(clauses: any[]): Promise<any> {
  await delay(1500);
  
  return {
    grounded: clauses.map(clause => ({
      ...clause,
      confidence: clause.critical ? 0.98 : 0.92,
      location: {
        page: clause.page,
        startChar: Math.floor(Math.random() * 1000),
        endChar: Math.floor(Math.random() * 1000) + 200,
      },
    })),
  };
}

// Agent 3: Legal Analyst
async function runLegalAnalyst(
  denialText: string,
  clauses: any[],
  voiceTranscript?: string
): Promise<any> {
  await delay(2500);
  
  return {
    verdict: 'invalid',
    reasoning: `The denial is INVALID and contradicts the policy document. The insurance company claims the MRI is "elective" and lacks medical necessity documentation, but Section 8.1 explicitly covers brain MRI for "persistent severe headaches lasting more than 4 weeks" and "neurological deficits." The patient's symptoms (persistent headaches 6+ weeks, vision problems, numbness) clearly meet these criteria. Furthermore, Section 8.2 explicitly states NO REQUIREMENT for failed conservative treatment when clear neurological symptoms are present. The denial incorrectly applies this requirement. The claim that prior authorization was not obtained is a separate procedural issue, but the fundamental characterization of the procedure as "elective" and "not medically necessary" is factually incorrect per the policy's own terms.`,
    violatedClauses: [
      {
        section: '8.1',
        text: 'MRI imaging of the brain IS COVERED when ordered for: Persistent severe headaches lasting more than 4 weeks, Neurological deficits',
        violation: 'Denial claims procedure is elective, but policy explicitly covers it for documented symptoms',
      },
      {
        section: '8.2',
        text: 'NO REQUIREMENT for failed conservative treatment is specified for neurological imaging when clear neurological symptoms are present',
        violation: 'Denial cites lack of conservative treatment documentation, directly contradicting this provision',
      },
    ],
    automatedDenialLikelihood: 0.85,
    supportingEvidence: voiceTranscript
      ? `Patient testimony confirms: "${voiceTranscript}"`
      : null,
  };
}

// Agent 4: Confidence & Risk
async function runConfidenceAnalysis(legalAnalysis: any): Promise<any> {
  await delay(1500);
  
  return {
    successProbability: 0.82,
    riskLevel: 'Low',
    confidenceFactors: [
      { factor: 'Clear policy contradiction', weight: 0.35, positive: true },
      { factor: 'Explicit coverage clause found', weight: 0.30, positive: true },
      { factor: 'Medical necessity criteria met', weight: 0.20, positive: true },
      { factor: 'Patient symptoms documented', weight: 0.15, positive: true },
    ],
    justification: 'Appeal has strong merit. The policy explicitly covers the procedure for the documented symptoms, and the denial mischaracterizes the procedure as elective when it clearly meets medical necessity criteria per Section 8.1 and 8.2. The automated denial likely flagged the procedure code without considering the specific clinical context.',
  };
}

// Agent 5: Appeal Writer
async function runAppealWriter(
  legalAnalysis: any,
  clauses: any[],
  confidenceAnalysis: any
): Promise<string> {
  await delay(2000);
  
  return `
FORMAL APPEAL OF CLAIM DENIAL
Claim Number: CLM-2026-458392
Policy Number: POL-884521
Date: January 29, 2026

To the Appeals Department:

I am writing to formally appeal the denial of my claim for an MRI brain scan with contrast (CPT code 70553) performed on December 10, 2025. The denial letter dated January 15, 2026, incorrectly characterizes this procedure as "elective" and states it does not meet medical necessity criteria. This determination is factually incorrect and contradicts the explicit terms of my policy.

GROUNDS FOR APPEAL:

1. EXPLICIT POLICY COVERAGE
Section 8.1 of my HealthCorp policy document clearly states: "MRI imaging of the brain (codes 70551, 70552, 70553) IS COVERED when ordered for evaluation of: Persistent severe headaches lasting more than 4 weeks, Neurological deficits (numbness, weakness, vision changes)."

My documented symptoms include persistent severe headaches exceeding six weeks duration, visual disturbances, and episodic numbness in the left extremity. These symptoms precisely match the coverage criteria outlined in Section 8.1.

2. MISAPPLICATION OF CONSERVATIVE TREATMENT REQUIREMENT
The denial letter states that "the ordering physician did not provide sufficient documentation of failed conservative treatment prior to requesting advanced imaging." However, Section 8.2 of the policy explicitly states: "NO REQUIREMENT for failed conservative treatment is specified for neurological imaging when clear neurological symptoms are present."

This denial applies a requirement that does not exist under the policy terms for neurological imaging with clear symptomatology.

3. MEDICAL NECESSITY CLEARLY ESTABLISHED
Section 4.2 defines medical necessity as services that are "consistent with the diagnosis and treatment of the patient's condition" and "appropriate with regard to standards of good medical practice." The evaluation of persistent neurological symptoms with advanced imaging is standard medical practice and entirely appropriate for the documented clinical presentation.

4. MISCHARACTERIZATION AS "ELECTIVE"
The procedure was not elective. It was ordered by a licensed physician based on documented neurological symptoms requiring diagnostic evaluation. The term "elective" implies optional or cosmetic procedures, which is clearly not applicable to diagnostic imaging for neurological deficits.

REQUESTED RESOLUTION:

I respectfully request that HealthCorp:
1. Reverse the denial of claim CLM-2026-458392
2. Process payment for the MRI procedure in accordance with policy terms
3. Provide written confirmation of the reversal within 30 days as required by Section 12.3

The denial appears to be the result of an automated review that failed to consider the specific clinical context and applicable policy provisions. I have documented neurological symptoms that explicitly trigger coverage under Section 8.1, and the denial incorrectly applies requirements that do not exist for this category of imaging.

I am prepared to provide additional medical documentation if required, though the policy does not impose documentation requirements beyond those already satisfied.

I request a written response to this appeal within 30 days as specified in Section 12.3 of the policy. If this internal appeal is denied, I will exercise my right to external review.

Respectfully submitted,

John Smith
Policy Number: POL-884521
Date: January 29, 2026

ATTACHMENTS:
- Copy of denial letter dated January 15, 2026
- Relevant policy sections (Sections 4.2, 8.1, 8.2)
- Physician order and clinical notes (if available)
`.trim();
}

// Agent 6: Escalation Planner
async function runEscalationPlanner(): Promise<any> {
  await delay(1200);
  
  return {
    level: 'Level 1 - Internal Appeal',
    triggerCondition: 'If no response received within 30 days OR if internal appeal is denied',
    nextAction: 'File external review request with state insurance commissioner',
    timeline: [
      { day: 0, action: 'Submit initial appeal' },
      { day: 7, action: 'Follow-up confirmation of receipt' },
      { day: 30, action: 'Deadline for insurer response (per Section 12.3)' },
      { day: 31, action: 'If no response: File complaint with state regulator' },
      { day: 45, action: 'Request external independent review' },
    ],
    escalationPath: 'Internal Appeal → State Insurance Commissioner → Independent Medical Review → Legal Action (if necessary)',
  };
}

// Agent 7: Multilingual Translator (Embassy Pattern)
async function generateNativeExplanation(language: string, analystResult: any, confidenceResult: any): Promise<string> {
  await delay(1500);
  
  const explanations: Record<string, string> = {
    Spanish: `He analizado tu póliza de seguro y la carta de rechazo.

BUENAS NOTICIAS: La compañía de seguros cometió un error. Tu rechazo es INVÁLIDO.

¿Por qué fue rechazado tu reclamo?
La aseguradora dice que la resonancia magnética es "electiva" y no cumple con los criterios de necesidad médica.

¿Por qué esto está EQUIVOCADO?
Tu póliza (Sección 8.1) establece claramente: "La resonancia magnética del cerebro ESTÁ CUBIERTA cuando se ordena para: dolores de cabeza severos persistentes que duran más de 4 semanas, déficits neurológicos (entumecimiento, debilidad, cambios en la visión)."

Tus síntomas (dolores de cabeza por 6+ semanas, problemas de visión, entumecimiento) cumplen exactamente con estos criterios.

Además, la Sección 8.2 dice explícitamente: "NO SE REQUIERE" tratamiento conservador fallido para imágenes neurológicas cuando hay síntomas neurológicos claros.

¿Qué hice por ti?
He escrito una carta de apelación formal en inglés perfecto, citando las secciones exactas de tu póliza que la compañía violó. La carta exige que reviertan el rechazo.

Probabilidad de éxito: 82%
Nivel de riesgo: Bajo

La compañía probablemente usó un sistema automatizado que no leyó tu caso completo. La apelación debería revertir esto.`,

    Hindi: `मैंने आपक��� बीमा पॉलिसी और अस्वीकृति पत्र का विश्लेषण किया है।

अच्छी खबर: बीमा कंपनी ने गलती की है। आपकी अस्वीकृति अमान्य है।

आपका दावा क्यों अस्वीकार किया गया?
बीमाकर्ता कहता है कि एमआरआई "वैकल्पिक" है और चिकित्सा आवश्यकता मानदंडों को पूरा नहीं करता।

यह गलत क्यों है?
आपकी पॉलिसी (धारा 8.1) स्पष्ट रूप से कहती है: "मस्तिष्क का एमआरआई कवर किया जाता है जब आदेश दिया जाता है: 4 सप्ताह से अधिक समय तक चलने वाले लगातार गंभीर सिरदर्द, न्यूरोलॉजिकल कमियां (सुन्नता, कमजोरी, दृष्टि परिवर्तन)।"

आपके लक्षण (6+ सप्ताह के सिरदर्द, दृष्टि समस्याएं, सुन्नता) इन मानदंडों को पूरी तरह से पूरा करते हैं।

इसके अलावा, धारा 8.2 स्पष्ट रूप से कहती है: "कोई आवश्यकता नहीं" असफल रूढ़िवादी उपचार के लिए जब स्पष्ट न्यूरोलॉजिकल लक्षण मौजूद हों।

मैंने आपके लिए क्या किया?
मैंने पूर्ण अंग्रेजी में एक औपचारिक अपील पत्र लिखा है, आपकी पॉलिसी के सटीक अनुभागों का हवाला देते हुए जिनका कंपनी ने उल्लंघन किया। पत्र अस्वीकृति को उलटने की मांग करता है।

सफलता की संभावना: 82%
जोखिम स्तर: कम

कंपनी ने शायद एक स्वचालित प्रणाली का उपयोग किया जो आपके पूरे मामले को नहीं पढ़ती। अपील इसे उलट देनी चाहिए।`,

    Mandarin: `我已经分析了您的保险单和拒绝信。

好消息：保险公司犯了一个错误。您的拒绝是无效的。

为什么您的索赔被拒绝？
保险公司说核磁共振是"选择性的"，不符合医疗必要性标准。

为什么这是错误的？
您的保单（第8.1节）明确规定："当订购用于：持续4周以上的严重持续性头痛，神经系统缺陷（麻木、无力、视力变化）时，大脑核磁共振成像被覆盖。"

您的症状（6周以上的头痛、视力问题、麻木）完全符合这些标准。

此外，第8.2节明确指出：当存在明显的神经系统症状时，"不需要"保守治疗失败的神经成像。

我为您做了什么？
我用完美的英语写了一封正式的上诉信，引用了公司违反的保单的确切章节。这封信要求他们撤销拒绝。

成功概率：82%
风险等级：低

该公司可能使用了一个未阅读您完整案例的自动化系统。上诉应该会扭转这一局面。`,

    French: `J'ai analysé votre police d'assurance et la lettre de refus.

BONNE NOUVELLE : La compagnie d'assurance a commis une erreur. Votre refus est INVALIDE.

Pourquoi votre réclamation a-t-elle été refusée ?
L'assureur dit que l'IRM est « élective » et ne répond pas aux critères de nécessité médicale.

Pourquoi est-ce FAUX ?
Votre police (Section 8.1) stipule clairement : « L'IRM du cerveau EST COUVERTE lorsqu'elle est ordonnée pour : maux de tête graves persistants durant plus de 4 semaines, déficits neurologiques (engourdissement, faiblesse, changements de vision). »

Vos symptômes (maux de tête pendant 6+ semaines, problèmes de vision, engourdissement) correspondent exactement à ces critères.

De plus, la Section 8.2 déclare explicitement : « AUCUNE EXIGENCE » de traitement conservateur échoué pour l'imagerie neurologique lorsque des symptômes neurologiques clairs sont présents.

Qu'ai-je fait pour vous ?
J'ai rédigé une lettre d'appel formelle en anglais parfait, citant les sections exactes de votre police que la compagnie a violées. La lettre exige qu'ils renversent le refus.

Probabilité de succès : 82%
Niveau de risque : Faible

La compagnie a probablement utilisé un système automatisé qui n'a pas lu votre dossier complet. L'appel devrait renverser cela.`,

    Arabic: `لقد حللت وثيقة التأمين الخاصة بك وخطاب الرفض.

أخبار جيدة: شركة التأمين ارتكبت خطأ. رفضك غير صالح.

لماذا تم رفض مطالبتك؟
تقول شركة التأمين أن التصوير بالرنين المغناطيسي "اختياري" ولا يلبي معايير الضرورة الطبية.

لماذا هذا خطأ؟
تنص وثيقتك (القسم 8.1) بوضوح: "يتم تغطية التصوير بالرنين المغناطيسي للدماغ عند طلبه لـ: الصداع الشديد المستمر الذي يستمر أكثر من 4 أسابيع، العجز العصبي (التنميل، الضعف، تغيرات الرؤية)."

أعراضك (صداع لأكثر من 6 أسابيع، مشاكل في الرؤية، تنميل) تطابق هذه المعايير تمامًا.

علاوة على ذلك، ينص القسم 8.2 صراحةً: "لا حاجة" للعلاج التحفظي الفاشل للتصوير العصبي عند وجود أعراض عصبية واضحة.

ماذا فعلت من أجلك؟
لقد كتبت خطاب استئناف رسمي بالإنجليزية المثالية، مستشهدًا بالأقسام الدقيقة من وثيقتك التي انتهكتها الشركة. يطالب الخطاب بعكس الرفض.

احتمال النجاح: 82%
مستوى المخاطر: منخفض

ربما استخدمت الشركة نظامًا آليًا لم يقرأ قضيتك الكاملة. يجب أن يعكس الاستئناف ذلك.`,

    Portuguese: `Analisei sua apólice de seguro e a carta de negação.

BOAS NOTÍCIAS: A companhia de seguros cometeu um erro. Sua negação é INVÁLIDA.

Por que seu sinistro foi negado?
A seguradora diz que a ressonância magnética é "eletiva" e não atende aos critérios de necessidade médica.

Por que isso está ERRADO?
Sua apólice (Seção 8.1) declara claramente: "A ressonância magnética do cérebro É COBERTA quando solicitada para: dores de cabeça severas persistentes com duração superior a 4 semanas, déficits neurológicos (dormência, fraqueza, alterações na visão)."

Seus sintomas (dores de cabeça por mais de 6 semanas, problemas de visão, dormência) correspondem exatamente a esses critérios.

Além disso, a Seção 8.2 afirma explicitamente: "NENHUMA EXIGÊNCIA" de tratamento conservador falhado para imagem neurológica quando sintomas neurológicos claros estão presentes.

O que fiz por você?
Escrevi uma carta de apelação formal em inglês perfeito, citando as seções exatas de sua apólice que a companhia violou. A carta exige que eles revertam a negação.

Probabilidade de sucesso: 82%
Nível de risco: Baixo

A companhia provavelmente usou um sistema automatizado que não leu seu caso completo. A apelação deve reverter isso.`,

    Russian: `Я проанализировал ваш страховой полис и письмо об отказе.

ХОРОШИЕ НОВОСТИ: Страховая компания допустила ошибку. Ваш отказ НЕДЕЙСТВИТЕЛЕН.

Почему ваша претензия была отклонена?
Страховщик говорит, что МРТ «элективная» и не соответствует критериям медицинской необходимости.

Почему это НЕПРАВИЛЬНО?
Ваш полис (Раздел 8.1) четко указывает: «МРТ головного мозга ПОКРЫВАЕТСЯ при назначении для: постоянных сильных головных болей длительностью более 4 недель, неврологических дефицитов (онемение, слабость, изменения зрения)».

Ваши симптомы (головные боли более 6 недель, проблемы со зрением, онемение) точно соответствуют этим критериям.

Кроме того, Раздел 8.2 явно указывает: «НЕ ТРЕБУЕТСЯ» неудачное консервативное лечение для неврологических изображений при наличии явных неврологических симптомов.

Что я сделал для вас?
Я написал формальное апелляционное письмо на идеальном английском, ссылаясь на точные разделы вашего полиса, которые компания нарушила. Письмо требует отмены отказа.

Вероятность успеха: 82%
Уровень риска: Низкий

Компания, вероятно, использовала автоматизированную систему, которая не прочитала ваше полное дело. Апелляция должна это исправить.`,

    Japanese: `あなたの保険証券と拒否書を分析しました。

良いニュース：保険会社がミスを犯しました。あなたの拒否は無効です。

なぜあなたの請求が拒否されたのですか？
保険会社は、MRIは「選択的」であり、医学的必要性の基準を満たしていないと言っています。

なぜこれが間違っているのですか？
あなたの保険証券（セクション8.1）は明確に述べています：「脳のMRI画像は、以下のために注文された場合にカバーされます：4週間以上続く持続的な重度の頭痛、神経学的欠損（しびれ、脱力感、視力の変化）」

あなたの症状（6週間以上の頭痛、視力の問題、しびれ）はこれらの基準に正確に一致しています。

さらに、セクション8.2は明確に述べています：明確な神経学的症状が存在する場合、神経画像に対する失敗した保守的治療の「要件はありません」。

私はあなたのために何をしましたか？
完璧な英語で正式な上訴書を書き、会社が違反した保険証券の正確なセクションを引用しました。この書簡は拒否の取り消しを要求しています。

成功確率：82%
リスクレベル：低

会社はおそらくあなたの完全なケースを読まない自動化システムを使用しました。上訴はこれを覆すはずです。`,

    Korean: `귀하의 보험 증서와 거부 서신을 분석했습니다.

좋은 소식: 보험 회사가 실수를 했습니다. 귀하의 거부는 무효입니다.

왜 귀하의 청구가 거부되었습니까?
보험사는 MRI가 "선택적"이며 의학적 필요성 기준을 충족하지 않는다고 말합니다.

왜 이것이 틀렸습니까?
귀하의 보험 증서 (섹션 8.1)는 명확하게 명시합니다: "뇌의 MRI 영상은 다음을 위해 주문될 때 보장됩니다: 4주 이상 지속되는 지속적인 심한 두통, 신경학적 결핍 (무감각, 약함, 시력 변화)."

귀하의 증상 (6주 이상의 두통, 시력 문제, 무감각)은 이러한 기준과 정확히 일치합니다.

또한 섹션 8.2는 명시적으로 명시합니다: 명확한 신경학적 증상이 있을 때 신경 영상에 대한 실패한 보수적 치료의 "요구 사항이 없습니다".

제가 귀하를 위해 무엇을 했습니까?
완벽한 영어로 공식 항소서를 작성하여 회사가 위반한 보험 증서의 정확한 섹션을 인용했습니다. 이 서신은 거부를 철회할 것을 요구합니다.

성공 확률: 82%
위험 수준: 낮음

회사는 아마도 귀하의 전체 사례를 읽지 않는 자동화 시스템을 사용했을 것입니다. 항소가 이를 뒤집을 것입니다.`,

    English: `I have analyzed your insurance policy and the denial letter.

GOOD NEWS: The insurance company made a mistake. Your denial is INVALID.

Why was your claim denied?
The insurer says the MRI is "elective" and doesn't meet medical necessity criteria.

Why is this WRONG?
Your policy (Section 8.1) clearly states: "MRI imaging of the brain IS COVERED when ordered for: Persistent severe headaches lasting more than 4 weeks, Neurological deficits (numbness, weakness, vision changes)."

Your symptoms (headaches for 6+ weeks, vision problems, numbness) exactly match these criteria.

Furthermore, Section 8.2 explicitly states: "NO REQUIREMENT" for failed conservative treatment for neurological imaging when clear neurological symptoms are present.

What did I do for you?
I wrote a formal appeal letter in perfect English, citing the exact sections of your policy that the company violated. The letter demands they reverse the denial.

Success Probability: 82%
Risk Level: Low

The company likely used an automated system that didn't read your full case. The appeal should reverse this.`,
  };

  return explanations[language] || explanations.English;
}

// Main pipeline orchestrator
export async function runAgentPipeline(
  files: { denial?: File; policy?: File; voice?: Blob; userLanguage?: string; voiceText?: string },
  onStepUpdate: (stepId: string, status: 'running' | 'complete' | 'error', output?: string) => void
): Promise<AnalysisResult> {
  const auditTrail: AnalysisResult['auditTrail'] = [];
  const userLanguage = files.userLanguage || 'English';
  
  try {
    // Extract text from files
    const denialText = files.denial ? await extractText(files.denial) : '';
    const policyText = files.policy ? await extractText(files.policy) : '';
    const voiceTranscript = files.voiceText || (files.voice ? await transcribeAudio(files.voice) : multilingualStories[userLanguage]);
    
    // Agent 1: Policy Auditor
    onStepUpdate('auditor', 'running');
    const auditorResult = await runPolicyAuditor(policyText);
    auditTrail.push({
      agent: 'Policy Auditor',
      timestamp: new Date().toISOString(),
      action: 'Extracted and structured policy clauses',
      output: auditorResult,
    });
    onStepUpdate('auditor', 'complete', `Extracted ${auditorResult.clauses.length} relevant policy clauses`);
    
    // Agent 2: Clause Grounding
    onStepUpdate('grounding', 'running');
    const groundingResult = await runClauseGrounding(auditorResult.clauses);
    auditTrail.push({
      agent: 'Clause Grounding',
      timestamp: new Date().toISOString(),
      action: 'Mapped clauses to source document locations',
      output: groundingResult,
    });
    onStepUpdate('grounding', 'complete', `Grounded ${groundingResult.grounded.length} clauses with high confidence`);
    
    // Agent 3: Legal Analyst
    onStepUpdate('analyst', 'running');
    const analystResult = await runLegalAnalyst(denialText, groundingResult.grounded, voiceTranscript);
    auditTrail.push({
      agent: 'Legal Analyst',
      timestamp: new Date().toISOString(),
      action: 'Analyzed denial against policy terms',
      output: analystResult,
    });
    onStepUpdate('analyst', 'complete', `Verdict: ${analystResult.verdict.toUpperCase()} - ${analystResult.violatedClauses.length} policy violations found`);
    
    // Agent 4: Confidence & Risk
    onStepUpdate('confidence', 'running');
    const confidenceResult = await runConfidenceAnalysis(analystResult);
    auditTrail.push({
      agent: 'Confidence & Risk',
      timestamp: new Date().toISOString(),
      action: 'Calculated appeal success probability',
      output: confidenceResult,
    });
    onStepUpdate('confidence', 'complete', `Success probability: ${(confidenceResult.successProbability * 100).toFixed(0)}% (${confidenceResult.riskLevel} risk)`);
    
    // Agent 5: Appeal Writer
    onStepUpdate('writer', 'running');
    const appealLetter = await runAppealWriter(analystResult, groundingResult.grounded, confidenceResult);
    auditTrail.push({
      agent: 'Appeal Writer',
      timestamp: new Date().toISOString(),
      action: 'Generated formal appeal letter',
      output: { letterLength: appealLetter.length },
    });
    onStepUpdate('writer', 'complete', `Generated ${appealLetter.split(' ').length}-word professional appeal letter`);
    
    // Agent 6: Escalation Planner
    onStepUpdate('escalation', 'running');
    const escalationPlan = await runEscalationPlanner();
    auditTrail.push({
      agent: 'Escalation Planner',
      timestamp: new Date().toISOString(),
      action: 'Created follow-up action plan',
      output: escalationPlan,
    });
    onStepUpdate('escalation', 'complete', `Escalation plan ready: ${escalationPlan.timeline.length} scheduled actions`);
    
    // Compile final result
    return {
      verdict: analystResult.verdict,
      confidence: confidenceResult.successProbability,
      riskLevel: confidenceResult.riskLevel,
      denialReason: 'Procedure characterized as elective and lacking medical necessity',
      violatedClauses: analystResult.violatedClauses.map((v: any) => ({
        section: v.section,
        text: v.text,
        page: groundingResult.grounded.find((c: any) => c.section === v.section)?.page,
      })),
      reasoning: analystResult.reasoning,
      appealLetter,
      auditTrail,
      escalationPlan,
      userLanguage,
      userExplanationNative: await generateNativeExplanation(userLanguage, analystResult, confidenceResult),
      detectedIssue: 'Invalid denial: Procedure meets policy coverage criteria but was denied as elective',
    };
  } catch (error) {
    console.error('Pipeline error:', error);
    throw error;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}